import React, {useEffect, useMemo, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import el1 from "../components/styles/images/Back-arrow.png";
import "../components/styles/DetailedMonth.scss"
import {useRecordContext} from "../components/context/RecordContext";

export const DetailedPageMonth = () => {
    const { year , month} = useParams<{ year: string, month: string }>();

    const { summaryMonth, groupedByDate, fetchRecords, fetchMonthSummary } = useRecordContext();

    useEffect(() => {
        fetchRecords();
        fetchMonthSummary(year, month);
    }, []);

    const memoizedData = useMemo(() => groupedByDate, [groupedByDate]);
    const memoizedMonthData = useMemo(() => summaryMonth, [summaryMonth]);

    const singleMonth = memoizedData && memoizedData[`${year}`] && memoizedData[`${year}`][`${month}`] ? memoizedData[`${year}`][`${month}`] : [];

    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);
    const [isHovered3, setIsHovered3] = useState(false);

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

    return (
        <div className="detailed-month">
            <header className="month-header">
                <NavLink className="back-link" to={`/details/${year}`}>
                    <img className="back-icon" src={el1} alt=""/>
                </NavLink>
                <h1>Details for the month <span style={{color: "#3498db"}}>{month} {year}</span></h1>
            </header>
            <div className="overall-month-stats">
                <div className="month-stat">
                    <div className="month-stat__title">
                        Sum of money spent:
                    </div>
                    <hr/>
                    <div className="month-stat__value">
                        {memoizedMonthData.sum}$
                    </div>
                </div>
                <div className="month-stat">
                    <div className="month-stat__title">
                        Category statistics:
                    </div>
                    <hr/>
                    <div className="month-stat2">
                        <div className="cat">Category on which you spend the most money on:</div>
                        <div className="month-stat__handler">
                            <div
                                className={isHovered1 ? "month-stat__value2-hovered" : "month-stat__value2"}
                                onMouseEnter={handleMouseEnter1}
                                onMouseLeave={handleMouseLeave1}
                            >
                                {isHovered1 ? `${memoizedMonthData.maxAmountCat}$` : memoizedMonthData.categoryMost}
                            </div>
                        </div>
                    </div>
                    <div className="month-stat2">
                        <div className="cat">Category on which you spend the least money on:</div>
                        <div className="month-stat__handler">
                            <div
                                className={isHovered2 ? "month-stat__value2-hovered" : "month-stat__value2"}
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2}
                            >
                                {isHovered2 ? `${memoizedMonthData.minAmountCat}$` : memoizedMonthData.categoryLeast}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="month-stat">
                    <div className="month-stat__title">
                        The biggest expense of this month:
                    </div>
                    <hr/>
                    <div
                        className={isHovered3 ? "month-stat__value-hovered" : "month-stat__value"}
                        onMouseEnter={handleMouseEnter3}
                        onMouseLeave={handleMouseLeave3}
                    >
                        {isHovered3 ? `${memoizedMonthData.cost}$` : memoizedMonthData.latest}
                    </div>
                </div>
            </div>
            <div className="month-content">
                {singleMonth.map((expense, index) =>(
                    <div className="single-expense" key={index}>
                        <div className="left">
                            <div>
                                {expense.name}
                            </div>
                            <div style={{color: "rgba(194,206,217,0.42", fontSize: "12px"}}>
                                {expense.month}
                            </div>
                        </div>
                        <div className="right" style={{color: "#3498db"}}>
                            {expense.cost}$
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}