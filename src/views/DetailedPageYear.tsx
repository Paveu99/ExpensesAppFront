import React, {useEffect, useMemo, useState} from "react";
import {NavLink, useParams} from 'react-router-dom';
import {useRecordContext} from "../components/context/RecordContext";
import el1 from "../components/styles/images/Back-arrow.png";
import '../components/styles/DetailedYear.scss'
import {SearchComponent} from "../components/search/SearchComponent";
import {DownloadButton} from "../components/download/DownloadButton";
import { ExpenseEntity } from "types";
import el2 from "../components/styles/images/Calendar.png";
import el3 from "../components/styles/images/Sum.png";
import el4 from "../components/styles/images/Category.png";
import {ExpenseChartYear} from "../components/charts/ExpenseChartYear";

export const DetailedPageYear = () => {
    const { year } = useParams<{ year: string }>();

    const { summaryYear, groupedByDate, fetchRecords, fetchYearSummary } = useRecordContext();

    useEffect(() => {
        fetchRecords();
        fetchYearSummary(year);
    }, []);

    const memoizedData = useMemo(() => groupedByDate, [groupedByDate]);
    const memoizedYearData = useMemo(() => summaryYear, [summaryYear]);

    const allElements: ExpenseEntity[] = memoizedData && memoizedData[`${year}`] ? Object.values(memoizedData[`${year}`]).flatMap(month => month) : [];

    const months = memoizedData && memoizedData[`${year}`] ? Object.keys(memoizedData[`${year}`]) : [];

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);
    const [isHovered4, setIsHovered4] = useState(false);

    const handleMouseEnter1 = () => {
        setIsHovered1(true);
    };

    const handleMouseLeave1 = () => {
        setIsHovered1(false);
    };
    const handleMouseEnter2 = () => {
        setIsHovered2(true);
    };

    const handleMouseLeave2 = () => {
        setIsHovered2(false);
    };
    const handleMouseEnter3 = () => {
        setIsHovered3(true);
    };

    const handleMouseLeave3 = () => {
        setIsHovered3(false);
    };
    const handleMouseEnter4 = () => {
        setIsHovered4(true);
    };

    const handleMouseLeave4 = () => {
        setIsHovered4(false);
    };


    return (
        <div className="detailed-year">
            <div className="your-button-in-top-right">
                <DownloadButton color="blue" name={year as string} trades={allElements}/>
            </div>
            <header className="year-header">
                <NavLink className="back-link" to='/details/past/'>
                    <img className="back-icon" src={el1} alt=""/>
                </NavLink>
                <h1>Details for the year <span style={{color: "#3498db"}}>{year}</span></h1>
            </header>
            <div className="year-content">
                {months.map((month, index) => (
                    <NavLink className="month" to={`/details/past/${year}/${month}`}>
                        <p key={index}>{month}</p>
                    </NavLink>
                ))}
            </div>
            <div className="overall-stats">
                <div className="stat">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src={el3} alt="" style={{height: "35px", marginRight: "5px"}}/>
                        <h2 className="stat__title">
                            Annual expenses:
                        </h2>
                    </div>
                    <hr/>
                    <div className="stat__handler">
                        <div className="stat__value">
                            {memoizedYearData.sum}$
                        </div>
                    </div>
                </div>
                <div className="stat">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src={el2} alt="" style={{height: "35px", marginRight: "5px"}}/>
                        <h2 className="stat__title">
                            Month statistics:
                        </h2>
                    </div>
                    <hr/>
                    <div className="stat2">
                        <div className="in">Month in which most money was spent:</div>
                        <div className="stat__handler">
                            <div
                                className={isHovered1 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter1}
                                onMouseLeave={handleMouseLeave1}
                            >
                                {isHovered1 ? `${memoizedYearData.maxAmountMonth}$` : memoizedYearData.monthMost}
                            </div>
                        </div>
                    </div>
                    <div className="stat2">
                        <div className="in">Month in which the least amount of money was spent:</div>
                        <div className="stat__handler">
                            <div
                                className={isHovered2 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2}
                            >
                                {isHovered2 ? `${memoizedYearData.minAmountMonth}$` : memoizedYearData.monthLeast}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="stat">
                    <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <img src={el4} alt="" style={{height: "35px", marginRight: "5px"}}/>
                        <h2 className="stat__title">
                            Category statistics:
                        </h2>
                    </div>
                    <hr/>
                    <div className="stat2">
                        <div className="in">Category on which you spend the most money on:</div>
                        <div className="stat__handler">
                            <div
                                className={isHovered3 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter3}
                                onMouseLeave={handleMouseLeave3}
                            >
                                {isHovered3 ? `${memoizedYearData.maxAmountCat}$` : memoizedYearData.categoryMost}
                            </div>
                        </div>
                    </div>
                    <div className="stat2">
                        <div className="in">Category on which you spend the least money on:</div>
                        <div className="stat__handler">
                            <div
                                className={isHovered4 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter4}
                                onMouseLeave={handleMouseLeave4}
                            >
                                {isHovered4 ? `${memoizedYearData.minAmountCat}$` : memoizedYearData.categoryLeast}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ExpenseChartYear expensesGroupedByMonth={groupedByDate}></ExpenseChartYear>
        </div>
    );
}