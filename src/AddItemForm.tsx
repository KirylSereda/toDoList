import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { IconButton, TextField } from "@material-ui/core";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<null | string>(null)

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        if (error) setError('')
    }
    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError('error')
        }
        setTitle("")
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.key == 'Enter') {
            onClickAddItem()
        }
    }

    return (
        <div>
            <TextField
                size={'small'}
                variant={'outlined'}
                value={title}
                onChange={onChangeSetTitle}
                onKeyPress={onKeyPressAddItem}
                label={'Title'}
                helperText={error && 'Title is required!'}
            />
            <IconButton
                size={"medium"}
                color={"primary"}
                onClick={onClickAddItem}>
                <AddCircleOutlineIcon />!
            </IconButton>

        </div>
    );
}
)

export default AddItemForm;