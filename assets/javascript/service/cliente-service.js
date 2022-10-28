const productList = () => fetch("http://localhost:3000/products").then((response)=>response.json());

export const clientServices = {
    productList,
}