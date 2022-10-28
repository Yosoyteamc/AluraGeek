export class Product{
    id = "";
    name = "";
    price = 0;
    descount = {
        porcent:"",
        priceBefore:0,
        active:false
    };
    category = "";
    belike = false;
    cover = "";
    description = "";

    constructor(id,name,price,descount,category,belike,cover,description){
        this.id = id;
        this.name = name;
        this.price = price;
        this.descount = descount;
        this.category = category;
        this.belike = belike;
        this.cover = cover;
        this.description = description
    }
}