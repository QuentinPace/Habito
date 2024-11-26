import { getAllUserProgramsThunk } from "../../redux/programs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FaRegCheckSquare, FaRegSquare } from "react-icons/fa"
import { toggleUserTaskThunk } from "../../redux/programs"
import "./Home.css"

export default function Home () {
    const dispatch = useDispatch()
    const userPrograms = useSelector(state => state.programs.programs)
    const user = useSelector(state => state.session.user)
    const [percentageDone, setPercentageDone] = useState(0)

    useEffect(() => { // initial dispatch
        dispatch(getAllUserProgramsThunk()) 
    }, [user, dispatch])

    useEffect(() => {
        if(userPrograms.length){ // this block runs after initial dispatch is done and when userPrograms changes
            let num_completed = 0
            let count = 0
            for(let i = 0 ; i < userPrograms.length; i++){
                let currProgram = userPrograms[i]
                for(let j = 0; j < currProgram.tasks.length; j++){
                    let currTask = currProgram.tasks[j]
                    if(currTask.is_completed) num_completed++
                    count++
                }

            }
            // const multiplier = Math.floor(100 / count)
            // setPercentageDone(num_completed * multiplier)
            setPercentageDone(Math.floor((num_completed / count) * 100))
            console.log(percentageDone)
        }
    }, [userPrograms])

    if(!userPrograms.length){
        if(!user){
            return (
                <h1>Log in to see your daily tasks!</h1> 
            )
        }
        else{
            return (
                <h1>Loading...</h1>
            )
        }
    }

    const handleCheckBoxClick = userTask => {
        console.log(`${userTask}, now toggled`)
        dispatch(toggleUserTaskThunk(userTask.user_task_id))
    }


    const userTaskFormatter = userTaskList => {
        const finalJSX = []
        for (let i = 0; i < userTaskList.length; i++){
            let currTask = userTaskList[i]
            finalJSX.push((
                <div key={`user-task-${i}`} className="user-task-item">
                    <div className="user-task-item-name">
                        <h5>{currTask.name}</h5>
                    </div>
                    <div className="user-task-is-completed-container">
                        <div className="user-task-is-completed">
                            {currTask.is_completed ? 
                                <FaRegCheckSquare style={{color: "green"}}className="fa-reg-check-square" onClick={() => handleCheckBoxClick(currTask)}/> : 
                                <FaRegSquare className="fa-reg-square" onClick={() => handleCheckBoxClick(currTask)}/>}
                        </div>
                    </div>
                </div>
            ))
        }
        return finalJSX
    }

    const userProgramFormatter = userProgramList => {
        const finalJSX = []
        for (let i = 0 ; i < userProgramList.length; i++){
            let currProgram = userProgramList[i]
            finalJSX.push((
                <section key={`user-program-${i}`}className="user-program-item-container">
                    <header>
                        <div className="user-program-name"><h3>{currProgram.name}</h3></div>
                        <div className="user-program-days-left"><h3>{`${currProgram.days_left} days left!`}</h3></div>
                    </header>
                    <ul className="user-task-list-container">
                        {userTaskFormatter(currProgram.tasks)}
                    </ul>

                </section>
            ))
            
        }
        return finalJSX
    }




    return (
        <main>
            <h1>Rendering</h1>
            <div className="progress-bar">
                <div className="progress-bar-completed" style={{width: `${percentageDone}%`}}></div>
            </div>
            <div className="user-program-list-container">
                {userProgramFormatter(userPrograms)}
            </div>
        </main>
    )
}