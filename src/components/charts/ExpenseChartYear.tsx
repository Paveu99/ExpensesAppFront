import React, {useMemo} from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseEntity } from 'types';
import {useParams} from "react-router-dom";

interface Expense {
    id: string;
    category: string;
    name: string;
    cost: number;
    month: string;
    notes: string;
}

interface ExpensesGroupedByDate {
    [year: string]: {
        [month: string]: ExpenseEntity[];
    };
}

interface ExpenseChartProps {
    expensesGroupedByMonth: ExpensesGroupedByDate;
}

export const ExpenseChartYear: React.FC<ExpenseChartProps> = ({ expensesGroupedByMonth }) => {

    const { year } = useParams<{ year: string }>();

    const memoizedData = useMemo(() => expensesGroupedByMonth, [expensesGroupedByMonth]);

    const months = memoizedData && memoizedData[`${year}`] ? Object.keys(memoizedData[`${year}`]) : [];

    const data = months.map((month) => ({
        month,
        'Sum [$]': memoizedData[`${year}`][month].reduce((total, expense) => total + expense.cost, 0),
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{backgroundColor: "#3498db", padding: "10px", borderRadius: "10px", border: "3px white solid"}}>
                    <p>{`${payload[0].value}$`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ height: 'calc(100vh - 542px)' }}>
            <h2 style={{textAlign: "center"}}>Sum of expenses each year</h2>
            <ResponsiveContainer width="95%" height="100%" style={{margin: "auto"}}>
                <BarChart data={data}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Bar dataKey='Sum [$]' fill="#3498db" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};