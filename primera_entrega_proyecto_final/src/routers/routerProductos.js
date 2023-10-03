import express from "express";
import Contenedor from "../../contenedor.js";
import { getProducts, postProduct, putProduct, deleteProduct, isProductAvailable, isIdValid } from "../controllers/controllerProductos.js";

const { Router } = express;
const prodRouter = Router();

export const prodContenedor = new Contenedor("./data/productos.json");

prodRouter.get("/:pid?", isIdValid, getProducts);

prodRouter.post("/", postProduct);

prodRouter.put("/:pid", isProductAvailable, putProduct);

prodRouter.delete("/:pid", isProductAvailable, deleteProduct);

export default prodRouter;



