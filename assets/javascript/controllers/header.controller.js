const openSearch = document.getElementById('navbar-search-open');
const closeSearch = document.getElementById('search-form-close');
const searchArea = document.querySelector('.navbar-search-form');
const textSearchArea = document.getElementById('search-text');
const modal = document.querySelector(".modal-bg");
const openMenu = document.getElementById("navbar-menu");
const closeMenu = document.querySelector(".modal__item--close");

const searchActive =()=>{
    searchArea.classList.toggle('search-form');
    textSearchArea.focus();
    textSearchArea.value = "";
}

const openModal = () =>{
    modal.classList.toggle("modal-bg--active");
}

openSearch.addEventListener('click',searchActive);
closeSearch.addEventListener('click',searchActive);
openMenu.addEventListener("click",openModal);
closeMenu.addEventListener("click",openModal);