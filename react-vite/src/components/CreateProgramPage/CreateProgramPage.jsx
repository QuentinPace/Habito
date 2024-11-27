import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function CreateProgramsPage () {
    const dispatch = useDispatch() 
    const user = useSelector(state => state.session.user)
    const [ enrollSelf, setEnrollSelf ] = useState(true)

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
        <form className="create-spot-form">
            <div className="name-length-container"></div>
            <div className="desc-container"></div>
            <div className="tasks-container">
                {/* map over created tasks */}
            </div>
            <div className="enroll-confirm-container">
                <button onClick={enrollSelfHandler}>{enrollSelf ? "Unenroll Yourself" : "Enroll Yourself"}</button>
                <button onClick={submit}>Create</button>
            </div>

        </form>
    )
}