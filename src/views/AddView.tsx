import {animated, useSpring, useTransition} from "@react-spring/web";
import React, {useEffect} from "react";
import "../components/styles/AddView.scss"
import {AddExpenseForm} from "../components/expenses/AddExpense";
interface Props {
    isOpen: boolean,
    onClose: () => void
}

export const AddExpenseView = (props: Props) => {

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            props.onClose()
        }
    }

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
                    <header>
                        <div>
                            <h2 style={
                                {
                                    fontWeight: "bold",
                                    marginTop: "5px",
                                    marginBottom: "5px",
                                    background: 'linear-gradient(to right, #00ff00, #ffffff)',
                                    WebkitBackgroundClip: 'text',
                                    color: 'transparent',
                                }
                            }>NEW EXPENSE</h2>
                        </div>
                        <a href='#' className="close" onClick={props.onClose}></a>
                    </header>
                    <hr/>
                    <AddExpenseForm/>
                </div>
            </animated.div>
        </animated.div>
    ))

}