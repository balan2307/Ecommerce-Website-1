console.log("Sort")

let field=document.getElementById('prod-pagin');
let li=Array.from(field.children);
let select=document.getElementById('select');
// console.log(li);
let ar=[];



for(let prod of li)
{
//     const last=prod.lastElementChild;
//     const x=last.textContent.trim();
//     const y=Number(x.substring(1));
//     console.log(y);
//     // prod.setAttribute('data-price',y);
    ar.push(prod);

}


select.onchange=sortingValue;

function sortingValue(){
    
			
    if (this.value === 'Default') {
        while (field.firstElementChild) 
        {
            
            field.removeChild(field.firstElementChild);
        }
        field.append(...ar);	
       
    }
    if (this.value === 'LowToHigh') {
        

        SortElem(field, li, true)
    }
    if (this.value === 'HighToLow') {
        
        SortElem(field, li, false)
    }
}


function SortElem(field,li, asc){
    let  dm, sortli;
    dm = asc ? 1 : -1;
    console.log("dm,",dm)
    sortli = li.sort((a, b)=>{
        const ax = a.getAttribute('data-price');
        const bx = b.getAttribute('data-price');
        // console.log(typeof(bx))
        // console.log(ax,bx,parseInt(ax) > parseInt(bx) ? (1*dm) : (-1*dm));

        return parseInt(ax) > parseInt(bx) ? (1*dm) : (-1*dm);
    });
    
     while (field.firstChild) {field.removeChild(field.firstChild);}
     field.append(...sortli);	
}
