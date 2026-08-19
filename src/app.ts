import express from 'express';
import healthRoutes from './routes/health.routes.js';
import productsRoutes from './products/products.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';

const app = express();

app.use( express.json() );

app.use( '/health', healthRoutes );
app.use( '/products', productsRoutes );

// Global error handler
app.use( errorHandler );

export default app;