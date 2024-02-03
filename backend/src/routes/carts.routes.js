import { Router } from "express";
import { passportError, authorization } from "../utils/messagesError.js";
import { cartController } from "../controllers/carts.controller.js";

const cartRouter = Router();

cartRouter.get("/", passportError('jwt'), authorization('admin'), cartController.getCarts);

cartRouter.post("/:cid/products/:id", passportError('jwt'), authorization(['user','premium']), cartController.addProductCart);

cartRouter.post("/", passportError('jwt'), authorization(['user','premium']), cartController.createTicket)

cartRouter.put("/", passportError('jwt'), authorization(['user','premium']), cartController.updateCartsProducts);

cartRouter.put("/product/:id", passportError('jwt'), authorization(['user','premium']), cartController.updateProductQuantity);

cartRouter.delete("/", passportError('jwt'), authorization(['user','premium']), cartController.deleteCartProducts);

cartRouter.delete("/products/:id", passportError('jwt'), authorization(['user','premium']), cartController.deleteCartProduct);



cartRouter.get("/:cid", passportError('jwt'), authorization('admin'), cartController.getCartById);

export default cartRouter;