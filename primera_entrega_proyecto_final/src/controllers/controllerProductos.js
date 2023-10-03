import { prodContenedor } from "../routers/routerProductos.js";

export async function getProducts(req, res) {
  const id = req.params.id;
  res.status(200).json(
    id ? await prodContenedor.getById(id)
      : await prodContenedor.getAll()
  );
}

class Product {
  constructor(title, description, code, price, status, stock, category) {
    this.title = title;
    this.description = description;
    this.code = code;
    this.price = price;
    this.status = status || true;
    this.stock = stock;
    this.category = category;
  }
}
export async function postProduct(req, res) {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const newProduct = new Product(
    title, 
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  await prodContenedor.save(newProduct);
  res.status(201).json({ message: "Nuevo producto creado" });
}

export async function putProduct(req, res) {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const id = req.params.id;
  const newProduct = new Product(
    title, 
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  );
  await prodContenedor.updateById(id, newProduct);
  res.status(200).json({ message: "Producto actualizado correctamente" });
}

export async function deleteProduct(req, res) {
  await prodContenedor.deleteById(req.params.id);
  res.status(200).json({ message: "Producto eliminado correctamente" });
}

export function isProductAvailable(req, res, next) {
  prodContenedor.getById(req.params.id) == null
    ? res.status(404).json({ error: -3, descripcion: "El producto no existe" })
    : next();
}

export async function isIdValid(req, res, next) {
  const id = req.params.id;
  if (id === undefined){
    next();
  }else{
    const response = await prodContenedor.getById(id);
    if (response === null){
      res.status(401).json({ error: -3, descripcion: "El producto no existe" })
    }else{
      next();
    }
  }
}