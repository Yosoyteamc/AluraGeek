import dataJSON from "../../../server/db.local.json" assert {type:"json"}
const localData = "../../../server/db.local.json";
const URL = "http://localhost:3000/products";


const productList = async(access = "LOCAL") => {
    let data; 
    try {
        if(access==="REMOTO"){data = await fetch(URL)};
        if(access==="LOCAL"){data = await fetch(localData)};
    } catch (error) {
        console.log("ERROR: CONECCT TO SERVER LOCAL");
        return data = dataJSON;
    }
    return await data.json();
}

export const clientServices = {
    productList,
}