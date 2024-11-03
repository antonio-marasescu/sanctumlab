import express from 'express';
import { ProductsApiInstance } from '@sanctumlab/be/products-feature';
import { AuthenticatedRequest } from '../../types/request.types';

const productsRouter = express.Router();

productsRouter.post('', async (req: AuthenticatedRequest, res) => {
    try {
        const newProduct = await ProductsApiInstance.create(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json(error);
    }
});

productsRouter.get('', async (req: AuthenticatedRequest, res) => {
    try {
        const products = await ProductsApiInstance.retrieveAll();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json(error);
    }
});

productsRouter.get(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const product = await ProductsApiInstance.retrieveById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        res.status(400).json(error);
    }
});

productsRouter.put(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const updatedProduct = await ProductsApiInstance.update(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json(error);
    }
});

productsRouter.delete(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const isRemoved = await ProductsApiInstance.removeById(req.params.id);
        res.status(200).json({ ok: isRemoved });
    } catch (error) {
        res.status(400).json(error);
    }
});

export default productsRouter;
