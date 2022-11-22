import { createAlert } from "../service/alerts-service.js";
import { clientServices } from "../service/cliente-service.js";

const createProduct = (product) =>{
    let like = "";
    let activeDescount = "";
    // if(clientServices.likedProduct(product.id)){ like = "product__mark--like"}
    // if(!product.descount.active){ activeDescount = "not"}
    const productInnerHTML = `
    <div class="product card-view" data-product="${product.id}">
        <div class="product__controls">
            <img class="product__controls-icon" data-edit="${product.id}" src='assets/images/icons/edit.svg' alt='icon' title='Editar producto'/>
            <img class="product__controls-icon" data-delete="${product.id}" src='assets/images/icons/delete.svg' alt='icon' title='Eliminar producto' />
        </div>
        <img class="product__preview" src=${product.cover} alt="preview">
        <div class="product-content product-content--not">
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
    productList.forEach((product)=>{
        const category = "Todos";
        const productContainer = document.querySelector(`[data-products="${category}"]`);
        productContainer.innerHTML += createProduct(product);
    })
    touchProduct();
})


let controlDelete = false;
const touchProduct = () =>{
    // const products = document.querySelectorAll("[data-product]");
    const deleteProduct = document.querySelectorAll("[data-delete]");
    const editProduct = document.querySelectorAll("[data-edit]");
    
    deleteProduct.forEach((productToDelete)=>{
        productToDelete.addEventListener('click',()=>{
            if(controlDelete){
                clientServices.deletingProduct(productToDelete.dataset.delete);
                controlDelete = false;
            }
            else{
                createAlert('NORMAL','Presiona el icono de eliminar de nuevo')
                controlDelete = true;
            }
        })
    })

    editProduct.forEach((productToEdit)=>{
        productToEdit.addEventListener('click',()=>{
            window.location.href = `add.html?id=${productToEdit.dataset.edit}`
        })
    })

    // const products = document.querySelectorAll(".product-content");
    // products.forEach((product)=>{
    //     product.addEventListener("click",()=>{
    //         //log(product.dataset.product);
    //         window.location.href = `./product.html?id=${product.dataset.product}`
    //     })
    // })

}

const button = document.getElementById("button-add");
button.addEventListener("click",()=>{
    document.location.href = "./add.html"
})

const formSearch = document.querySelector("#form-search"); 
const inputSearch = document.querySelector("#search-text"); 

formSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    window.location.href = `search.html?name=${inputSearch.value}`
})

