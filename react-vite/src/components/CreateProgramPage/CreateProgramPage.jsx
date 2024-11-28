import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import OpenModalButton from '../OpenModalButton'
import AddTaskModal from "../AddTaskModal/AddTaskModal"
import "./CreateProgramPage.css"

export default function CreateProgramsPage () {
    // const dispatch = useDispatch() 
    const user = useSelector(state => state.session.user)
    const [enrollSelf, setEnrollSelf] = useState(true)
    const [description, setDescription] = useState("")
    const [length, setLength] = useState("")
    const [name, setName] = useState("")
    const [tasks, setTasks] = useState([])
    const [errors, setErrors] = useState({})
    const [triedSubmitting, setTriedSubmitting] = useState(false)

    useEffect(() => { // validation useEffect
        const errors = {}
        if(!tasks.length){
            errors.tasks = "Programs must have at least one daily task."
        }
        if(description.length < 20 || description.length > 1000) {
            errors.description = "Desciption must be between 20 and 1,000 chaacters long."
        }
        if(name.length < 3 || name.length > 55){
            errors.name = "Name must be between 3 and 55 chaacters long."
        }
        if(!length.length){
            errors.length = "Length is required."
        }
        else if(isNaN(length)){
            errors.length = "Length must be a number."
        }
        else if(length.includes(".")){
            errors.length = "Length must be an integer."
        }
        console.log(length)
        setErrors(errors)
        console.log(errors)

    }, [description, length, name, setErrors, tasks])

    if(!user) {
        return <h1>Log in to create a program!</h1>
    }

    const enrollSelfHandler = e => {
        e.preventDefault()
        setEnrollSelf(!enrollSelf)
    }

    const submit = () => {
        setTriedSubmitting(true)
        if(Object.keys(errors).length) return
        console.log("submitted")
    }

    return (
        <main className="create-spot-form">
            <div className="name-length-container">
                <div className="name-input-container" >
                    {(errors.name && triedSubmitting) && <p className="error">{errors.name}</p>}
                    <label>Program Name</label>
                    <input
                    type="text"
                    value={name}
                    placeholder="Program Name"
                    onChange={e => setName(e.target.value)}>
                    </input>
                </div>
                <div className="length-input-container" >
                    {(errors.length && triedSubmitting) && <p className="error">{errors.length}</p>}
                    <label>{"Program Length (days)"}</label>
                    <input
                    type="number"
                    step="1"
                    min="1"
                    value={length}
                    placeholder="Length(days)"
                    onChange={e => setLength(e.target.value)}>
                    </input>
                </div>
            </div>
            <div className="desc-container">
                {(errors.description && triedSubmitting) && <p className="error">{errors.description}</p>}
                <label>Description</label>
                <textarea
                type="text"
                value={description}
                placeholder="Description"
                onChange={e => setDescription(e.target.value)}>
                </textarea>
            </div>
            <label>Tasks</label>
            <div className="tasks-container">
                {(errors.tasks && triedSubmitting) && <p className="error">{errors.tasks}</p>}
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
        </main>
    )
}