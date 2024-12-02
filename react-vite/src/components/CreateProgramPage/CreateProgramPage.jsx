import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OpenModalButton from '../OpenModalButton'
import AddTaskModal from "../AddTaskModal/AddTaskModal"
import { createProgramThunk } from "../../redux/currentProgram"
import { FaRegTrashAlt } from "react-icons/fa"
import "./CreateProgramPage.css"

export default function CreateProgramsPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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
        setErrors(errors)

    }, [description, length, name, setErrors, tasks])

    if(!user) {
        return <h1>Log in to create a program!</h1>
    }

    const enrollSelfHandler = e => {
        e.preventDefault()
        setEnrollSelf(!enrollSelf)
    }

    const submit = async () => {
        setTriedSubmitting(true)
        if(Object.keys(errors).length) return
        const newProgram = {
            name,
            description,
            total_days: length,
            enroll: enrollSelf,
            // tasks: tasks.map(name => {return {name}})
            tasks
        }
        console.log(newProgram)
        const programId = await dispatch(createProgramThunk(newProgram))
        if(programId.errors) return (
            <h1>Sorry there was a problem creating your program, try again later.</h1>
        )
        else {
            navigate(`/program/${programId}`)
        }
    }

    const handleTaskDelete = targetInd => {
        const copy = tasks.map(task => task)
        copy.splice(targetInd, 1)
        setTasks(copy)
    }

    const taskFormatter = () => {
        const finalJSX = []
        for(let i = 0; i < tasks.length; i++){
            finalJSX.push((
                <div key={tasks[i].name} className="created-task-container">
                    <h6>{tasks[i].name}</h6>
                    <button className="task-delete" onClick={() => handleTaskDelete(i)}>
                        <FaRegTrashAlt />
                    </button>
                </div>
            ))
        }
        return finalJSX
    }

    return (
        <div className="create-program-form">
            <div className="create-program-form-left">
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
            </div>
            <div className="create-program-form-right">
                <label>Tasks</label>
                <div className="tasks-container">
                    {(errors.tasks && triedSubmitting) && <p className="error">{errors.tasks}</p>}
                    <div className="tasks-grid">
                        {taskFormatter()}
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
        </div>
    )
}