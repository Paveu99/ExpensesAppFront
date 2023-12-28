import React, {useEffect, useMemo} from "react";
import {NavLink, useParams} from 'react-router-dom';
import {useRecordContext} from "../components/context/RecordContext";
import el1 from "../components/styles/images/Back-arrow.png";
import '../components/styles/DetailedYear.scss'

export const DetailedPageYear = () => {
    const { year } = useParams<{ year: string }>();

    const { summaryYear, groupedByDate, fetchRecords, fetchYearSummary } = useRecordContext();

    useEffect(() => {
        fetchRecords();
        fetchYearSummary(year);
    }, []);

    const memoizedData = useMemo(() => groupedByDate, [groupedByDate]);
    const memoizedYearData = useMemo(() => summaryYear, [summaryYear]);

    const months = memoizedData && memoizedData[`${year}`] ? Object.keys(memoizedData[`${year}`]) : [];


    return (
        <div className="detailed-year">
            <header className="year-header">
                <NavLink className="back-link" to='/details/'>
                    <img className="back-icon" src={el1} alt=""/>
                </NavLink>
                <h1>Details for the year {year}</h1>
            </header>
            <div className="year-content">
                {months.map((month, index) => (
                    <p className="month" key={index}>{month}</p>
                ))}
            </div>
            <div className="overall-stats">
                <div className="stat">
                    <h2 className="stat__title">
                        Yearly sum of money spent:
                    </h2>
                    <hr/>
                    <div className="stat__value">
                        {memoizedYearData.sum}$
                    </div>
                </div>
                <div className="stat">
                    <h2 className="stat__title">
                        Month statistics:
                    </h2>
                    <hr/>
                    <div className="stat2">
                        <p>Month in which most money was spent:</p>
                        <div className="stat__value2">
                            {memoizedYearData.monthMost}
                        </div>
                    </div>
                    <div className="stat2">
                        <p>Month in which the least amount of money was spent:</p>
                        <div className="stat__value2">
                            {memoizedYearData.monthLeast}
                        </div>
                    </div>
                </div>
                <div className="stat">
                    <h2 className="stat__title">
                        Category statistics:
                    </h2>
                    <hr/>
                    <div className="stat2">
                        <p>Category on which you spend the most money on:</p>
                        <div className="stat__value2">
                            {memoizedYearData.categoryMost}
                        </div>
                    </div>
                    <div className="stat2">
                        <p>Category on which you spend the least money on:</p>
                        <div className="stat__value2">
                            {memoizedYearData.categoryLeast}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}