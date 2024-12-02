import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProgramsThunk } from "../../redux/programs"
import "./BrowseProgramsPage.css"

export default function BrowseProgramsPage () {
    const dispatch = useDispatch()
    const programs  = useSelector(state => state.programs.programs)

    useEffect(() => {
        dispatch(getAllProgramsThunk())
    }, [])

    if(!programs.length){
        return (
            <h1>Loading</h1>
        )
    }

    // const tasksFormatter = tasks => {
    //     const finalJSX = []
    //     for (let i = 0; i < tasks.length; i ++){
    //         finalJSX.push((
    //             <div className="browse-task-item"><p>{tasks[i].name}</p></div>
    //         ))
    //     }
    //     return finalJSX
    // }


    const programsFormatter = () => {
        const finalJSX = []
        for(let i = 0; i < programs.length; i ++){
            finalJSX.push((
                <div className="browse-program-item">
                    <header>{programs[i].name}</header>
                    <div className="browse-description-container">
                        <p>{programs[i].description.substring(0, 150)}...</p>
                    </div>
                </div>

            ))
        }
        return finalJSX
    }

    return (
        <main className="browse-page">
            <h1>Welcome from BrowseProgramsPage</h1>
            {programsFormatter()}    
        </main>
    )
}