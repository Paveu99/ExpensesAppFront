import React, {useState} from 'react';
import '../components/styles/Charts.scss'
import {ChartsViewPast} from "./ChartsViewPast";
import {ChartsViewFuture} from "./ChartsViewFuture";
export const ChartsView = () => {

    const [timePeriod, setTimePeriod] = useState<string>("past");



    return <div className="charts-view">
            <header className="chart-header">
                <h1
                    className={timePeriod === "future" ? "chart-choices__past" : "chart-choices__past-chosen"}
                    onClick={
                    () => setTimePeriod("past")
                }
                >
                    Past
                </h1>
                <h1
                    className={timePeriod === "past" ? "chart-choices__future" : "chart-choices__future-chosen"}
                    onClick={
                    () => setTimePeriod("future")
                }
                >
                    Future
                </h1>
            </header>
        {timePeriod === "past" ? <ChartsViewPast/> : <ChartsViewFuture/>}
        </div>
}