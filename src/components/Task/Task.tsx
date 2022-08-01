import { Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent, useCallback } from "react";
import { TaskStatuses, TaskType } from "../../api/todolist-api";
import EditableSpan from "../EditableSpan/EditableSpan";


type TaskPropsType = {
    key: string
    task: TaskType
    todoListId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: TaskStatuses, todolistId: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todoListId);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId);
    }, [props.task.id, props.todoListId])


    return <div key={props.task.id} className={props.task.status ? "is-done" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />
        <EditableSpan title={props.task.title} setNewTitle={onTitleChangeHandler} />
        <IconButton onClick={onClickHandler}>
            <Delete />
        </IconButton>
    </div>


})