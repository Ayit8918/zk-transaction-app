// services/transactions.service.ts
import { fetchTransactions } from '../utils/fetchTransactions';

export async function getTransactionsInRange(start: string, end: string) {
    return await fetchTransactions(start, end);
}

export async function getTransactionsByDepartment(deptName: string, start: string, end: string) {
    const all = await fetchTransactions(start, end);
    return all.filter(tx => tx.deptName === deptName);
}

export async function getTransactionsByDepartmentAndName(deptName: string, name: string, start: string, end: string) {
    const all = await fetchTransactions(start, end);
    return all.filter(tx => tx.deptName === deptName && tx.name === name);
}
