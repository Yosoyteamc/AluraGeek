import dataJSON from "../../../server/db.local.json" assert {type:"json"}
//const localData = "../../../server/db.local.json";
import { Product } from "../components/product.class.js";
const URL = "http://localhost:3000/products";
let data; 

const productList = async(access = "LOCAL") => {
    try {
        if(access==="REMOTO"){data = await fetch(URL)};
        if(access==="LOCAL"){
            data =  JSON.parse(localStorage.getItem("db-products")) || dataJSON;
        };
    } catch (error) {
        console.log("ERROR: CONECCT TO SERVER LOCAL");
        return data = dataJSON;
    }
    return data;
}

const createProduct = async(product = new Product(), access = 'LOCAL') => {
    data = JSON.parse(localStorage.getItem("db-products")) || dataJSON;
    try {
        if(access==="REMOTO"){await fetch(URL,{
            method: "POST",
            headers:{
              "content-Type": "application/json"
            },
            body: JSON.stringify(product)
          });}
          if(access === "LOCAL"){
            data.push(product);
          }
    } catch (error) {
        console.log("Error");
        return
    }
    localStorage.setItem("db-products", JSON.stringify(data))
    console.log(data);
  }


export const clientServices = {
    productList, createProduct
}