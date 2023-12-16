import React, {useEffect} from 'react';
import {useRecordContext} from "../components/context/RecordContext";

export const DetailedPage = () => {
  const { records, fetchRecords } = useRecordContext();

  useEffect(() => {
    fetchRecords();
  }, []);

  console.log(records)

  return (
      <div className="records">
        <h2>Record List</h2>
        <ul>
          {records.map((record, index) => (
              <li key={index}>{record.name} {record.id}</li>
          ))}
        </ul>
      </div>
  );
}