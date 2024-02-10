import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/ticket.models.js";
import { mailer } from "../config/nodemailer.js"

import mongoose from 'mongoose';

//1)
const getCarts = async (req, res) => {
    const { limit } = req.query;
    try {
        const carts = await cartModel.find().limit(limit);
        res.status(200).send({ respuesta: "ok", mensaje: carts });
    } catch (error) {
        res.status(400).send({ respuesta: "Error", mensaje: error });
    }
};

//2)
const getCartById = async (req, res) => {
    const { cid } = req.params;
    try {
        // Busca el carrito por su _id
        const cart = await cartModel.findById(cid);
        if (cart) {
            res.status(200).send({ respuesta: "OK", mensaje: cart });
        } else {
            res.status(404).send({ respuesta: "Error en consultar el carrito", mensaje: "Not Found" });
        }
    } catch (error) {
        res.status(400).send({ respuesta: "Error en consultar el carrito", mensaje: error });
    }
};

//3)
const updateCartsProducts = async (req, res) => {
    const { cid } = req.params;
    const productsArray = req.body;
    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ respuesta: "Error", mensaje: "Carrito no encontrado" });
        }
        if (!Array.isArray(productsArray)) {
            return res.status(400).send({ respuesta: "Error", mensaje: "Los productos deben estar en un arreglo" });
        }
        const updatedProducts = [];
        for (const prod of productsArray) {
            const productId = prod.productId;
            const quantity = prod.quantity;
            const product = await productModel.findById(productId);
            if (!product) {
                return res.status(404).send({ respuesta: "Error", mensaje: `Producto con ID ${productId} no encontrado` });
            }
            const existingProductIndex = cart.products.findIndex((cartProduct) => cartProduct._id.toString() === productId);
            if (existingProductIndex !== -1) {
                cart.products[existingProductIndex].quantity = quantity;
            } else {
                cart.products.push({ _id: productId, quantity: quantity });
            }
            updatedProducts.push({ _id: productId, quantity: quantity });
        }
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
        res.status(200).send({ respuesta: "OK", mensaje: "Carrito actualizado exitosamente", productosActualizados: updatedProducts, carrito: updatedCart });
    } catch (error) {
        console.error(error);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//4)
const deleteCartProducts = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            return res.status(404).send({ respuesta: "Error al eliminar productos del carrito", mensaje: "Carrito no encontrado" });
        }

        cart.products = [];
        const updatedCart = await cart.save();

        return res.status(200).send({ respuesta: "OK", mensaje: "Productos eliminados del carrito", carrito: updatedCart });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//5)
const deleteCartProduct = async (req, res) => {
    const { cid, pid } = req.params;

    try {
        const cart = await cartModel.findById(cid);
        if (!cart) {
            console.log("Carrito no encontrado:", cid);
            return res.status(404).send({ respuesta: "Carrito no encontrado", mensaje: "Not Found" });
        }

        
        const productId = new mongoose.Types.ObjectId(pid);

        
        const index = cart.products.findIndex((prod) => prod._id.equals(productId));
        if (index !== -1) {
            
            cart.products.splice(index, 1);
            console.log("Producto eliminado del carrito:", pid);
        } else {
            console.log("Producto no encontrado en carrito:", pid);
            return res.status(404).send({ respuesta: "Producto no encontrado en carrito", mensaje: "Not Found" });
        }

        
        await cart.save();
        console.log("Cambios guardados en el carrito:", cid);
        return res.status(200).send({ respuesta: "OK", mensaje: "Producto eliminado del carrito" });
    } catch (error) {
        console.error("Error en deleteCartProduct:", error);
        return res.status(500).send({ respuesta: "Error", mensaje: error.message });
    }
};

//6)
const addProductCart = async (req, res) => {
    const { cid, pid } = req.params;
    let { quantity } = req.body;

    try {
        
        if (quantity === undefined || isNaN(quantity) || quantity <= 0) {
            
            quantity = 1;
        }

        const updatedCart = await cartModel.findOneAndUpdate(
            { _id: cid, 'products._id': pid }, 
            { $inc: { 'products.$.quantity': quantity } }, 
            { new: true } 
        );

        if (!updatedCart) {
            const addedProductCart = await cartModel.findByIdAndUpdate(
                cid,
                { $push: { products: { _id: pid, quantity } } },
                { new: true }
            );

            if (!addedProductCart) {
                return res.status(404).send({ respuesta: "Error al agregar producto al carrito", mensaje: "Carrito no encontrado" });
            }

            res.status(200).send({ respuesta: "OK", mensaje: "Producto agregado al carrito", carrito: addedProductCart });
        } else {
            res.status(200).send({ respuesta: "OK", mensaje: "Cantidad de producto actualizada en el carrito", carrito: updatedCart });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    }
};

//7)
const createTicket = async (req, res) => {
    const { cid } = req.params;
    const purchaser = req.user.user.email;
    try {
        
        const cart = await cartModel.findById(cid);
        
        if (!cart) {
            res.status(404).send({ res: 'Error en finalización de compra', message: `El carrito con el ID ${cid} no existe` });
        }
        let montoTotal = 0;
        const productosConStock = [];
        const productosSinStock = [];
        
        for (const cartProduct of cart.products) {
            
            const product = await productModel.findById(cartProduct._id);
            if (!product) {
                return res.status(404).send({ respuesta: "Error", mensaje: `Producto con ID ${cartProduct._id} no encontrado` });
            }
            
            if (cartProduct.quantity <= product.stock) {
                montoTotal += product.price * cartProduct.quantity;
                product.stock -= cartProduct.quantity;
                cartProduct.quantity = 0;
                await productModel.findByIdAndUpdate(cartProduct._id, product);
                productosConStock.push(cartProduct);
            } else {
                productosSinStock.push(cartProduct);
            }
        }
        
        const ticket = await ticketModel.create({ amount: montoTotal, purchaser: purchaser });
        if (ticket) {
            
            cart.products = productosConStock;
            const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: cart.products }, { new: true });
            
            await mailer.sendPurchaseConfirmation(purchaser, ticket._id);
            if (updatedCart) {
                return res.status(200).send({ message: "exito" });
            }
        }
        console.log("Productos sin stock:", productosSinStock);
        res.status(500).send({ respuesta: "Error", mensaje: "Ha ocurrido un error en el servidor" });
    } catch (error) {
        res.status(400).send({ res: 'Error en finalización del carrito', message: error });
    }
};

//8)
const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
        
        const existingCart = await cartModel.findById(cid);
        if (!existingCart) {
            return res.status(404).send({ error: "Carrito no encontrado" });
        }
        
        const existingProduct = await productModel.findById(pid);
        if (!existingProduct) {
            return res.status(404).send({ error: "Producto no encontrado" });
        }
        
        const existingProductIndex = existingCart.products.findIndex(product => product._id === pid);
        if (existingProductIndex !== -1) {
            
            existingCart.products[existingProductIndex].quantity = quantity;
        } else {
            
            existingCart.products.push({
                _id: pid,
                quantity: quantity
            });
        }
        
        const updatedCart = await cartModel.findByIdAndUpdate(cid, { products: existingCart.products }, { new: true });
        return res.status(200).send(updatedCart);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Error al actualizar la cantidad del producto en el carrito", mensaje: "Ha ocurrido un error en el servidor" });
    }
};


export const cartController = {
    getCarts,
    getCartById,
    updateCartsProducts,
    deleteCartProducts,
    deleteCartProduct,
    addProductCart,
    createTicket,
    updateProductQuantity
};