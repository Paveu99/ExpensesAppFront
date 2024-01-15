import React, {useMemo} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts';

interface HistogramProps {
    data: { category: string; cost: number }[];
}

export const HistogramChartPast: React.FC<HistogramProps> = ({ data }) => {
    const bins = [
        { min: 0, max: 25 },
        { min: 25, max: 50 },
        { min: 50, max: 100 },
        { min: 150, max: 200 },
        { min: 250, max: Infinity },
    ];

    const memoizedData = useMemo(() => data, [data]);

    const groupedData = bins.map(bin => ({
        bin,
        'Number of expenses': memoizedData.filter(d => d.cost >= bin.min && d.cost < bin.max).length,
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip" style={{backgroundColor: "#3498db", padding: "10px", borderRadius: "10px", border: "3px white solid"}}>
                    <p>{`${payload[0].payload.bin.min}-${payload[0].payload.bin.max}$:`}</p>
                    <p>{`${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div style={{ height: 'calc(100vh - 250px)' }}>
            <h2>Expense count</h2>
            <ResponsiveContainer width="95%" height="100%" style={{margin: "auto"}}>
                <BarChart width={600} height={300} data={groupedData}>
                    <XAxis dataKey="bin" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Bar dataKey="Number of expenses" fill="#3498db" label={{ fill: 'white' }} />
                    <Tooltip content={CustomTooltip}/>
                    <Legend />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};