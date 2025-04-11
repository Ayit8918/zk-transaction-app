// index.ts
import express from 'express';
import dotenv from 'dotenv';
import transactionsRoutes from './routes/transactions.routes';

dotenv.config();
const app = express();
const port = process.env.PORT || 6000;

app.use(express.json());
app.use('/transactions', transactionsRoutes);

app.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
});
