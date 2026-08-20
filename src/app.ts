import express from 'express';
import healthRoutes from './routes/health.routes.js';
import productsRoutes from './products/products.routes.js';
import { errorHandler } from './middlewares/error.middleware.js';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

// Security Headers (Applies to ALL outgoing responses)
app.use( helmet() );

// Rate Limiting (Protects server before resource-intensive body parsing)
const rateLimiter = rateLimit({
    windowMs: 900000, // 15 minutes
    limit: 100, // requests per window per IP
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: {
            code: "TOO_MANY_REQUESTS",
            message: "Too many requests from this IP, please try again after 15 minutes."
        }
    }
});
app.use( rateLimiter );

app.use( express.json() );

app.use( '/health', healthRoutes );
app.use( '/products', productsRoutes );

// Global error handler
app.use( errorHandler );

export default app;