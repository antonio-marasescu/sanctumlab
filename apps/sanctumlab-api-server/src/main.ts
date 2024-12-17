import express from 'express';
import * as path from 'path';
import productsRouter from './middlewares/routes/products.router';
import { configDotenv } from 'dotenv';
import cors from 'cors';
import authGuard from './guards/auth.guard';
import recipesRouter from './middlewares/routes/recipes.router';
import ingredientsRouter from './middlewares/routes/ingredients.router';

configDotenv();
const app = express();
app.disable('x-powered-by');
const baseRoute = '/api';

app.use(
    cors({
        origin: '*'
    })
);
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(`${baseRoute}/products`, authGuard, productsRouter);
app.use(`${baseRoute}/ingredients`, authGuard, ingredientsRouter);
app.use(`${baseRoute}/recipes`, authGuard, recipesRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
