import React, {useEffect} from 'react';
import {useRecordContext} from "../components/context/RecordContext";
import {LinearChartFuture} from "../components/charts/LinearChartFuture";
import {PieChartFuture} from "../components/charts/PieChartFuture";
import {HistogramChartFuture} from "../components/charts/HistogramChartFuture";

export const ChartsViewFuture = () => {
    const {allFutureRecords, groupedByYearFuture, fetchFutureRecords } = useRecordContext();

    useEffect(() => {
        fetchFutureRecords();
    }, []);

    return <>
        <div className="chart-view-past">
            <div style={{marginBottom: "100px"}}>
                <LinearChartFuture expensesGroupedByYear={groupedByYearFuture}/>
            </div>
            <div style={{marginBottom: "100px"}}>
                <PieChartFuture allExpenses={allFutureRecords}/>
            </div>
            <div style={{marginBottom: "100px"}}>
                <HistogramChartFuture data={allFutureRecords}/>
            </div>
        </div>
        {/*<div className="chart-view-past2">*/}
        {/*    <div style={{marginBottom: "100px"}}>*/}
        {/*        <HeatMapChartPast data={allRecords}/>*/}
        {/*    </div>*/}
        {/*</div>*/}
    </>
}