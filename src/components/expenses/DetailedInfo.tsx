import React from 'react';
import { ExpenseEntity } from 'types';
import '../styles/DetailedExpense.scss'

interface Props {
    expense: ExpenseEntity;
    onClose: () => void;
}

export const ExpenseDetailsPanel = (props: Props) => {
    return (
        <div className="whole-panel">
            <button className="close-button" onClick={props.onClose}>
                X
            </button>
            <h2>Expense Details</h2>
            <div className="info-panel">
                <p>Name: {props.expense.name}</p>
                <p>Date: {props.expense.month}</p>
                <p>Cost: {props.expense.cost}$</p>
                <p>Category: {props.expense.category}</p>
                <p>Notes: {props.expense.notes}</p>
            </div>
        </div>
    );
};
