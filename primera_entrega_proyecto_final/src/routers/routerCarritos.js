import express from "express";
const { Router } = express;
import Contenedor from "../../contenedor.js";
import {
  postCart,
  deleteCart,
  getProductsInCart,
  postProductInCart,
  deleteProductInCart,
  isCartAvailable, 
  isProductAvailable, 
  isProductInCart 
} from "../controllers/controllerCarritos.js";

const routerCarrito = Router();

export const carContenedor = new Contenedor("./data/carritos.json");

routerCarrito.post("/", postCart);

routerCarrito.get("/:cid", isCartAvailable, getProductsInCart);

routerCarrito.post("/:cid/product/:pid", isCartAvailable, isProductAvailable, postProductInCart);

export default routerCarrito;