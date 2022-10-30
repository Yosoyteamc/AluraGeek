import { Product } from "../components/product.class.js";
import { clientServices } from "../service/cliente-service.js";
const log = console.log;

const openSearch = document.getElementById('navbar-search-open');
const closeSearch = document.getElementById('search-form-close');
const searchArea = document.querySelector('.navbar-search-form');
const textSearchArea = document.getElementById('search-text');

const searchActive =()=>{
    searchArea.classList.toggle('search-form');
    textSearchArea.focus();
    textSearchArea.value = "";
}

openSearch.addEventListener('click',searchActive);
closeSearch.addEventListener('click',searchActive);

const createSection = (title)=>{
    const id = title.replace(" ","-").toLowerCase();
    let scrollerActive = "products-scroller"
    if(title === "Consolas"){scrollerActive = ""}
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
    let like = "alike";
    let activeDescount = "";
    if(product.belike){ like = "like"}
    if(!product.descount.active){ activeDescount = "not"}
    const productInnerHTML = `
    <div class="product card-view" data-product="${product.id}">
        <img class="product__mark" src="./assets/images/icons/${like}.svg" alt="icono">
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

})

