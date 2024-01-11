import React, {FormEvent, useEffect, useState} from 'react';
import { ExpenseEntity } from 'types';
import '../styles/DetailedExpenseFuture.scss'
import {useRecordContext} from "../context/RecordContext";
import {motion} from "framer-motion";
import el8 from "../styles/images/Alert.png";
import el1 from "../styles/images/Name.png";
import el7 from "../styles/images/Check.png";
import el2 from "../styles/images/Category.png";
import el3 from "../styles/images/Cost.png";
import el4 from "../styles/images/Date.png";
import el5 from "../styles/images/Note.png";

interface Props {
    expense: ExpenseEntity;
    onClose: () => void;
}

export const ExpenseDetailsPanelFuture = (props: Props) => {

    const { fetchFutureRecords } = useRecordContext();

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

    const [original, setOriginal] = useState<ExpenseEntity>(props.expense);

    const [form, setForm] = useState<ExpenseEntity>(props.expense);

    const [correctName, setCorrectName] = useState<boolean>(true);
    const [correctCategory, setCorrectCategory] = useState<boolean>(true);
    const [correctCost, setCorrectCost] = useState<boolean>(true);
    const [correctMonth, setCorrectMonth] = useState<boolean>(true);
    const [correctAll, setCorrectAll] = useState<boolean>(true);
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [dif, setDif] = useState<boolean>();
    const [expenseInfo, setExpenseInfo] = useState<string>('');
    const [changedExpenseInfo, setChangedExpenseInfo] = useState<string>('');
    const [changed, setChanged] = useState<boolean>(false);
    const [changedName, setChangedName] = useState<boolean>(false);
    const [changedCategory, setChangedCategory] = useState<boolean>(false);
    const [changedCost, setChangedCost] = useState<boolean>(false);
    const [changedMonth, setChangedMonth] = useState<boolean>(false);
    const [changedNotes, setChangedNotes] = useState<boolean>(false);


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
            if (dateObject >= today) {
                setCorrectMonth(!!value);
            } else {
                setCorrectMonth(false);
            }
        }
    };

    const changeOriginal = () => {
        setOriginal(form)
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault()

        if (correctAll) {
            setSubmitted(true)
            try {
                const res = await fetch(`http://localhost:3001/plannedExpenses/edit/${props.expense.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                });
                const data = await res.json();
                setExpenseInfo(`${data.newExpense.name} was changed`);
                changeOriginal()
                fetchFutureRecords();
                setTimeout(() => {
                    setSubmitted(false);
                }, 3500);
            } catch (error) {
                console.error('Error adding record:', error);
            }
        }
    }

    const deleteExpense = async () => {
        try {
            const res = await fetch(`http://localhost:3001/plannedExpenses/delete/${props.expense.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if ([400, 500].includes(res.status)) {
                const error = await res.json();
                alert(`Error occured: ${error.message}`);
                return
            }
            setDif(true);
            const data = await res.json();
            setChangedExpenseInfo(`${data.newExpense.name} was deleted`);
            fetchFutureRecords();
            setTimeout(() => {
                props.onClose();
            }, 2000);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const moveExpense = async () => {
        try {
            const res = await fetch(`http://localhost:3001/plannedExpenses/move/${props.expense.id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if ([400, 500].includes(res.status)) {
                const error = await res.json();
                alert(`Error occured: ${error.message}`);
                return
            }
            setDif(true);
            const data = await res.json();
            setChangedExpenseInfo(`${data.message}`);
            fetchFutureRecords();
            setTimeout(() => {
                props.onClose();
            }, 2000);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    const variantsLeft = {
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 },
    };

    const addedExpense = <motion.div
        className="changed-expense"
        initial="hidden"
        animate="visible"
        variants={variantsLeft}
        transition={{duration: 1}}
    >
        <img src={el8} className="desc-icon" alt=""/>
        <div style={{fontSize: "12px"}}>{expenseInfo}</div>
    </motion.div>

    const changedExpense = <motion.div
        className="deleted-expense"
        initial="hidden"
        animate="visible"
        variants={variantsLeft}
        transition={{duration: 1}}
    >
        <img src={el8} className="desc-icon" alt=""/>
        <div style={{fontSize: "20px"}}>{changedExpenseInfo}</div>
    </motion.div>

    const resetValues = () => {
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
    };

    const backToDefaultValues = () => {
        setForm({
            category: original.category,
            name: original.name,
            cost: original.cost,
            month: original.month,
            notes: original.notes,
        });
        setCorrectName(true);
        setCorrectCategory(true);
        setCorrectCost(true);
        setCorrectMonth(true);
        setSubmitted(false);
    };

    useEffect(() => {
        if (form.cost !== original.cost) {
            setChangedCost(true);
        } else {
            setChangedCost(false);
        }
        if (form.name !== original.name) {
            setChangedName(true);
        } else {
            setChangedName(false);
        }
        if (form.month !== original.month) {
            setChangedMonth(true);
        } else {
            setChangedMonth(false);
        }
        if (form.notes !== original.notes) {
            setChangedNotes(true);
        } else {
            setChangedNotes(false);
        }
        if (form.category !== original.category) {
            setChangedCategory(true);
        } else {
            setChangedCategory(false);
        }
        if (form.cost !== original.cost || form.name !== original.name || form.month !== original.month || form.notes !== original.notes || form.category !== original.category) {
            setChanged(true);
        } else {
            setChanged(false);
        }
        if (correctName && correctMonth && correctCost && correctCategory) {
            setCorrectAll(true);
        } else {
            setCorrectAll(false);
            setSubmitted(false);
        }
    }, [correctName, correctMonth, correctCost, correctCategory, resetValues]);


    const editForm = <>
        <a href='#' className="close-button" onClick={props.onClose}></a>
        <h2><span style={{color: "rgba(213, 219, 52, 0.77)"}}>{original.name}</span> details:</h2>
        <form autoComplete='off' className="form" onSubmit={checkInput}>
            <div className="wrapper-div">
                <div className="wrapper-div__columns">
                    <div>
                        <div className="label" style={{color: "rgba(213, 219, 52, 0.77)"}}>
                            <img className="desc-icon" src={el1} alt=""/>
                            Name{changedName && '*'}: <br/>
                        </div>
                        <div className="check-edit">
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
                        <div className="label" style={{color: "rgba(213, 219, 52, 0.77)"}}>
                            <img className="desc-icon" src={el2} alt=""/>
                            Category{changedCategory && '*'}: <br/>
                        </div>
                        <div className="check-edit">
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
                        <div className="label" style={{color: "rgba(213, 219, 52, 0.77)"}}>
                            <img className="desc-icon" src={el3} alt=""/>
                            Cost{changedCost && '*'}: <br/>
                        </div>
                        <div className="check-edit">
                            <input
                                placeholder="Insert a value"
                                name="cost"
                                type="text"
                                pattern="[0-9]*([.][0-9]{0,2})?"
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
                        <div className="label" style={{color: "rgba(213, 219, 52, 0.77)"}}>
                            <img className="desc-icon" src={el4} alt=""/>
                            Date{changedMonth && '*'}: <br/>
                        </div>
                        <div className="check-edit">
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
            </div>
            <div className="wrapper-div__textareas">
                <div className="label" style={{color: "rgba(213, 219, 52, 0.77)"}}>
                    <img className="desc-icon" src={el5} alt=""/>
                    Notes{changedNotes && '*'}: <br/>
                </div>
                <textarea
                    placeholder="Add notes"
                    name="notes"
                    className="form__notess input"
                    value={form.notes}
                    rows={3}
                    cols={81}
                    style={{resize: "none"}}
                    onChange={e => change('notes', e.target.value)}/>
            </div>
            <div className="buttonss">
                <button
                    type="button"
                    className="buttonss__back-future"
                    onClick={backToDefaultValues}
                >
                    Back to default values
                </button>
                <button
                    type="submit"
                    className={
                        (correctAll && changed)
                            ? "buttonss__add"
                            : "buttonss__add-disabled"
                    }
                >
                    Update expense
                </button>
                <button
                    type="reset"
                    className="buttonss__reset"
                    onClick={resetValues}
                >
                    Clear
                </button>
                <button
                    type="button"
                    className="buttonss__delete-future"
                    onClick={deleteExpense}
                >
                    Delete
                </button>
                <button
                    type="button"
                    className="buttonss__move-future"
                    onClick={moveExpense}
                >
                    Move to past expenses
                </button>
            </div>
        </form>
        {
            submitted
            && addedExpense
        }
    </>

    return (
        <div className="whole-panel">
            {dif ? changedExpense : editForm}
        </div>
    );
};
