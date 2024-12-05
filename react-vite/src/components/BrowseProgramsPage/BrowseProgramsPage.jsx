import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProgramsThunk } from "../../redux/programs"
import { useNavigate } from "react-router-dom"
import "./BrowseProgramsPage.css"

export default function BrowseProgramsPage () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.session.user)
    const programs  = useSelector(state => state.programs.programs)

    useEffect(() => {
        dispatch(getAllProgramsThunk())
    }, [dispatch])

    if(!user) {
        return <h1>Log in to browse programs!</h1>
    }

    if(!programs.length){
        return (
            <h1>Loading</h1>
        )
    }

    const programsFormatter = () => {
        const finalJSX = []
        for(let i = 0; i < programs.length; i ++){
            let badge_url = programs[i].badge ? programs[i].badge.icon_url : "placeholder(need an aws hosted placeholder url)"
            finalJSX.push((
                <div 
                key={i}
                onClick={() => navigate(`/program/${programs[i].id}`)}
                className="browse-program-item">
                    <div className="program-header-desc-container">
                        <header className="browse-header">{programs[i].name}</header>
                        <div className="browse-description-container">
                            <p>{programs[i].description.substring(0, 150)}...</p>
                            </div>
                    </div>
                    <div className="program-browse-badge-container">
                        <header className="badge-header">Badge</header>
                        <div className="badge-browse" style={{"backgroundImage": `url('${badge_url}')`}}>
                        </div>

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