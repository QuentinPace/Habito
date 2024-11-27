import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import './AddTaskModal.css'
import { useEffect, useState } from "react"

export default function AddTaskModal({ tasks, setTasks }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [taskName, setTaskName] = useState("")
    const [hasError, setHasError] = useState(false)
    const [triedSubmitting, setTriedSubmitting] = useState(false)

    const handleConfirmTask = () => {
        setTriedSubmitting(true)
        if(hasError) return
        setTasks([...tasks, taskName])
        closeModal()
    }

    useEffect(() => { // task name validator
        if(taskName.length < 3 || taskName.length > 70){
            setHasError(true)
        }
        else{
            setHasError(false)
        }
    }, [setHasError, taskName])

    return (
        <>
            <h1>Add Task</h1>
               <h4>Task Name</h4>
            <div className='input-confirm-task-container'>
                <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
                {(hasError && triedSubmitting) && <p className="error">Task name must be between 3 and 70 characters long.</p>}
                <button disabled={hasError && triedSubmitting} className='confirm-task-create' onClick={handleConfirmTask}>Add Task</button>
            </div>
        </>
    )
}