import { clientServices } from "../service/cliente-service.js";

const button = document.getElementById("button-login");
const form = document.getElementById("form-login")
const emailArea = document.getElementById("email");
const passArea = document.getElementById("password");


form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const email = emailArea.value;
    const pass = passArea.value;
    clientServices.authUSER(email,pass).then(response=> {
        if(response){
            document.location.href = "./products.html"
        }
        else{
            alert("Usuario y/o Contraseña incorrectas")
        }
        form.reset();
    });
});