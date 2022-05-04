import React, { ChangeEvent, useState } from "react"

type EditableSpanPropsType = {
    title: string
    setNewTitle: (newTitle: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [title, setTitle] = useState<string>(props.title)
    const [editMode, setEditMode] = useState(false)
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        if (title.trim()) {
            setEditMode(false)
            props.setNewTitle(title)
        }
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title}
                onChange={onChangeSetTitle}
                onBlur={offEditMode} />
            : <span onDoubleClick={onEditMode}> {props.title}</span>
    )
}