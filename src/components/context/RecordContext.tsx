import React, { createContext, useContext, useState, ReactNode } from 'react';
import {ExpenseEntity} from 'types'

interface SummaryMonth {
    sum: number,
    categoryMost: string,
    categoryLeast: string,
    latest: string,
    cost: number,
    maxAmountCat: number,
    minAmountCat: number,
}

interface Summary extends SummaryMonth{
    monthMost: string,
    monthLeast: string,
    maxAmountMonth: number,
    minAmountMonth: number,
}

interface ExpensesGroupedByDate {
    [year: string]: {
        [month: string]: ExpenseEntity[];
    };
}

interface GroupedExpenses {
    [year: string]: ExpenseEntity[];
}

interface RecordContextProps {
    allRecords: ExpenseEntity[];
    groupedByDate: ExpensesGroupedByDate;
    expensesGroupedByYear: GroupedExpenses;
    summary: Summary;
    summaryYear: Summary;
    summaryMonth: SummaryMonth;
    fetchRecords: () => Promise<void>;
    fetchYearSummary: (year: string | undefined) => Promise<void>;
    fetchMonthSummary: (year: string | undefined, month: string | undefined) => Promise<void>;
    allFutureRecords: ExpenseEntity[];
    groupedByDateFuture: ExpensesGroupedByDate;
    groupedByYearFuture: GroupedExpenses,
    summaryFuture: Summary;
    fetchFutureRecords: () => Promise<void>;
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordProviderProps {
    children: ReactNode;
}

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
    const [allRecords, setAllRecords] = useState<ExpenseEntity[]>([]);
    const [groupedByDate, setGroupedByDate] = useState<ExpensesGroupedByDate>({});
    const [expensesGroupedByYear, setExpensesGroupedByYear] = useState<GroupedExpenses>({});
    const [summary, setSummary] = useState<Summary>({
        sum: 0,
        categoryMost: '',
        categoryLeast: '',
        latest: '',
        cost: 0,
        monthMost: '',
        monthLeast: '',
        maxAmountMonth: 0,
        minAmountMonth: 0,
        maxAmountCat: 0,
        minAmountCat: 0,
    });
    const [summaryYear, setSummaryYear] = useState<Summary>({
        sum: 0,
        categoryMost: '',
        categoryLeast: '',
        latest: '',
        cost: 0,
        monthMost: '',
        monthLeast: '',
        maxAmountMonth: 0,
        minAmountMonth: 0,
        maxAmountCat: 0,
        minAmountCat: 0,
    });
    const [summaryMonth, setSummaryMonth] = useState<SummaryMonth>({
        sum: 0,
        categoryMost: '',
        categoryLeast: '',
        latest: '',
        cost: 0,
        maxAmountCat: 0,
        minAmountCat: 0,
    });
    const [allFutureRecords, setAllFutureRecords] = useState<ExpenseEntity[]>([]);
    const [groupedByDateFuture, setGroupedByDateFuture] = useState<ExpensesGroupedByDate>({});
    const [groupedByYearFuture, setGroupedByYearFuture] = useState<GroupedExpenses>({});
    const [summaryFuture, setSummaryFuture] = useState<Summary>({
        sum: 0,
        categoryMost: '',
        categoryLeast: '',
        latest: '',
        cost: 0,
        monthMost: '',
        monthLeast: '',
        maxAmountMonth: 0,
        minAmountMonth: 0,
        maxAmountCat: 0,
        minAmountCat: 0,
    });

    const fetchRecords = async () => {
        try {
            const response = await fetch('http://localhost:3001/expenses');
            const data = await response.json();
            setAllRecords(data.allExpenses);
            setGroupedByDate(data.expensesGroupedByDate);
            setExpensesGroupedByYear(data.expensesGroupedByYear);
            setSummary(data.summary);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    const fetchYearSummary = async (year: string | undefined) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${year}`);
            const data = await response.json();
            setSummaryYear(data.summaryYear);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    const fetchMonthSummary = async (year: string | undefined, month: string | undefined) => {
        try {
            const response = await fetch(`http://localhost:3001/expenses/${year}/${month}`);
            const data = await response.json();
            setSummaryMonth(data.summaryMonth);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    const fetchFutureRecords = async () => {
        try {
            const response = await fetch('http://localhost:3001/plannedExpenses');
            const data = await response.json();
            setAllFutureRecords(data.allExpenses);
            setGroupedByDateFuture(data.expensesGroupedByDate);
            setGroupedByYearFuture(data.expensesGroupedByYear);
            setSummaryFuture(data.summary);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };
    const contextValue: RecordContextProps = {
        allRecords,
        groupedByDate,
        summary,
        summaryYear,
        summaryMonth,
        fetchRecords,
        fetchYearSummary,
        fetchMonthSummary,
        expensesGroupedByYear,
        groupedByYearFuture,
        allFutureRecords,
        groupedByDateFuture,
        summaryFuture,
        fetchFutureRecords,
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
