const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            const id = this.createId(products);
            const newObject = { title: product.title, description: product.description, price: product.price, thumbnail: product.thumbnail, code: product.code, stock: product.stock, id: id }
            products.push(newObject);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;
        } catch (error) {
            console.log(error);
        }

    }
    createId(products) {
        if (products.length === 0) {
            return 1;
        } else {
            return this.products[products.length - 1].id + 1;
        }
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const result = await fs.promises.readFile(this.path, 'utf-8');
                const data = await JSON.parse(result);
                return data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }

    }

    getProductById = async (id) => {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getProducts();
            const objectFound = data.find(x => x.id === id);

            return objectFound ?? null;
        } catch (error) {
            console.error("Not found");
        }

    }

    updateProduct = async (id, product) => {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getProducts();
            const objectFound = data.find(x => x.id === id);
            if (objectFound) {
                const newObject = { title: product.title, description: product.description, price: product.price, thumbnail: product.thumbnail, code: product.code, stock: product.stock, id: id }
                data[newObject.id-1] = newObject;
                await fs.promises.writeFile(this.path, JSON.stringify(data, null, '\t'));
            } 
           
        } catch (error) {
            console.log(error);
        }

    }

    async deleteProduct(id) {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getProducts();
            const objectFound = data.find(x => x.id === id);
            if (objectFound) {
                const newData = data.filter(x => x.id !== id);

                await fs.promises.writeFile(this.path, JSON.stringify(newData));

            } else {
                throw new Error("El id ingresado no existe.");
            }
        }
        catch (error) {
            console.log(error);
        }
    }
}
module.exports = {
    ProductManager
}