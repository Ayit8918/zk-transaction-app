import axios from 'axios';
import dotenv from 'dotenv';
import https from 'https';
import dayjs from 'dayjs';

dotenv.config();

const SERVER_IP = process.env.ZKBIO_BASE_URL;
const SERVER_PORT = process.env.ZKBIO_SERVER_PORT;
const ACCESS_TOKEN = process.env.ZKBIO_ACCESS_TOKEN;

const BASE_URL = `${SERVER_IP}:${SERVER_PORT}/api`;

export async function fetchTransactions(startDate: string, endDate: string) {
    const pageSize = 1000;
    let pageNo = 1;
    let allTransactions: any[] = [];

    try {
        console.log(`🔍 Fetching transactions from ${startDate} to ${endDate}...`);

        while (true) {
            const url = `${BASE_URL}/transaction/list?pageNo=${pageNo}&pageSize=${pageSize}&access_token=${ACCESS_TOKEN}&startDate=${startDate}&endDate=${endDate}`;
            const response = await axios.get(url, {
                headers: { 'Content-Type': 'application/json' },
                httpsAgent: new https.Agent({ rejectUnauthorized: false }),
            });

            const transactions = response.data?.data || [];
            const timestamp = dayjs().format('HH:mm:ss');

            if (transactions.length > 0) {
                console.log(`✅ [${timestamp}] Page ${pageNo} - Fetched ${transactions.length} transactions`);
            } else {
                console.log(`🛑 [${timestamp}] No more transactions on page ${pageNo}.`);
                break;
            }

            allTransactions.push(...transactions);
            pageNo++;
        }

        console.log(`🎉 Successfully fetched ${allTransactions.length} total transactions! 🚀`);

        return allTransactions;
    } catch (error: any) {
        console.error('❌ Error in fetchTransactions:', error.response?.data || error.message);
        throw new Error('Failed to fetch transactions');
    }
}
// This function does not handle HTTP requests directly.
// It doesn’t contain routing logic or express-specific code.
// It’s purely reusable business-agnostic logic that fetches data from the ZKBio API and logs progress.