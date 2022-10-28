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
