import express from 'express';
import healthRoutes from './routes/health.routes.js';
import productsRoutes from './products/products.routes.js';

const app = express();

app.use( express.json() );

app.use( '/health', healthRoutes );
app.use( '/products', productsRoutes );

export default app;