import { clientServices } from "../service/cliente-service.js";

const url = new URL(window.location);
const id = url.searchParams.get("id");
const thumbnails = document.querySelectorAll("[data-thumbnails]");
const cover = document.querySelector("[data-cover]");
const name = document.querySelector("[data-name]");
const price = document.querySelector("[data-price]");
const descount = document.querySelector("[data-descount]");
const description = document.querySelector("[data-desc]");

if(id === null){
    window.location.href = `./index.html`
}

const product = await clientServices.detailProduct(id);

thumbnails.forEach((thumbnail)=>{
    thumbnail.src = product.cover;
})
name.textContent = product.name
cover.src = product.cover;
price.textContent = "$"+product.price+" COP";
descount.textContent = product.descount.porcent+" OFF";
description.textContent = product.description;

const createProduct = (product) =>{
    let like = "";
    let activeDescount = "";
    if(product.belike){ like = "product__mark--like"}
    if(!product.descount.active){ activeDescount = "not"}
    const productInnerHTML = `
    <div class="product card-view" data-product="${product.id}">
        <div class="product__mark ${like}" data-like></div>
        <img class="product__preview" src=${product.cover} alt="preview de producto">
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
    setLike();
    touchProduct();
})

const setLike = () =>{
    const hearts = document.querySelectorAll("[data-like]");
    hearts.forEach((heart)=>{
        heart.addEventListener("click",()=>{
             heart.classList.toggle("product__mark--like");
             heart.classList.toggle("scale-up-center");
        });
    })
}

const touchProduct = () =>{
    const products = document.querySelectorAll("[data-product]");
    products.forEach((product)=>{
        product.addEventListener("click",()=>{
            window.location.href = `./product.html?id=${product.dataset.product}`
        })
    })
}