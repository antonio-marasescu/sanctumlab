import express from 'express';
import { ProductsApiInstance } from '@sanctumlab/be/products-feature';
import { AuthenticatedRequest } from '../../types/request.types';
import { handleException } from '@sanctumlab/be/shared';

const productsRouter = express.Router();

productsRouter.post('', async (req: AuthenticatedRequest, res) => {
    try {
        const newProduct = await ProductsApiInstance.create(
            req.body,
            req.userContext
        );
        res.status(201).json(newProduct);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

productsRouter.get('', async (req: AuthenticatedRequest, res) => {
    try {
        const products = await ProductsApiInstance.retrieveAll();
        res.status(200).json(products);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

productsRouter.get(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const product = await ProductsApiInstance.retrieveById(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

productsRouter.put(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const updatedProduct = await ProductsApiInstance.update(
            req.params.id,
            req.body,
            req.userContext
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

productsRouter.delete(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const isRemoved = await ProductsApiInstance.removeById(
            req.params.id,
            req.userContext
        );
        res.status(200).json({ ok: isRemoved });
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

export default productsRouter;
