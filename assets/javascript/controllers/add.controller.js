import { Product } from "../models/product.class.js";
import { clientServices } from "../service/cliente-service.js";
import { Validateservice } from "../service/validate-service.js";
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
const form = document.querySelector("[data-form]");
const url = new URL(window.location);
const idProductToEdit = url.searchParams.get("id") || undefined;
let productToUpdate;
let update = false;

if (idProductToEdit !== undefined) {
    productToUpdate = await clientServices.detailProduct(idProductToEdit);
    lastname.value = nameProduct.textContent = productToUpdate.name;
    lastcover.value = coverProduct.src = productToUpdate.cover;
    lastprice.value= (productToUpdate.descount.priceBefore).toString().replaceAll(".","").length === 0 ? productToUpdate.price : (productToUpdate.descount.priceBefore).toString().replaceAll(".","");
    priceProduct.textContent = "$"+productToUpdate.price;
    priceBefore.textContent = (productToUpdate.descount.priceBefore).toString().replaceAll(" ", "").length === 0? "$0": productToUpdate.descount.priceBefore;
    lastdescount.value = (productToUpdate.descount.porcent).toString().replace("%","");
    descountProduct.textContent = productToUpdate.descount.porcent+" OFF";
    lastdescription.value = productToUpdate.description;
    lastcategory.value = productToUpdate.category;

    const title = document.querySelector(".add-product__title");
    title.textContent = "Información del producto a actualizar:";
    buttonAddProduct.value = "Actualizar"
    update = true;
}

Validateservice.validateInput(lastname);
Validateservice.validateInput(lastcover);
Validateservice.validateInput(lastprice);
Validateservice.validateInput(lastdescount);
Validateservice.validateInput(lastdescription);


lastname.addEventListener("input",()=>{
    nameProduct.textContent = lastname.value;
})

lastcover.addEventListener("input",()=>{
    coverProduct.src = lastcover.value;

})

lastprice.addEventListener("input",()=>{
    const priceConvert = new Intl.NumberFormat('de-DE').format(parseInt(lastprice.value));
    const newPrice = "$"+ priceConvert;
    priceProduct.textContent = newPrice;
    lastdescount.value = "";
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
    //product.id = uuid.v4();
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

const previewReset = () => {
    nameProduct.textContent = 'Nombre De Producto';
    coverProduct.src = './assets/images/preview.jpg';
    priceProduct.textContent = '$99.999';
    lastdescount.textContent = "0% OFF";
    priceBefore.textContent = "$0";
}

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    if(update){
        clientServices.updateProduct(Object.assign({}, createObjectProduct(), {id: productToUpdate.id}),productToUpdate.id);
    }
    else{
        clientServices.createProduct(createObjectProduct());
        form.reset();
        previewReset();
    }
})

const formSearch = document.querySelector("#form-search"); 
const inputSearch = document.querySelector("#search-text"); 

formSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    window.location.href = `search.html?name=${inputSearch.value}`
})