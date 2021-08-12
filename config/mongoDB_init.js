const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

const mongoDB_init = () => {
  // define database via mongoose
  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true,
  });
  // connect to mongodb
  const conn = mongoose.connection;
  conn.on("error", console.error.bind(console, "[!] Connection Error "));
}

module.exports = mongoDB_init;

