import React, {useEffect} from 'react';
import {useRecordContext} from "../components/context/RecordContext";
import '../components/styles/Detailed.scss';
import el1 from "../components/styles/images/Home.png";
import {NavLink} from "react-router-dom";

export const DetailedPage = () => {
  const { groupedByDate, fetchRecords } = useRecordContext();

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
        <div className="detailed">
            <h1>Choose a year</h1>
            <div className="years-to-choose">
                {Object.keys(groupedByDate).map((year, index) => (
                    <NavLink className="year-link" to={`/details/${year}`}>
                        <p className="text">{year}</p>
                    </NavLink>
                ))}
            </div>
            <div className="overall-stats">
                Okej tu będą jakieś ogólne statystyki
            </div>
        </div>
  );
}