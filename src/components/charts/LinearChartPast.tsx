import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ExpenseEntity } from 'types';

interface GroupedExpenses {
    [year: string]: ExpenseEntity[];
}

interface ExpenseChartProps {
    expensesGroupedByYear: GroupedExpenses;
}

export const LinearChartPast: React.FC<ExpenseChartProps> = ({ expensesGroupedByYear }) => {

    const memoizedData = useMemo(() => expensesGroupedByYear, [expensesGroupedByYear]);

    const years = Object.keys(memoizedData);

    const data = years.map((year) => ({
        year,
        'Sum [$]': memoizedData[year].reduce((total, expense) => total + expense.cost, 0),
    }));

    console.log(data)

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#3498db", padding: "10px", borderRadius: "10px", border: "3px white solid" }}>
                    <p>{`${payload[0].value}$`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ height: 'calc(100vh - 250px)' }}>
            <h2>Money spent each year</h2>
            <ResponsiveContainer width="95%" height="100%" style={{ margin: "auto" }}>
                <LineChart data={data}>
                    <XAxis dataKey="year"/>
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey='Sum [$]' stroke="#3498db" label={{ fill: 'white', position: 'top' }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};
