//import { Product } from "../models/product.class.js";
import { clientServices } from "../service/cliente-service.js";
const log = console.log;

const createSection = (title)=>{
    const id = title.replace(" ","-").toLowerCase();
    let scrollerActive = "products-scroller"
    if(title !== "Star wars"){scrollerActive = ""}
    const sectionInnerHTML = `
    <section class="products" id="${id}">
        <div class="products__title">
            <h2 class="products__title-content"><a class="products__title-link" href="#">Artículos: ${title} <img class="products__title-link-img" src="./assets/images/icons/right.svg" alt="icono"></a></h2>
        </div>
        <div class="products-container ${scrollerActive}" data-products="${title}">
        </div>
    </section>
    `;
    return sectionInnerHTML;
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

const main = document.querySelector("main");
const categories = new Set();
const productList = []

clientServices.productList("LOCAL")
.then((data)=>{
    data.forEach(product => {
        categories.add(product.category);
        productList.push(product);
    });
})
.finally(()=>{
    categories.forEach((category)=>{
        main.innerHTML += createSection(category)
        const productContainer = document.querySelector(`[data-products="${category}"]`);
        productList.forEach((product)=>{
            if(product.category === category){
                productContainer.innerHTML += createProduct(product);
            }
        })
    })
    touchProduct();
})


const touchProduct = () =>{
    const products = document.querySelectorAll("[data-product]");
    products.forEach((product)=>{
        product.addEventListener("click",()=>{
            //log(product.dataset.product);
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