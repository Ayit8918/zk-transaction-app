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
router.get('/CustomDateTransactions', getCustomTransactions);
router.get('/TodayTransactions', getTransactionsToday);
router.get('/Department/:deptName', getTransactionsByDept);
router.get('/Department/:deptName/Name/:name', getTransactionsByDeptAndName);

export default router;
