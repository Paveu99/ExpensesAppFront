import React, {useEffect} from 'react';
import {useRecordContext} from "../components/context/RecordContext";
import {PieChartPast} from "../components/charts/PieChartPast";
import {HistogramChartPast} from "../components/charts/HistogramChartPast";
import '../components/styles/Charts.scss';
import {LinearChartPast} from "../components/charts/LinearChartPast";

export const ChartsViewPast = () => {

    const {allRecords, summary, groupedByDate, expensesGroupedByYear, fetchRecords } = useRecordContext();

    useEffect(() => {
        fetchRecords();
    }, []);

    return <>
        <div className="chart-view-past">
            <div style={{marginBottom: "100px"}}>
                <LinearChartPast expensesGroupedByYear={expensesGroupedByYear}/>
            </div>
            <div style={{marginBottom: "100px"}}>
                <PieChartPast allExpenses={allRecords}/>
            </div>
            <div style={{marginBottom: "100px"}}>
                <HistogramChartPast data={allRecords}/>
            </div>
        </div>
    </>
}