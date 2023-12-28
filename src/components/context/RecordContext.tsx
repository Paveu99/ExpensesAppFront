import React, { createContext, useContext, useState, ReactNode } from 'react';
import {AddNewExpense} from 'types';
import {ExpenseEntity} from 'types'

interface SummaryMonth {
    sum: number,
    categoryMost: string,
    categoryLeast: string,
    latest: string,
}

interface Summary extends SummaryMonth {
    monthMost: string,
    monthLeast: string,
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
    summaryYear: Summary;
    summaryMonth: SummaryMonth;
    fetchRecords: () => Promise<void>;
    fetchYearSummary: (year: string | undefined) => Promise<void>;
    fetchMonthSummary: (year: string | undefined, month: string | undefined) => Promise<void>;
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
        categoryMost: '',
        categoryLeast: '',
        latest: '',
        monthMost: '',
        monthLeast: '',
    });
    const [summaryYear, setSummaryYear] = useState<Summary>({
        sum: 0,
        categoryMost: '',
        categoryLeast: '',
        latest: '',
        monthMost: '',
        monthLeast: '',
    });
    const [summaryMonth, setSummaryMonth] = useState<SummaryMonth>({
        sum: 0,
        categoryMost: '',
        categoryLeast: '',
        latest: '',
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
    const fetchYearSummary = async (year: string | undefined) => {
        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch(`http://localhost:3001/expenses/${year}`);
            const data = await response.json();
            setSummaryYear(data.summaryYear);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    const fetchMonthSummary = async (year: string | undefined, month: string | undefined) => {
        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch(`http://localhost:3001/expenses/${year}/${month}`);
            const data = await response.json();
            setSummaryMonth(data.summaryMonth);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    console.log(groupedByDate)
    const contextValue: RecordContextProps = {
        allRecords,
        groupedByDate,
        summary,
        summaryYear,
        summaryMonth,
        fetchRecords,
        fetchYearSummary,
        fetchMonthSummary,
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
