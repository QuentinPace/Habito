import { getAllUserProgramsThunk } from "../../redux/programs"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
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
    else{
    }




    return (
        <main>
            <h1>Rendering</h1>
            <div className="progress-bar">
                <div className="progress-bar-completed" style={{width: `${percentageDone}%`}}></div>
            </div>
        </main>
    )
}