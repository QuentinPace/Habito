import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import './AddTaskModal.css'
import { useState } from "react"

export default function AddTaskModal() {
    const { closeModal } = useModal()
    const dispatch = useDispatch()
    const [taskName, setTaskName] = useState("")
    console.log(taskName)

    return (
        <>
            <h1>Add Task</h1>
               <h4>Task Name</h4>
            <div className='unenroll-button-container'>
                <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)}></input>
                <button className='confirm-task-create' onClick={closeModal}>Add Task</button>
            </div>
        </>
    )
}