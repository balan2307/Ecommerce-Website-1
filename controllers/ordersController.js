const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const server_url = process.env.SERVER_URL;
const firebase = require("../config/firebaseInit");
const db = firebase.db;

module.exports.CreateCheckout = async (req, res) => {
  const storeId = req.params.storeId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  console.log("quantity check",quantity);

  // console.log(req.params,req.body);

  // Find the store's products
  const store = await db.collection("users").doc(storeId).get();
  // console.log(store.data());
  const productData = store
    .data()
    .products.find((prod) => prod.productId === productId);
  console.log(
    "🚀 ~ file: ordersController.js ~ line 16 ~ module.exports.CreateCheckout= ~ products",
    productData
  );

  const line_items = [
    {
      price_data: {
        currency: "INR",
        product_data: {
          name: productData.productName,
          images: [productData.productImage],
        },
        unit_amount: productData.productPrice * 100,
      },
      quantity: quantity,
    },
  ];

  // create a object in firebase with status pending
  const order = await db.collection("orders").add({
    status: "pending",
    storeId: storeId,
    line_items,
    productData,
    createdAt: new Date(),
    orderTotal: productData.productPrice * quantity,
  });
  // console.log("🚀 ~ file: ordersController.js ~ line 47 ~ module.exports.CreateCheckout= ~ order", order)
  console.log(
    "🚀 ~ file: ordersController.js ~ line 47 ~ module.exports.CreateCheckout= ~ order",
    order.id
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: line_items,
    billing_address_collection: "auto",
    client_reference_id: order.id,
    shipping_address_collection: {
      allowed_countries: ["US", "CA", "IN"],
    },
    mode: "payment",
    success_url: `${server_url}/orders/success/${order.id}`,
    cancel_url: `${server_url}/orders/failure/${order.id}`,
  });
  res.redirect(303, session.url);
  // res.send(session.url);
};

let paymentData;
module.exports.OrderWebhook = async (req, res) => {
  paymentData = req.body;
  // console.log(JSON.stringify(req.body, null, 2));
  // console.log(req.body.data.object.charges);
  // console.log(req.body.data.object.charges.billing_details);

  const { data } = req.body;
  const { object } = data;

  // get order from firebase
  const orderId = object.client_reference_id;
  const checkoutOrder = await db.collection("orders").doc(orderId).get();
  const order = checkoutOrder.data();

  // update order status
  order.status = "completed";
  order.customerName = object.shipping.name;
  order.completedAt = new Date();
  db.collection("orders")
    .doc(orderId)
    .update(order)
    .then((result) => {
      console.log("Order updated in global orders");
    })
    .catch((err) => {
      console.log("Error in global order updation:", err);
    });

  //customer
  const customer = {
    email: object.customer_details.email,
    name: object.shipping.name,
    address: object.shipping.address,
    Products: order.line_items,
  };

  db.collection("users")
    .doc(order.storeId)
    .update({
      orders: firebase.firebase.firestore.FieldValue.arrayUnion(order),
      customer: firebase.firebase.firestore.FieldValue.arrayUnion(customer),
    })
    .then((result) => {
      console.log("Order updated in store orders");
    })
    .catch((err) => {
      console.log("Error in store order updation:", err);
    });

  

  db.collection("users")
    .doc(order.storeId)
    .get()
    .then((result) => {
      //   console.log(JSON.stringify(result.data(), null, 2));
      const store = result.data();
      const { products } = store;
      products.find((prod) => {
        if (prod.productId === order.productData.productId) {
          prod.productInventory -= order.line_items[0].quantity;
          return true;
        }
      });
      // console.log(products);
      db.collection("users")
        .doc(order.storeId)
        .set(
          {
            products: products,
          },
          { merge: true }
        )
        .then((result) => {
          console.log("product inventory updated in store orders");
        })
        .catch((err) => {
          console.log("Error in product inventory updation:", err);
        });
    });

  //change order status

  // create customer and add in store's id and also attach in orders collection

  res.status(200).send("OK");
};;;
