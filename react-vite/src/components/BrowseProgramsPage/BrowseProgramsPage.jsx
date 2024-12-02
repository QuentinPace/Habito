import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProgramsThunk } from "../../redux/programs"
import { useNavigate } from "react-router-dom"
import "./BrowseProgramsPage.css"

export default function BrowseProgramsPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const programs  = useSelector(state => state.programs.programs)

    useEffect(() => {
        dispatch(getAllProgramsThunk())
    }, [dispatch])

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
                <div 
                key={i}
                onClick={() => navigate(`/program/${programs[i].id}`)}
                className="browse-program-item">
                    <header className="browse-header">{programs[i].name}</header>
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
            <h1>Featured Programs</h1>
            {programsFormatter()}    
        </main>
    )
}