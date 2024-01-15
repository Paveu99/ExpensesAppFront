import React, {useEffect} from 'react';
import {useRecordContext} from "../components/context/RecordContext";
import {ExpensePieChart} from "../components/charts/PieChart";
import {HistogramComponent} from "../components/charts/HistogramChart";
import '../components/styles/Charts.scss';
import {ExpenseChartPast} from "../components/charts/ExpenseChartPast";

export const ChartsViewPast = () => {

    const {allRecords, summary, groupedByDate, expensesGroupedByYear, fetchRecords } = useRecordContext();

    useEffect(() => {
        fetchRecords();
    }, []);

    return <div className="chart-view-past">
        <div style={{marginBottom: "100px"}}>
            <ExpenseChartPast expensesGroupedByYear={expensesGroupedByYear}/>
        </div>
        <div style={{marginBottom: "100px"}}>
            <ExpensePieChart allExpenses={allRecords}/>
        </div>
        <div style={{marginBottom: "100px"}}>
            <HistogramComponent data={allRecords}/>
        </div>
    </div>
}