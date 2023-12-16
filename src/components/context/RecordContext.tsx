import React, { createContext, useContext, useState, ReactNode } from 'react';
import {AddNewExpense} from 'types';
import {ExpenseEntity} from 'types'

interface RecordContextProps {
    records: ExpenseEntity[];
    fetchRecords: () => Promise<void>;
}

const RecordContext = createContext<RecordContextProps | undefined>(undefined);

interface RecordProviderProps {
    children: ReactNode;
}

export const RecordProvider: React.FC<RecordProviderProps> = ({ children }) => {
    const [records, setRecords] = useState<ExpenseEntity[]>([]);

    const fetchRecords = async () => {
        try {
            // Replace the URL with your actual API endpoint
            const response = await fetch('http://localhost:3001/expenses');
            const data = await response.json();
            setRecords(data.allExpenses);
        } catch (error) {
            console.error('Error fetching records:', error);
        }
    };

    const contextValue: RecordContextProps = {
        records,
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
