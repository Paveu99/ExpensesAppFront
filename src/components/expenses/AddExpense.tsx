import React, {FormEvent, useEffect, useState} from 'react';
import {useRecordContext} from "../context/RecordContext";
import {AddNewExpense} from 'types'
import '../styles/AddExpense.scss'
import el1 from '../styles/images/Name.png';
import el2 from '../styles/images/Category.png';
import el3 from '../styles/images/Cost.png';
import el4 from '../styles/images/Date.png';
import el5 from '../styles/images/Note.png';
import el6 from '../styles/images/AddImage.png'
import el7 from '../styles/images/Check.png'

export const AddExpenseForm: React.FC = () => {
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
        category: '',
        name: '',
        cost: 0,
        month: '',
        notes: '',
    });
    const [correctName, setCorrectName] = useState<boolean>(false);
    const [correctCategory, setCorrectCategory] = useState<boolean>(false);
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
        if (key === 'category') {
            setCorrectCategory(categories.includes(value));
        }
        if (key === 'cost') {
            setCorrectCost(value > 0);
        }
        if (key === 'month') {
            setCorrectMonth(!!value);
        }
    };

    const checkInput = async (e: FormEvent) => {
        console.log(form.category, form.name, form.cost, form.month)
        e.preventDefault()
        setSubmitted(true);

        console.log(correctName, correctCost, correctMonth)

        if (correctAll) {
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
            category: '',
            name: '',
            cost: 0,
            month: '',
            notes: '',
        });
        setCorrectName(false);
        setCorrectCategory(false);
        setCorrectCost(false);
        setCorrectMonth(false);
        setCorrectAll(false);
    }
    useEffect(() => {
        if (correctName && correctMonth && correctCost && correctCategory) {
            setCorrectAll(true);
        } else {
            setCorrectAll(false);
        }
    }, [correctName, correctMonth, correctCost, correctCategory]);

    return (
        <form autoComplete='off' className="form" onSubmit={checkInput}>
            <div className="wrapper-div">
                <div className="wrapper-div__columns">
                    <div>
                        <div className="label">
                            <img className="desc-icon" src={el1} alt=""/>
                            Name: <br/>
                        </div>
                        <div className="check">
                            <input
                                type="text"
                                name="name"
                                className="form__name input"
                                value={form.name}
                                onChange={e => change('name', e.target.value)}
                            />
                            {correctName && <img src={el7} className="check__icon" alt=""/>}
                        </div>
                    </div>
                    <div>
                        <div className="label">
                            <img className="desc-icon" src={el2} alt=""/>
                            Category: <br/>
                        </div>
                        <div className="check">
                            <select
                                className="form__category input"
                                name="category"
                                value={form.category}
                                onChange={e => change('category', e.target.value)}>
                                <option value="">Choose a category</option>
                                {categories.map((category) => {
                                    return (<option value={category}>{category}</option>)
                                })}
                            </select>
                            {correctCategory && <img src={el7} className="check__icon" alt=""/>}
                        </div>
                    </div>
                    <div>
                        <div className="label">
                            <img className="desc-icon" src={el3} alt=""/>
                            Cost: <br/>
                        </div>
                        <div className="check">
                            <input
                                placeholder=""
                                min="0"
                                name="cost"
                                type="number"
                                className="form__cost input"
                                value={form.cost}
                                onChange={e => change('cost', e.target.value)}
                            />
                            {correctCost && <img src={el7} className="check__icon" alt=""/>}
                        </div>
                    </div>
                    <div>
                        <div className="label">
                            <img className="desc-icon" src={el4} alt=""/>
                            Date: <br/>
                        </div>
                        <div className="check">
                            <input
                                name="months"
                                type="date"
                                className="form__date input"
                                value={form.month}
                                onChange={e => change('month', e.target.value)}
                            />
                            {correctMonth && <img src={el7} className="check__icon" alt=""/>}
                        </div>
                    </div>
                </div>
                <img src={el6} className="wrapper-div__image" alt=""/>
            </div>
            <div>
                <div className="label">
                    <img className="desc-icon" src={el5} alt=""/>
                    Notes: <br/>
                </div>
                <textarea
                    placeholder="Add notes"
                    name="notes"
                    className="form__notes input"
                    value={form.notes}
                    rows={10}
                    cols={81}
                    style={{resize: "none"}}
                    onChange={e => change('notes', e.target.value)}/>
            </div>
            <div className="buttons">
                <button type="submit" className={correctAll ? "buttons__add": "buttons__add-disabled"}>Add expense</button>
                <button className="buttons__reset" onClick={addAnotherOneFromScratch}>Reset</button>
            </div>
        </form>
    );
};
