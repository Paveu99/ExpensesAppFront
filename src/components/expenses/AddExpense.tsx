import React, {FormEvent, useState} from 'react';
import {AddNewExpense} from 'types'
export const AddExpense = () => {

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
    // TO SPRAWDZIĆ BO CHYBA TU BĘDĄ JEDNAK PEŁNE DATY
    const months: string[] = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const [form, setForm] = useState<AddNewExpense>({
        category: '',
        name: '',
        cost: 0,
        month: '',
        notes: '',
    });

    const [correctCategory, setCorrectCategory] = useState<boolean>(false);
    const [correctName, setCorrectName] = useState<boolean>(false);
    const [correctCost, setCorrectCost] = useState<boolean>(false);
    const [correctMonth, setCorrectMonth] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const change = (key: string, value: any) => {
        setForm(form => ({
            ...form,
            [key]: value
        }))
    };

    const checkInput = async (e: FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        if (form.category.length
            try {
                const res = await fetch('http://localhost:3001/user/reg', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                })
                const data = await res.json()
                setResultInfo(data.answer)
            } finally {
                setLoading(false);
            }
        } else {
            setCorrect(false)
        }
    }

    return
}