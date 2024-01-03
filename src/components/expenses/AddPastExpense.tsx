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
import el8 from '../styles/images/Alert.png'
import {motion} from "framer-motion";

export const AddPastExpenseForm: React.FC = () => {
    const {fetchRecords, fetchYearSummary, fetchMonthSummary} = useRecordContext();

    const categories: string[] = [
        "Food",
        "Service",
        "Fuel",
        "Self-improvement",
        "Recreation",
        "Going out",
        "Clothes",
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
    const [expenseInfo, setExpenseInfo] = useState<string>('')

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
            const dateObject = new Date(value);

            const today = new Date();
            if (dateObject <= today) {
                setCorrectMonth(!!value);
            } else {
                setCorrectMonth(false);
            }
        }
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitted(true);

        if (correctAll) {
            setSubmitted(true)
            try {
                const res = await fetch('http://localhost:3001/expenses', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                setExpenseInfo(`${data.name} was successfully added to the database`);
                const dateString = data.month;
                const [year, month, day] = dateString.split('-');
                fetchRecords();
                fetchYearSummary(year);
                fetchMonthSummary(year, month)
            } catch (error) {
                console.error('Error adding record:', error);
            }
        }
    }

    const variantsLeft = {
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 },
    };

    const addedExpense = <motion.div
            className="added-expense"
            initial="hidden"
            animate="visible"
            variants={variantsLeft}
            transition={{duration: 1}}
        >
            <img src={el8} className="desc-icon" alt=""/>
            <div style={{fontSize: "12px"}}>{expenseInfo}</div>
        </motion.div>

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
        setSubmitted(false);
    }

    useEffect(() => {
        if (correctName && correctMonth && correctCost && correctCategory) {
            setCorrectAll(true);
        } else {
            setCorrectAll(false);
            setSubmitted(false)
        }
    }, [correctName, correctMonth, correctCost, correctCategory, addAnotherOneFromScratch]);

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
                                placeholder="Add name"
                                type="text"
                                name="name"
                                className="form__name input"
                                value={form.name}
                                onChange={e => change('name', e.target.value)}
                            />
                            {
                                correctName &&
                                <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={variantsLeft}
                                transition={{duration: 0.8}}
                                >
                                <img src={el7} className="check__icon" alt=""/>
                                </motion.div>
                            }
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
                            {
                                correctCategory &&
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={variantsLeft}
                                    transition={{duration: 0.8}}
                                >
                                    <img src={el7} className="check__icon" alt=""/>
                                </motion.div>
                            }
                        </div>
                    </div>
                <div>
                    <div className="label">
                        <img className="desc-icon" src={el3} alt=""/>
                        Cost: <br/>
                    </div>
                        <div className="check">
                            <input
                                placeholder="Insert a value"
                                min="0"
                                name="cost"
                                type="number"
                                className="form__cost input"
                                value={form.cost === 0 ? '' : form.cost}
                                onChange={e => change('cost', e.target.value)}
                                onClick={() => {
                                    if (form.cost === 0) {
                                        change('cost', '');
                                    }
                                }}
                            />
                            {
                                correctCost &&
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={variantsLeft}
                                    transition={{duration: 0.8}}
                                >
                                    <img src={el7} className="check__icon" alt=""/>
                                </motion.div>
                    }
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
                            {
                                correctMonth &&
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={variantsLeft}
                                    transition={{duration: 0.8}}
                                >
                                    <img src={el7} className="check__icon" alt=""/>
                                </motion.div>
                            }
                    </div>
                </div>
            </div>
            <img src={el6} className="wrapper-div__image" alt=""/>
        </div>
    <div className="wrapper-div__textarea">
        <div className="label">
            <img className="desc-icon" src={el5} alt=""/>
                    Notes: <br/>
                </div>
                <textarea
                    placeholder="Add notes"
                    name="notes"
                    className="form__notes input"
                    value={form.notes}
                    rows={5}
                    cols={81}
                    style={{resize: "none"}}
                    onChange={e => change('notes', e.target.value)}/>
            </div>
            <div className="buttons">
                <button
                    type="submit"
                    className={
                    correctAll
                        ? "buttons__add"
                        : "buttons__add-disabled"
                }
                >
                    Add expense
                </button>
                <button
                    className="buttons__reset"
                    onClick={addAnotherOneFromScratch}
                >
                    Reset
                </button>
                {
                    submitted
                    && addedExpense
                }
            </div>
        </form>
    );
};
