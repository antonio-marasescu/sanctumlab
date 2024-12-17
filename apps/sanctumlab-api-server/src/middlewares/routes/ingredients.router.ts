import express from 'express';
import { AuthenticatedRequest } from '../../types/request.types';
import { handleException } from '@sanctumlab/be/shared';
import { IngredientsApiInstance } from '@sanctumlab/be/recipe-api-feature';

const ingredientsRouter = express.Router();

ingredientsRouter.post('', async (req: AuthenticatedRequest, res) => {
    try {
        const newIngredient = await IngredientsApiInstance.create(
            req.body,
            req.userContext
        );
        res.status(201).json(newIngredient);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

ingredientsRouter.get('', async (req: AuthenticatedRequest, res) => {
    try {
        const ingredients = await IngredientsApiInstance.retrieveAll(
            req.userContext
        );
        res.status(200).json(ingredients);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

ingredientsRouter.get(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const ingredient = await IngredientsApiInstance.retrieveById(
            req.params.id,
            req.userContext
        );
        res.status(200).json(ingredient);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

ingredientsRouter.put(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const updatedIngredient = await IngredientsApiInstance.update(
            req.params.id,
            req.body,
            req.userContext
        );
        res.status(200).json(updatedIngredient);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

ingredientsRouter.delete(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const isRemoved = await IngredientsApiInstance.removeById(
            req.params.id,
            req.userContext
        );
        res.status(200).json({ ok: isRemoved });
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

export default ingredientsRouter;
