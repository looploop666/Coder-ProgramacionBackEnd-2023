const fs = require('fs');

class ProductManager {

    constructor(path) {
        this.path = path;
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();
            const id = this.createId();
            product.id = id;

            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return product;
        } catch (error) {
            console.log();
        }

    }
    createId() {
        if (this.products.length === 0) {
            return 1;
        } else {
            return this.products[this.products.length - 1].id + 1;
        }
    }

    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                return JSON.parse(data);
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

    updateProduct = async (id, object) => {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            let data = [];
            const newObject = { title: object.title, price: object.price, thumbnail: object.thumbnail, id: id }
            data.push(newObject);
            await fs.promises.appendFile(this.fileName, JSON.stringify(data));
           
        } catch (error) {
            console.log();
        }

    }

    async deleteProduct(id) {
        try {
            if (isNaN(id)) throw new Error("El id ingresado es inválido");

            const data = await this.getProducts();
            const objectFound = data.find(x => x.id === id);
            if (objectFound) {
                const newData = data.filter(x => x.id !== id);

                await fs.promises.writeFile(this.fileName, JSON.stringify(newData));

            } else {
                throw new Error("El id ingresado no existe.");
            }
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
module.exports = {
    ProductManager
}