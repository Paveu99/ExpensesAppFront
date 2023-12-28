import React, {useEffect} from 'react';
import {useRecordContext} from "../components/context/RecordContext";
import '../components/styles/Detailed.scss';
import {NavLink} from "react-router-dom";

export const DetailedPage = () => {
  const { summary, groupedByDate, fetchRecords } = useRecordContext();

  useEffect(() => {
    fetchRecords();
  }, []);
    console.log(groupedByDate)

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
                        {summary.sum}$
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
                            {summary.monthMost}
                        </div>
                    </div>
                    <div className="stat2">
                        <p>Month in which the least amount of money was spent:</p>
                        <div className="stat__value2">
                            {summary.monthLeast}
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
                            {summary.categoryMost}
                        </div>
                    </div>
                    <div className="stat2">
                        <p>Category on which you spend the least money on:</p>
                        <div className="stat__value2">
                            {summary.categoryLeast}
                        </div>
                    </div>
                </div>
            </div>
        </div>
  );
}