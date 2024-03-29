import { productModel } from "../models/products.models.js";

//1)
const getProducts = async (req, res) => {
    
    const { limit, page, sort, category } = req.query;

    
    const pag = page ? page : 1;
    const lim = limit ? limit : 10;
    const ord = sort == 'asc' ? 1 : -1;

    
    const queryCondition = category ? { category, status: true } : { status: true };

    try {
    
        const prods = await productModel.paginate(
            queryCondition,
            { limit: lim, page: pag, sort: { price: ord } }
        );
        
        if (prods) {
            return res.status(200).send(prods);
        }

        res.status(404).send({ error: "Productos no encontrados" });
    } catch (error) {
        res.status(500).send({ error: `Error en consultar productos ${error}` });
    }
};

//2)
const getProductById = async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findById(id)
        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        res.status(500).send({ error: `Error en consultar producto ${error}` })
    }
}

//3)
const createProduct = async (req, res) => {
    const { title, description, code, price, stock, category } = req.body

    try {
        const prod = await productModel.create({ title, description, code, price, stock, category })
        if (prod) {
            return res.status(201).send(prod)
        }
        res.status(400).send({ error: `Error en crear producto` })
    } catch (error) {
        if (error.code == 11000) { 
            return res.status(400).send({ error: "Producto ya creado con llave duplicada" })
        }
        res.status(500).send({ error: `Error en crear producto ${error}` })
    }
}

//4)
const updateProduct = async (req, res) => {
    const { id } = req.params
    const { title, description, code, price, stock, category } = req.body
    try {
        
        const prod = await productModel.findByIdAndUpdate(id, { title, description, code, price, stock, category }, { new: true })
        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        res.status(500).send({ error: `Error en actualizar producto ${error}` })
    }
}

//5)
const deleteProduct = async (req, res) => {
    const { id } = req.params

    try {
        const prod = await productModel.findByIdAndDelete(id)
        if (prod) {
            return res.status(200).send(prod)
        }
        res.status(404).send({ error: "Producto no encontrado" })
    } catch (error) {
        res.status(500).send({ error: `Error en eliminar producto ${error}` })
    }
}

//6)
const uploadProductImages = async (req, res) => {
    const productId = req.params.pid;
    const files = req.files;

    if (!files || files.length === 0) {
        return res.status(400).send('No se subieron archivos.');
    }

    try {
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).send('Producto no encontrado.');
        }

        const updatedThumbnails = files.map(file => ({
            name: file.originalname,
            reference: file.path
        }));

        
        if (!product.thumbnails) {
            product.thumbnails = [];
        }

        
        product.thumbnails.push(...updatedThumbnails);

        await product.save();
        res.status(200).send('Imágenes cargadas correctamente en los thumbnails');
    } catch (error) {
        console.error('Error al subir imágenes:', error);
        res.status(500).send('Error al subir imágenes');
    }
};


export const productController = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages
}