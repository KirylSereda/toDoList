import React from "react"
import styles from './../Todolist.module.css'

export type ButtonPropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        props.callBack()
    }

    return (
        <button onClick={onClickHandler}
            className={props.className} >
            {props.name}
        </button>
    )
}