import React, {useMemo} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from 'recharts';
import { ExpenseEntity } from 'types';

interface Props {
    allExpenses: ExpenseEntity[];
}

export const PieChartPast: React.FC<Props> = ({ allExpenses }) => {

    const memoizedData = useMemo(() => allExpenses, [allExpenses]);

    const data = memoizedData.reduce((acc, expense) => {
        const existingCategory = acc.find((entry) => entry.category === expense.category);

        if (existingCategory) {
            existingCategory.value += expense.cost;
        } else {
            acc.push({ category: expense.category, value: expense.cost });
        }

        return acc;
    }, [] as { category: string; value: number }[]);

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{ backgroundColor: "#3498db", padding: "10px", borderRadius: "10px", border: "3px white solid" }}>
                    <p>{`${payload[0].payload.category}:`}</p>
                    <p>{`${payload[0].value}$`}</p>
                </div>
            );
        }

        return null;
    };


    const COLORS = [
        '#3333FFC4',
        '#3333CCC4',
        '#333399C4',
        '#3366CCC4',
        '#336699C4',
        '#3399FFC4',
        '#3399CCC4',
        '#66B2FFC4',
        '#66B2CCC4',
        '#66CCFFC4'
    ];

    return <div style={{ height: 'calc(100vh - 250px)' }}>
            <h2>Sum of each category</h2>
        <ResponsiveContainer width="95%" height="100%" style={{ margin: "auto" }}>
            <PieChart>
                <Pie data={data} dataKey="value" outerRadius={180} fill="#8884d8">
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />}/>
                <Legend
                    payload={data.map((entry, index) => ({
                        value: entry.category,
                        type: 'circle',
                        id: entry.category,
                        color: COLORS[index % COLORS.length],
                    }))}
                />
            </PieChart>
        </ResponsiveContainer>

    </div>
};