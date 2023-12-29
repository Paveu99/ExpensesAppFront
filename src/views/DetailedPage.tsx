import React, {useEffect, useMemo, useState} from 'react';
import {useRecordContext} from "../components/context/RecordContext";
import '../components/styles/Detailed.scss';
import {NavLink} from "react-router-dom";

export const DetailedPage = () => {
    const { summary, groupedByDate, fetchRecords } = useRecordContext();

    useEffect(() => {
    fetchRecords();
    }, []);

    const memoizedSummary = useMemo(() => summary, [summary]);


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
        <div className="detailed">
            <h1 className="title">Choose a year</h1>
            <div className="years-to-choose">
                {Object.keys(groupedByDate).map((year, index) => (
                    <NavLink className="years-to-choose__link" to={`/details/${year}`}>
                        <p className="text">{year}</p>
                    </NavLink>
                ))}
            </div>
            <div className="overall-stats">
                <div className="stat">
                    <h2 className="stat__title">
                        All time sum of money spent:
                    </h2>
                    <hr/>
                    <div className="stat__value">
                        {memoizedSummary.sum}$
                    </div>
                </div>
                <div className="stat">
                    <h2 className="stat__title">
                        Month statistics:
                    </h2>
                    <hr/>
                    <div className="stat2">
                        <p>Month in which most money was spent:</p>
                        <div className="stat__handler">
                            <div
                                className={isHovered1 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter1}
                                onMouseLeave={handleMouseLeave1}
                            >
                                {isHovered1 ? `${memoizedSummary.maxAmountMonth}$` : memoizedSummary.monthMost}
                            </div>
                        </div>
                    </div>
                    <div className="stat2">
                        <p>Month in which the least amount of money was spent:</p>
                        <div className="stat__handler">
                            <div
                                className={isHovered2 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2}
                            >
                                {isHovered2 ? `${memoizedSummary.minAmountMonth}$` : memoizedSummary.monthLeast}
                            </div>
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
                        <div className="stat__handler">
                            <div
                                className={isHovered3 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter3}
                                onMouseLeave={handleMouseLeave3}
                            >
                                {isHovered3 ? `${memoizedSummary.maxAmountCat}$` : memoizedSummary.categoryMost}
                            </div>
                        </div>
                    </div>
                    <div className="stat2">
                        <p>Category on which you spend the least money on:</p>
                        <div className="stat__handler">
                            <div
                                className={isHovered4 ? "stat__value2-hovered" : "stat__value2"}
                                onMouseEnter={handleMouseEnter4}
                                onMouseLeave={handleMouseLeave4}
                            >
                                {isHovered4 ? `${memoizedSummary.minAmountCat}$` : memoizedSummary.categoryLeast}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}