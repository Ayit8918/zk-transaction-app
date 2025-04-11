// controllers/transactions.controller.ts
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import { getTransactionsInRange, getTransactionsByDepartment, getTransactionsByDepartmentAndName } from '../services/transactions.service';
import { fetchTransactions } from '../utils/fetchTransactions';


// GET /Transactions/CustomDateTransactions?start&end
export const getCustomTransactions = async (req: Request, res: Response) => {
    const { start, end } = req.query;

    const startDate = dayjs(String(start)).startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const endDate = dayjs(String(end)).endOf('day').format('YYYY-MM-DD HH:mm:ss');

    try {
        const data = await getTransactionsInRange(startDate, endDate);
        res.json({ startTime: startDate, endTime: endDate, total: data.length, data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};


// GET /Transactions/TodayTransactions
export const getTransactionsToday = async (_req: Request, res: Response) => {
    const start = dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().format('YYYY-MM-DD HH:mm:ss');

    try {
        const data = await getTransactionsInRange(start, end);
        res.json({ startTime: start, endTime: end, total: data.length, data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};


// GET /Transactions/Department/ :deptName
export const getTransactionsByDept = async (req: Request, res: Response) => {
    const { deptName } = req.params;
    const start = dayjs().subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');

    try {
        const data = await getTransactionsByDepartment(deptName, start, end);
        res.json({ startTime: start, endTime: end, total: data.length, data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions by department' });
    }
};

// GET /Transactions/Department/ :deptName /Name / :name
export const getTransactionsByDeptAndName = async (req: Request, res: Response) => {
    const { deptName, name } = req.params;
    const start = dayjs().subtract(2, 'day').startOf('day').format('YYYY-MM-DD HH:mm:ss');
    const end = dayjs().subtract(1, 'day').endOf('day').format('YYYY-MM-DD HH:mm:ss');

    try {
        const data = await getTransactionsByDepartmentAndName(deptName, name, start, end);
        res.json({ startTime: start, endTime: end, total: data.length, data });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch transactions by department and name' });
    }
};

// GET /Transactions past two days data business logic
export const getPastTwoDaysTransactions = async (_req: Request, res: Response) => {
    const startDate = dayjs().subtract(2, 'day').startOf('day'); // 00:00:00 two days ago
    const endDate = dayjs().subtract(1, 'day').endOf('day');     // 23:59:59 yesterday

    try {
        const data = await fetchTransactions(
            startDate.format('YYYY-MM-DD HH:mm:ss'),
            endDate.format('YYYY-MM-DD HH:mm:ss')
        );

        res.json({
            startTime: startDate.format('YYYY-MM-DD HH:mm:ss'),
            endTime: endDate.format('YYYY-MM-DD HH:mm:ss'),
            total: data.length,
            data,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};

export const getWorkStaff = async (_req: Request, res: Response) => {
  
    try {
        console.log ("hello") 
        res.json({
            message: "hello world"
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
};
