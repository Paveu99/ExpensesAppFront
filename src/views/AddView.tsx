import {animated, useSpring, useTransition} from "@react-spring/web";
import React, {useEffect, useState} from "react";
import "../components/styles/AddView.scss"
import {AddPastExpenseForm} from "../components/expenses/AddPastExpense";
interface Props {
    isOpen: boolean,
    onClose: () => void
}

export const AddExpenseView = (props: Props) => {

    const [openedPast, setOpenedPast] = useState<boolean>(true);

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            props.onClose()
        }
    }

    const styleOfLink = ({isActive}: {
                             isActive: boolean
                         }
    ) => (
        {
            color: isActive ? "#ffffff" : '',
            backgroundColor: isActive ? "#323232" : '',
        }
    )

    useEffect(() => {
        document.addEventListener("keydown", handleEscape)

        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    const modalTransition = useTransition(props.isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 1},
        config: {
            duration: 500
        }
    })

    const springs = useSpring({
        opacity: props.isOpen ? 1 : 0,
        transform: props.isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 500
        }
    })

    return modalTransition((styles, isOpen) => isOpen && (
        <animated.div className='react-modal-overlay' onClick={props.onClose}>
            <animated.div style={springs} className='react-modal-wrapper' onClick={e => e.stopPropagation()}>
                <div className='react-modal-content'>
                    <header className="add-form-header">
                        <div>
                            <h2 style={
                                {
                                    height: "30px",
                                    fontWeight: "bold",
                                    marginTop: "5px",
                                    marginBottom: "10px",
                                    background: 'linear-gradient(to right, #00ff00, #ffffff)',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }
                            }>
                                NEW EXPENSE
                            </h2>
                        </div>
                        <div className="change-buttons">
                            <button
                                onClick={() => setOpenedPast(true)}
                                className={openedPast ? 'activeForm' : 'inactiveForm'}
                            >
                                PAST
                            </button>
                            <button
                                onClick={() => setOpenedPast(false)}
                                className={!openedPast ? 'activeForm' : 'inactiveForm'}
                            >
                                FUTURE
                            </button>
                        </div>
                        <a href='#' className="close" onClick={props.onClose}></a>
                    </header>
                    <hr/>
                    {openedPast ? <AddPastExpenseForm/> : 'FutureForm'}
                </div>
            </animated.div>
        </animated.div>
    ))

}