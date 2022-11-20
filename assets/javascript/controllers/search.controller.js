import { clientServices } from "../service/cliente-service.js";

const url = new URL(window.location);
const nameSearch = url.searchParams.get("name");
const categorySearch = url.searchParams.get("category") || undefined;
const descountSearch = url.searchParams.get("descount") || undefined;
const title = document.querySelector(".products__title-content");
const productList = [];

// if(nameSearch === null && categorySearch === undefined && descountSearch === undefined){
//     console.log("Params not found");
//     window.location.href = `./index.html`;
// }

if(nameSearch){
    title.textContent = 'Productos: "' + nameSearch +'"';
}
if(categorySearch){
    title.textContent = 'Explorar: '+ categorySearch;
    if(descountSearch){
        title.textContent = 'Explorar: '+ categorySearch + ' con ' + descountSearch + ' de descuento' ;
    }
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

clientServices.productList("LOCAL")
.then((data)=>{
    data.forEach(product => {
        productList.push(product);
    });
})
.finally(()=>{
    const category = "Todos";
    const productContainer = document.querySelector(`[data-products="${category}"]`);
    
    if(nameSearch !== null){
        productList.forEach((product)=>{
            if(
                nameSearch.toLocaleLowerCase() === product.name.toLocaleLowerCase() ||
                product.name.toLocaleLowerCase().includes(nameSearch.toLocaleLowerCase()) ||
                product.category.toLocaleLowerCase() === nameSearch.toLocaleLowerCase()
            ){
                productContainer.innerHTML += createProduct(product);
            }
        })
    }
    else{
        if(descountSearch !== undefined){
            productList.forEach((product)=>{
                if(
                    categorySearch.toLocaleLowerCase() === product.category.toLocaleLowerCase() &&
                    descountSearch.toLocaleLowerCase() === product.descount.porcent.toLocaleLowerCase()
                ){
                    productContainer.innerHTML += createProduct(product);
                }
            })
        }
        else
        {
            productList.forEach((product)=>{
                if(categorySearch.toLocaleLowerCase() === product.category.toLocaleLowerCase()){
                    productContainer.innerHTML += createProduct(product);
                }
            })
          }
    }

    // setLike();
    touchProduct();
})

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
