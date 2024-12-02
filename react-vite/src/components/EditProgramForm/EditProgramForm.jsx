import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import OpenModalButton from '../OpenModalButton'
import AddTaskModal from "../AddTaskModal/AddTaskModal"
import { getProgramThunk, editProgramThunk } from "../../redux/currentProgram"
import { FaRegTrashAlt } from "react-icons/fa"
import "./EditProgramForm.css"

export default function EditProgramForm () {
    const { programId } = useParams();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const program = useSelector(state => state.currentProgram.currentProgram)
    const [description, setDescription] = useState("")
    const [length, setLength] = useState("")
    const [name, setName] = useState("")
    const [tasks, setTasks] = useState([])
    const [initialTasks, setInitialTasks] = useState([])
    const [errors, setErrors] = useState({})
    const [triedSubmitting, setTriedSubmitting] = useState(false)

    useEffect(() => { // initial dispatch
        dispatch(getProgramThunk(programId))
    }, [dispatch, programId])

    useEffect(() => {
        if(Object.keys(program).length){
            setName(program.name)
            setDescription(program.description)
            setLength(program.total_days.toString())
            setTasks(program.tasks)
            setInitialTasks(program.tasks)
        }
    }, [program])

    if (Object.keys(program).length && user){ // if the current user is not the creator return them to the programs detail page
        if(program.creator_id != user.id) navigate(`/program/${programId}`)
    }

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
        return <h1>Log in to edit a program!</h1>
    }

    const handleTaskDelete = targetInd => {
        const copy = tasks.map(task => task)
        copy.splice(targetInd, 1)
        setTasks(copy)
    }

    const handleFinishedClick = async () => {
        setTriedSubmitting(true)
        if(Object.keys(errors).length) return
        const addedTasks = tasks.filter(task => !task.id)
        const keptTaskIds = tasks.filter(taskObj => taskObj.id).map(taskObj => taskObj.id)
        const deletedTasks = initialTasks.filter(initTask => !keptTaskIds.includes(initTask.id))
        const programDetailsObj = {
            name,
            description,
            total_days: length
        }
        // console.log("deletedTasks")
        // console.log(deletedTasks)
        // console.log("keptTaskIds")
        // console.log(keptTaskIds)
        // console.log("addedTasks")
        // console.log(addedTasks)
        const idFromThunk = await dispatch(editProgramThunk(addedTasks, deletedTasks, programDetailsObj, program.id))
        navigate(`/program/${idFromThunk}`)

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
        <div className="edit-spot-form-container">
            <main className="edit-spot-form">
                <div className="edit-spot-form-left">
                    {/* <div className="name-length-container"> */}
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
                    {/* </div> */}
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
                <div className="edit-spot-form-right">
                    <label>Tasks</label>
                    <div className="tasks-container">
                        {(errors.tasks && triedSubmitting) && <p className="error">{errors.tasks}</p>}
                        <div className="tasks-list-container">
                            {taskFormatter()}
                        </div>
                    </div>
                    <OpenModalButton
                        className="add-task-button"
                        buttonText="Add Task"
                        modalComponent={<AddTaskModal tasks={tasks} setTasks={setTasks}/>} />
                </div>
            </main>
        <button className="finish-program-form-button" onClick={handleFinishedClick}>Finished</button>
        </div>
    )
}