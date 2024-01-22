import React from 'react';
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import { ExpenseEntity } from 'types';

interface ScatterPlotProps {
    data: ExpenseEntity[];
}

export const HeatMapChartPast: React.FC<ScatterPlotProps> = ({ data }) => {
    const categoryColors: Record<string, string> = {
        "Food": '#3333FF',
        "Service": '#3333CC',
        "Fuel": '#333399',
        "Self-improvement": '#3366CC',
        "Recreation": '#336699',
        "Going out": '#3399FF',
        "Clothes": '#3399CC',
        "Hobbies": '#66B2FF',
        "Transport": '#66B2CC',
        "Others": '#66CCFF'
    };

    const transformedData = data
        .map((expense) => ({
            ...expense,
            year: new Date(expense.month).getFullYear(),
        }))
        .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

    // Grupujemy dane według kategorii
    const groupedData = transformedData.reduce((acc: Record<string, ExpenseEntity[]>, expense) => {
        if (!acc[expense.category]) {
            acc[expense.category] = [];
        }
        acc[expense.category].push(expense);
        return acc;
    }, {});

    // Tworzymy tablicę serii Scatter dla różnych kategorii
    const scatterSeries = Object.keys(groupedData).map((category) => (
        <Scatter
            key={category}
            name={category}
            data={groupedData[category]}
            fill={categoryColors[category]}
        />
    ));

    return (
        <div style={{ height: 'calc(100vh - 250px)', marginBottom: "100px" }}>
            <h2>Money spent each year</h2>
            <ResponsiveContainer width="95%" height="100%" style={{ margin: "auto" }}>
                <ScatterChart
                    width={800}
                    height={400}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" type="category" name="Year" />
                    <YAxis dataKey="cost" type="number" name="Cost" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Legend />
                    {scatterSeries}
                </ScatterChart>
            </ResponsiveContainer>
            <br/>
        </div>
    );
};
