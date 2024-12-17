import express from 'express';
import { AuthenticatedRequest } from '../../types/request.types';
import { handleException } from '@sanctumlab/be/shared';
import { RecipesApiInstance } from '@sanctumlab/be/recipe-api-feature';

const recipesRouter = express.Router();

recipesRouter.post('', async (req: AuthenticatedRequest, res) => {
    try {
        const newRecipe = await RecipesApiInstance.create(
            req.body,
            req.userContext
        );
        res.status(201).json(newRecipe);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

recipesRouter.get('', async (req: AuthenticatedRequest, res) => {
    try {
        const recipes = await RecipesApiInstance.retrieveAll(req.userContext);
        res.status(200).json(recipes);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

recipesRouter.get(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const recipe = await RecipesApiInstance.retrieveById(
            req.params.id,
            req.userContext
        );
        res.status(200).json(recipe);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

recipesRouter.put(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const updatedRecipe = await RecipesApiInstance.update(
            req.params.id,
            req.body,
            req.userContext
        );
        res.status(200).json(updatedRecipe);
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

recipesRouter.delete(`/:id`, async (req: AuthenticatedRequest, res) => {
    try {
        const isRemoved = await RecipesApiInstance.removeById(
            req.params.id,
            req.userContext
        );
        res.status(200).json({ ok: isRemoved });
    } catch (error) {
        const exception = handleException(error);
        res.status(exception.statusCode).json(exception);
    }
});

export default recipesRouter;
