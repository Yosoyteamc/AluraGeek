import dataJSON from "../../../server/db.json" assert {type:"json"}
import { Product } from "../models/product.class.js";
import { createAlert } from "./alerts-service.js";
let data; 
const URL_USER = "https://636079be67d3b7a0a6af7b39.mockapi.io/api/v1/users";
const URL_ACCESS = "https://636079be67d3b7a0a6af7b39.mockapi.io/api/v1/users/1/Access"
const URL_PRODUCTS = "https://636079be67d3b7a0a6af7b39.mockapi.io/api/v1/products";
let addlike; 

const authUSER = async (email,pass) =>{
    let result = false
    try {
        data = await fetch(URL_USER + `?email=${email}`).then( response => response.json()).then( responseJSON => responseJSON);
        if(data[0].password === pass){
            const access = {userId: data[0].id, datatime: (new Date()).toLocaleString()}
            await fetch(URL_ACCESS,{
                method: "POST",
                headers:{
                  "content-Type": "application/json"
                },
                body: JSON.stringify(access)
            }).catch(error => createAlert('ERROR',error));
            result = true;
        }
        else{
            result = false
        }
    } catch (error) {
        result = undefined;
        //console.log("Contraseña y/o usuario incorrecto");
    }
    return result;
}

const productList = async() => {
    try {
        data = await fetch(URL_PRODUCTS).then( response => response.json() ).then( responseJSON => responseJSON ); 
        localStorage.setItem("db-products", JSON.stringify(data));
    } catch (error) {
        // console.log("ERROR: CONECCT TO SERVER LOCAL");
        createAlert('ERROR','Error al intentar conectarse al servidor');
        data =  JSON.parse(localStorage.getItem("db-products")) || dataJSON;
        localStorage.setItem("db-products", JSON.stringify(data));
        createAlert('NORMAL','Se importaron datos locales...');
        return data;
    }
    return data;
}

const createProduct = async(product = new Product()) => {
    try {
        await fetch(URL_PRODUCTS,{
            method: "POST",
            headers:{
              "content-Type": "application/json"
            },
            body: JSON.stringify(product)
        }).then( response =>  createAlert('SUCCESS','Producto creado'));
    } catch (error) {
        createAlert('ERROR','Error al intentar conectarse al servidor');
        data = JSON.parse(localStorage.getItem("db-products")) || dataJSON;
        product.id = (dataJSON.length + 1).toString();
        data.push(product);
        localStorage.setItem("db-products", JSON.stringify(data));
        createAlert('SUCCESS','Producto creado localmente')
        return; 
    }
  }

const detailProduct = async(id) =>{
    try {
        data = await fetch(URL_PRODUCTS+`/${id}`)
        .then(response=>response.json())
        .catch(()=>{
            createAlert('ERROR','No podemos acceder al contenido del servidor');
            const dataLocal = JSON.parse(localStorage.getItem("db-products")) || dataJSON
            const productLocal = dataLocal.filter((product)=>{return product.id === id});
            if(productLocal.length === 0){
                window.location.href = `./index.html`; 
                throw new Error("Ups, no hay producto");
            }
            return productLocal[0];
        })
        .then(responseJSON => responseJSON)
        // console.log(data);
    } catch (error) {
        createAlert('ERROR','Producto no encontrado');
    }
    return data;
}

const controLikeProductLocal = (id)=>{
    addlike = JSON.parse(localStorage.getItem("products-liked")) || [];
    let found = false;
    if (!addlike.length){
        addlike.push({id, liked:true});
        localStorage.setItem("products-liked", JSON.stringify(addlike));
        return;
    }
    addlike.forEach(product => {
        if(product.id === id){
            product.liked = !product.liked
            found = true;
        }    
    });
    if(!found){addlike.push({id, liked:true})}
    localStorage.setItem("products-liked", JSON.stringify(addlike));
}

const likedProduct = (id) =>{
    let result = false;
    addlike = JSON.parse(localStorage.getItem("products-liked")) || [];
    if (!addlike.length){ return false}
    addlike.forEach((product)=>{
        if(product.id === id){
            result = product.liked;
        }
    })
    return result;
}


export const clientServices = {
    productList, createProduct, authUSER, detailProduct, controLikeProductLocal, likedProduct,
}