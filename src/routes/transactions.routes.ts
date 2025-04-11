// routes/transactions.routes.ts
import { Router } from 'express';
import {
    getCustomTransactions,
    getTransactionsToday,
    getTransactionsByDept,
    getTransactionsByDeptAndName,
    getPastTwoDaysTransactions,
} from '../controllers/transactions.controller';

const router = Router();

router.get('/', getPastTwoDaysTransactions);
router.get('/custom', getCustomTransactions);
router.get('/today', getTransactionsToday);
router.get('/department/:deptName', getTransactionsByDept);
router.get('/department/:deptName/name/:name', getTransactionsByDeptAndName);

export default router;
