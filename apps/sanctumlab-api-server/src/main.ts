import express from 'express';
import * as path from 'path';
import productsRouter from './middlewares/routes/products.router';
import { configDotenv } from 'dotenv';
import cors from 'cors';

configDotenv();
const app = express();
const baseRoute = '/api';

app.use(
    cors({
        origin: '*'
    })
);
app.use(express.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(`${baseRoute}/products`, productsRouter);

const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
