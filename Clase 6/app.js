import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();
const productManager = new ProductManager("./productos.json");

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {

    let limit = req.query.limit;
    const products = await productManager.getProducts();
    if (!limit){
        return res.send(products);
    }
    res.send(products.slice(0, limit));
})

app.get('/products/:pid', async (req, res) => {

    let id = req.params.pid;
    const productById = await productManager.getProductById(id);
    return res.send(productById);
})

app.listen(8080, () => console.log("Server running on port 8080"))