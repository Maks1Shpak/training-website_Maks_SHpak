import express from 'express';
import whaleRoutes from './routes/whaleRoutes';

const app = express();

// Middleware
app.use(express.json());

// Додаємо middleware для додавання посилання на сторінку реабілітації у хедер кожної відповіді
app.use((_req, res, next) => {
    res.setHeader('X-Rehabilitation-Page', '/rehabilitation');
    next();
});

// Routes
app.use('/api/whales', whaleRoutes);

export default app;
