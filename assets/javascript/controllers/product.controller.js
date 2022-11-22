import { clientServices } from "../service/cliente-service.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");
const thumbnails = document.querySelectorAll("[data-thumbnails]");
const cover = document.querySelector("[data-cover]");
const name = document.querySelector("[data-name]");
const price = document.querySelector("[data-price]");
const descount = document.querySelector("[data-descount]");
const description = document.querySelector("[data-desc]");
const heart = document.querySelector("[data-like-real]");


if(id === null){
    window.location.href = `./index.html`
}

const product = await clientServices.detailProduct(id);

if(typeof(product) !== "object"){
    window.location.href = `./index.html`
}

thumbnails.forEach((thumbnail)=>{
    thumbnail.src = product.cover;
})
name.textContent = product.name
cover.src = product.cover;
price.textContent = "$"+product.price+" COP";
if(product.descount.active){
    descount.textContent = product.descount.porcent+" OFF";
}
else{
    descount.textContent = "";
}
description.textContent = product.description;

if(clientServices.likedProduct(product.id)){ 
    heart.classList.add("view-product-details__mark--like")
}


const createProduct = (product) =>{
    let like = "";
    let activeDescount = "";
    if(clientServices.likedProduct(product.id)){ like = "product__mark--like"}
    if(!product.descount.active){ activeDescount = "not"}
    const productInnerHTML = `
    <div class="product card-view" data-product="${product.id}">
        <div class="product__mark ${like}" data-like></div>
        <img class="product__preview" src=${product.cover} alt="preview">
        <div class="product-content">
            <span class="product-content__price-before ${activeDescount}">$${product.descount.priceBefore}</span>
            <p class="product-content__price">$${product.price} <span class="product-content__descount ${activeDescount}">${product.descount.porcent} OFF</span></p>
            <p class="product-content__details">${product.name}</p>
        </div>
    </div>
    `;
    return productInnerHTML;
}

const productList = []

clientServices.productList()
.then((data)=>{
    data.forEach(product => {
        productList.push(product);
    });
})
.finally(()=>{
    const category = "similares";
    const productContainer = document.querySelector(`[data-products="${category}"]`);
    let count = 0;
    productList.forEach((pro)=>{
        if(pro.category === product.category && count <= 5 && product.id !== pro.id){
            productContainer.innerHTML += createProduct(pro);
            count++;
        }
    })
    touchProduct();
})

heart.addEventListener("click",()=>{
        heart.classList.toggle("view-product-details__mark--like");
        heart.classList.toggle("scale-up-center");
        clientServices.controLikeProductLocal(product.id);
});

const touchProduct = () =>{
    const products = document.querySelectorAll("[data-product]");
    products.forEach((product)=>{
        product.addEventListener("click",()=>{
            window.location.href = `./product.html?id=${product.dataset.product}`
        })
    })
}


const formSearch = document.querySelector("#form-search"); 
const inputSearch = document.querySelector("#search-text"); 

formSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    window.location.href = `search.html?name=${inputSearch.value}`
})