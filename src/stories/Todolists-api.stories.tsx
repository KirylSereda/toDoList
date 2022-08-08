import { useEffect, useState } from 'react'
import { todolistAPI } from '../api/todolist-api'

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)

    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {

                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {

    const [state, setState] = useState<any>(null)
    let title = 'RRR'
    useEffect(() => {
        todolistAPI.createTodolist(title).then((res) => {
            setState(res.data.data.item.title);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {

    const [state, setState] = useState<any>(null)

    useEffect(() => {
        const todolistId = 'ec8cc294-f25f-47e8-a329-2621f809b24d';
        todolistAPI.deleteTodolist(todolistId).then((res) => {
            setState(res.data.data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '47764ecd-d22b-46e7-8cd6-9c57a0cb60e3';
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, 'redux')
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '3924845b-94c1-44a2-8643-2a9d6ed4c116';
    useEffect(() => {
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '3924845b-94c1-44a2-8643-2a9d6ed4c116';
    let title = '10'
    useEffect(() => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '3924845b-94c1-44a2-8643-2a9d6ed4c116';
    const idTask = '31632f42-f27e-4147-a3b8-d17af0227f05'
    let model = {
        title: '5',
        description: '5',
        status: 5,
        priority: 5,
        startDate: '5',
        deadline: '5'
    }
    useEffect(() => {
        todolistAPI.updateTask(todolistId, idTask, model)
            .then((res) => {
                console.log(res)
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const todolistId = '3924845b-94c1-44a2-8643-2a9d6ed4c116';
    const idTask = '31632f42-f27e-4147-a3b8-d17af0227f05'

    useEffect(() => {
        todolistAPI.deleteTask(todolistId, idTask,)
            .then((res) => {

                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}


export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'TRACK-DELETED':
            return state.filter((track: any) => track !== action.trackId)
        default:
            return state
    }
}

const deleteTrackAC = (trackId: number) => ({ type: 'TRACK-DELETED', trackId })


const state = [
    { id: 12, likesCount: 10 },
    { id: 14, likesCount: 2 },
    { id: 100, likesCount: 0 }
]
const newState = reducer(state, deleteTrackAC(14))

console.log(newState.length === 2)


// Что нужно написать вместо XXX, чтобы корректно удалить трек и в консоли увидеть true?