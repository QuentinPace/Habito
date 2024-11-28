import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton'
import AddTaskModal from "../AddTaskModal/AddTaskModal"

export default function CreateProgramsPage () {
    // const dispatch = useDispatch() 
    const user = useSelector(state => state.session.user)
    const [ enrollSelf, setEnrollSelf ] = useState(true)
    const [description, setDescription] = useState("")
    const [length, setLength] = useState("")
    const [name, setName] = useState("")
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        console.log("tasks changed buddy boy")
        console.log(tasks)
    }, [tasks])

    if(!user) {
        return <h1>Log in to create a program!</h1>
    }

    const enrollSelfHandler = e => {
        e.preventDefault()
        setEnrollSelf(!enrollSelf)
    }

    const submit = () => {
        console.log("poopy")
    }

    return (
        <div className="create-spot-form">
            <div className="name-length-container">
                <input
                type="text"
                value={name}
                placeholder="Program Name"
                onChange={e => setName(e.target.value)}>
                </input>
                <input
                type="number"
                step="1"
                min="1"
                value={length}
                placeholder="Length(days)"
                onChange={e => setLength(e.target.value)}>
                </input>
            </div>
            <div className="desc-container">
            <input
                type="text"
                value={description}
                placeholder="Description"
                onChange={e => setDescription(e.target.value)}>
                </input>
                
            </div>
            <div className="tasks-container">
                <div className="tasks-grid">
                    {tasks.map(taskName => {
                        return (
                            <div key={taskName} className="created-task-container"><h6>{taskName}</h6></div>
                        )
                    })}
                </div>
                <OpenModalButton
                buttonText="Add Task"
                modalComponent={<AddTaskModal tasks={tasks} setTasks={setTasks}/>} />
            </div>
            <div className="enroll-confirm-container">
                <button onClick={enrollSelfHandler}>{enrollSelf ? "Unenroll Yourself" : "Enroll Yourself"}</button>
                <button onClick={submit}>Create</button>
            </div>
        </div>
    )
}