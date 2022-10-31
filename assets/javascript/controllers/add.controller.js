import { Product } from "../components/product.class.js";
import { clientServices } from "../service/cliente-service.js";
//import { v4 as uuidv4 } from 'uuid';
const lastname = document.getElementById("name");
const nameProduct = document.querySelector("[data-name]");
const lastcover = document.getElementById("cover");
const coverProduct = document.querySelector("[data-cover]");
const lastprice = document.getElementById("price");
const priceProduct = document.querySelector("[data-price]");
const lastdescount = document.getElementById("descount");
const descountProduct = document.querySelector("[data-descount]");
const priceBefore = document.querySelector("[data-price-before]");
const buttonAddProduct = document.getElementById("button-add");
const lastcategory = document.getElementById("category");
const lastdescription = document.getElementById("description");

lastname.addEventListener("input",()=>{
    nameProduct.textContent = lastname.value;
})

lastcover.addEventListener("input",()=>{
    coverProduct.src = lastcover.value
})

lastprice.addEventListener("input",()=>{
    const priceConvert = new Intl.NumberFormat('de-DE').format(parseInt(lastprice.value));
    const newPrice = "$"+ priceConvert;
    priceProduct.textContent = newPrice;
})

lastdescount.addEventListener("input",()=>{
    if(lastprice.value.toString().length > 4){
        priceBefore.textContent = "$"+lastprice.value;
        const price = parseInt(lastprice.value);
        const descount = parseInt(lastdescount.value)/100;
        const priceConvert = new Intl.NumberFormat('de-DE').format(parseInt(price-(price*descount)));
        priceProduct.textContent = "$"+ priceConvert;
        descountProduct.textContent = lastdescount.value+"% OFF";
    }
})


const createObjectProduct = () =>{
    const product = new Product();
    product.id = uuid.v4();
    product.name = lastname.value.toString();
    if(lastdescount.value.toString().length >= 1){
        const active = true;
        const porcent = lastdescount.value+"%";
        const priceBefore = new Intl.NumberFormat('de-DE').format(parseInt(lastprice.value));
        product.descount = {porcent,priceBefore,active}
        const newPrice = parseInt(lastprice.value)-(parseInt(lastprice.value)*parseInt(lastdescount.value)/100);
        product.price = new Intl.NumberFormat('de-DE').format(newPrice);
    }
    else{
        const active = false;
        const porcent = "";
        const priceBefore = " ";
        product.descount = {porcent,priceBefore,active}
        product.price = new Intl.NumberFormat('de-DE').format(parseInt(lastprice.value));
    }
    product.category = lastcategory.value;
    product.cover = lastcover.value;
    product.belike = false;
    product.description = lastdescription.value;
    return product;
}

buttonAddProduct.addEventListener("click",(e)=>{
    e.preventDefault();
    clientServices.createProduct(createObjectProduct());
})

