
class Product {
    constructor(id, title, description, price, thumbnail, code, stock){
        this.id = id;
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}


class ProductManager {

    constructor(){
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock){
        if(title && description && price && thumbnail && code && stock){
            if (this.products.find(product => product.code === code)) {
                console.log("El codigo ya existe");
            }else{
                const id = this.createId();
                const product = new Product(id, title, description, price, thumbnail, code, stock);
                this.products.push(product);
            }
            
        }else{
            console.log("Todos los campos son obligatorios");
        }
    }
    createId(){
        if (this.products.length === 0){
            return 1;
        }else{
            return this.products[this.products.length - 1].id + 1;
        }
    }



   getProducts(){
       return this.products;
   }

   getProductById(id){
       const product = this.products.find(product => product.id === id);
       if (product){
           return product;
       }else{
           console.error("Not found");
       }
   }

}

const productManager = new ProductManager();
const products = productManager.getProducts();
console.log(products);

productManager.addProduct(
    "Producto Prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
)

const products2 = productManager.getProducts();
console.log(products2);

productManager.addProduct(
    "Producto Prueba",
    "Este es un producto prueba",
    200,
    "Sin imagen",
    "abc123",
    25
)

const resultOk = productManager.getProductById(1);
console.log(resultOk);
const resultNok = productManager.getProductById(2);
console.log(resultNok);