import React, { createContext, useContext, useState, ReactNode } from 'react';
import {AddNewExpense} from 'types';
import {ExpenseEntity} from 'types'

interface Summary {
    sum: number,
    category: string,
    latest: string,
    month: string
}

interface ExpensesGroupedByDate {
    [year: string]: {
        [month: string]: ExpenseEntity[];
    };
}

interface RecordContextProps {
    allRecords: ExpenseEntity[];
    groupedByDate: ExpensesGroupedByDate;
    summary: Summary;
    fetchRecords: () => Promise<void>;
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordProviderProps {
    children: ReactNode;
}

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
    const [allRecords, setAllRecords] = useState<ExpenseEntity[]>([]);
    const [groupedByDate, setGroupedByDate] = useState<ExpensesGroupedByDate>({});
    const [summary, setSummary] = useState<Summary>({
        sum: 0,
        category: '',
        latest: '',
        month: '',
    });

    const fetchRecords = async () => {
        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch('http://localhost:3001/expenses');
            const data = await response.json();
            setAllRecords(data.allExpenses);
            setGroupedByDate(data.expensesGroupedByDate);
            setSummary(data.summary);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    console.log(groupedByDate)
    const contextValue: RecordContextProps = {
        allRecords,
        groupedByDate,
        summary,
        fetchRecords,
    };

    return (
        <RecordContext.Provider value={contextValue}>
            {children}
        </RecordContext.Provider>
    );
};

export const useRecordContext = (): RecordContextProps => {
    const context = useContext(RecordContext);
    if (!context) {
        throw new Error('useRecordContext must be used within a RecordProvider');
    }
    return context;
};
