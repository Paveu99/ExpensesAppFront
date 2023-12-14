import React, {FormEvent, useState} from 'react';
import {useRecordContext} from "../context/RecordContext";
import {AddNewExpense} from 'types'

export const AddRecordForm: React.FC = () => {
    const {fetchRecords} = useRecordContext();

    const categories: string[] = [
        "Food",
        "Service",
        "Fuel",
        "Self-improvement",
        "Recreation",
        "Going out",
        "Cloths",
        "Hobbies",
        "Transport",
        "Others"
    ]

    const [form, setForm] = useState<AddNewExpense>({
        category: 'Food',
        name: '',
        cost: 0,
        month: '',
        notes: '',
    });

    const [correctName, setCorrectName] = useState<boolean>(false);
    const [correctCost, setCorrectCost] = useState<boolean>(false);
    const [correctMonth, setCorrectMonth] = useState<boolean>(false);
    const [correctAll, setCorrectAll] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }))
        if (key === 'name') {
            setCorrectName(value.length > 0);
        }
        if (key === 'cost') {
            setCorrectCost(value > 0);
        }
        if (key === 'month') {
            setCorrectMonth(!!value);
        }
        console.log(value)
    };

    const checkInput = async (e: FormEvent) => {
        console.log(form.category, form.name, form.cost, form.month)
        e.preventDefault()
        setSubmitted(true);

        console.log(correctName, correctCost, correctMonth)

        if (correctCost && correctMonth && correctName) {
            setCorrectAll(true);
            try {
                const res = await fetch('http://localhost:3001/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                console.log(data)
                fetchRecords();
            } catch (error) {
                console.error('Error adding record:', error);
            } finally {
                setSubmitted(false);
            }
        }
    }

    const addAnotherOneFromScratch = () => {
        setForm({
            category: 'Food',
            name: '',
            cost: 0,
            month: '',
            notes: '',
        })
    }

    return (
        <form autoComplete='off' className="form" onSubmit={checkInput}>
            {/*{submitted && box}*/}
            <p>
                <label>
                    Name: <br/>
                    <input
                        type="text"
                        name="name"
                        className="input"
                        value={form.name}
                        onChange={e => change('name', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Category: <br/>
                    <select
                        name="category"
                        value={form.category}
                        onChange={e => change('category', e.target.value)}>
                        {categories.map((category) => {
                            return (<option value={category}>{category}</option>)
                        })}
                    </select>
                </label>
            </p>
            <p>
                <label>
                    Cost: <br/>
                    <input
                        name="cost"
                        type="number"
                        className="number-input"
                        value={form.cost}
                        onChange={e => change('cost', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Date: <br/>
                    <input
                        name="months"
                        type="date"
                        className="date-input"
                        value={form.month}
                        onChange={e => change('month', e.target.value)}
                    />
                </label>
            </p>
            <p>
                <label>
                    Notes: <br/>
                    <textarea
                        name="notes"
                        className="textarea-input"
                        value={form.notes}
                        rows={13}
                        cols={81}
                        style={{resize: "none"}}
                        onChange={e => change('notes', e.target.value)}/>
                </label>
            </p>
            <button type="submit" className="add-form-button">Add expense</button>
            <button className="add-form-button" onClick={addAnotherOneFromScratch}>Reset</button>
        </form>
    );
};
