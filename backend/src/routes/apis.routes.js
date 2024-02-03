import express from "express";
import userRouter from './users.routes.js';
import productRouter from './products.routes.js';
import cartRouter from './carts.routes.js';
import sessionRouter from "./sessions.routes.js";
import loggerRouter from "./logger.routes.js";
import mockingRouter from "./mocking.routes.js";

const apiRouter = express.Router();


Router.use('/api/users', userRouter)
Router.use('/api/loggerTest', loggerRouter)
Router.use('/api/products', productRouter)
Router.use('/api/carts', cartRouter)
Router.use('/api/sessions', sessionRouter)
Router.use('/api/mockingproducts', mockingRouter)

export default apiRouter;