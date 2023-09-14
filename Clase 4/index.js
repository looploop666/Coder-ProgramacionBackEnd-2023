const { ProductManager } = require('./managers/ProductManager');

const manager = new ProductManager('./files/productos.json');

const env = async () => {

    const products = await manager.getProducts();
    console.log('----------------------products----------------------', products);

    const product = {
        title: 'producto prueba',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    }
    const productAdded = await manager.addProduct(product);
    const products2 = await manager.getProducts();
    console.log('----------------------products2----------------------', products2);

    const productById = await manager.getProductById(1);
    console.log(productById);
    const productById2 = await manager.getProductById(2);
    console.log(productById2);
    
    const productUpdated = {
        title: 'producto cambiado',
        description: 'Este es un producto prueba',
        price: 200,
        thumbnail: 'Sin imagen',
        code: 'abc123',
        stock: 25,
    }
    await manager.updateProduct(1, productUpdated);
    const products3 = await manager.getProducts();
    console.log('--------------------products3--------------------', products3);

    await manager.deleteProduct(1);
    const products4 = await manager.getProducts();
    console.log('----------------------products4----------------------', products4);

    await manager.deleteProduct(2);


}

env();