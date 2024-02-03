import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { productController } from "../controllers/products.controller.js";

const productRouter = Router()

productRouter.get('/', productController.getProducts)

productRouter.post('/', passportError('jwt'), authorization('admin'), productController.createProduct)

productRouter.put('/:id', passportError('jwt'), authorization('admin'), productController.updateProduct)

productRouter.delete('/:id', passportError('jwt'), authorization('admin'), productController.deleteProduct)



productRouter.get('/:id', productController.getProductById)

export default productRouter