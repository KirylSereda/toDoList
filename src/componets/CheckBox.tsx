import { ChangeEvent } from "react"
import React from "react"

type CheckBoxProps = {
    isDone: boolean
    callBack: (checkedValue: boolean) => void
}

export const CheckBox = (props: CheckBoxProps) => {

    const checkBoxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
    return (
        <input type="checkbox" checked={props.isDone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => checkBoxChangeHandler(e)}
        />
    )
}