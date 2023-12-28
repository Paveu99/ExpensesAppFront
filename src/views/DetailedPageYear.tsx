import React, {useEffect, useMemo} from "react";
import { useParams } from 'react-router-dom';
import {ExpenseEntity} from 'types'
import {useRecordContext} from "../components/context/RecordContext";

export const DetailedPageYear = () => {
    const { year } = useParams<{ year: string }>();

    const { groupedByDate, fetchRecords } = useRecordContext();

    useEffect(() => {
        fetchRecords();
    }, []);

    const memoizedData = useMemo(() => groupedByDate, [groupedByDate]);

    const months = memoizedData && memoizedData[`${year}`] ? Object.keys(memoizedData[`${year}`]) : [];

    return (
        <div>
            <h1>Details for the year {year}</h1>
            <div>
                {months.map((month, index) => (
                    <p key={index}>{month}</p>
                ))}
            </div>
        </div>
    );
}