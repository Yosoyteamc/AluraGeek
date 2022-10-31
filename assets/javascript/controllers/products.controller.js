import { clientServices } from "../service/cliente-service.js";

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

clientServices.productList("LOCAL")
.then((data)=>{
    data.forEach(product => {
        productList.push(product);
    });
})
.finally(()=>{
    const category = "Todos";
    const productContainer = document.querySelector(`[data-products="${category}"]`);
    productList.forEach((product)=>{
        productContainer.innerHTML += createProduct(product);
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
            log(product.dataset.product);
        })
    })
}

const button = document.getElementById("button-add");
button.addEventListener("click",()=>{
    document.location.href = "./add.html"
})