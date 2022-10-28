import { Product } from "../components/product.class.js";
import { clientServices } from "../service/cliente-service.js";
const log = console.log;
const productList = [];

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


clientServices.productList().then((data)=>{
    data.forEach(product => {
        productList.push(product);
    });
});
