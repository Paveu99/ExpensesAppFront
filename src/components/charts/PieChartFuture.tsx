import React, {useMemo} from 'react';
import {PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip} from 'recharts';
import { ExpenseEntity } from 'types';

interface Props {
    allExpenses: ExpenseEntity[];
}

export const PieChartFuture: React.FC<Props> = ({ allExpenses }) => {

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
                <div className="custom-tooltip" style={{ backgroundColor: "#d5db34", padding: "10px", borderRadius: "10px", border: "3px white solid" }}>
                    <p>{`${payload[0].payload.category}:`}</p>
                    <p>{`${payload[0].value}$`}</p>
                </div>
            );
        }

        return null;
    };


    const COLORS = [
        "#FFFF00C4",
        "#FFEB3BC4",
        "#FDD835C4",
        "#FBC02DC4",
        "#F9A825C4",
        "#F57F17C4",
        "#FFD600C4",
        "#FFC107C4",
        "#FFB300C4",
        "#FFA000C4"
    ];

    return <div style={{ height: 'calc(100vh - 250px)' }}>
            <h2>Sum of each category</h2>
        <ResponsiveContainer width="95%" height="100%" style={{ margin: "auto" }}>
            <PieChart>
                <Pie data={data} dataKey="value" outerRadius={180} fill="#d5db34c4">
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