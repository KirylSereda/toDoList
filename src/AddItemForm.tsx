import React, { ChangeEvent, KeyboardEvent, useState } from "react"


type AddItemFormPropsType = {
    addItem: (tirle: string) => void
}
export const AddItemForm = (props: AddItemFormPropsType) => {

    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError(false)
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && onClickAddItem()
    }
    const inputClasses = error ? "error" : ""
    return <div>
        <input
            value={title}
            onChange={onChangeSetTitle}
            onKeyPress={onKeyPressAddItem}
            className={inputClasses}
        />
        <button onClick={onClickAddItem}>+</button>
        {error &&
            <div className={"error-message"}>Title is required!</div>}
    </div>
}