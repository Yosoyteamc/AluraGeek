const URL = "http://localhost:3000/products";
const localData = "../../../server/db.local.json";

const productList = async(access = "LOCAL") => {
    let data; 
    try {
        if(access==="REMOTO"){data = await fetch(URL)};
        if(access==="LOCAL"){data = await fetch(localData)};
    } catch (error) {
        console.log("Sin conexión a las bases de datos");
        data = await fetch(localData)
    }
    return await data.json();
}

export const clientServices = {
    productList,
}