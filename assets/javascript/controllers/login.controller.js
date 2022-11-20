import { clientServices } from "../service/cliente-service.js";
import { Validateservice } from "../service/validate-service.js";

// const button = document.getElementById("button-login");
const form = document.getElementById("form-login")
const emailArea = document.getElementById("email");
const passArea = document.getElementById("password");


Validateservice.validateInput(emailArea);
Validateservice.validateInput(passArea);

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = emailArea.value;
    const pass = passArea.value;
    try {
        clientServices.authUSER(email,pass).then(response=> {
            if(response){
                document.location.href = "./products.html"
            }
            if(response === false){
                alert("Usuario y/o Contraseña incorrectas");
            }
            if(response === undefined){
                alert("Error de conexión")
            }
            form.reset();
        })
    } catch (error) {
        alert("Ups! sucedio un error")
    }
    

});

const formSearch = document.querySelector("#form-search"); 
const inputSearch = document.querySelector("#search-text"); 

formSearch.addEventListener("submit",(e)=>{
    e.preventDefault();
    window.location.href = `search.html?name=${inputSearch.value}`
})