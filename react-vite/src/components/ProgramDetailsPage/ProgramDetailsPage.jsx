import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useSearchParams } from "react-router-dom";
import { getProgramThunk } from "../../redux/currentProgram";
import "./ProgramDetailsPage.css"


export default function ProgramDetailsPage () {
    const dispatch = useDispatch()
    const program = useSelector(state => state.currentProgram.currentProgram)
    const user = useSelector(state => state.session.user)
    const { programId } = useParams();

    useEffect(() => { //initial dispatch
        dispatch(getProgramThunk(programId))
    }, [])

    if (!Object.keys(program).length) { // fail safe to not get to code using program when undefined
        return <h1>loading...</h1>
    }

    return (
        <main>
            <div className="program-info-all-container">
                <div className="program-details-container">
                    <h1>{program.name}</h1>
                    <article>
                        <div className="description-box">
                            <h3>description</h3>
                            <p>{program.description}</p>
                        </div>
                        <footer className="program-length-enroll-container">
                            <div className="program-length-container">
                                <h5>{`length(days)-`}</h5>
                                <div className="length-days-number-container">
                                    <h4>{program.total_days}</h4>
                                </div>
                            </div>
                            <div className="enroll-unenroll-button-container">
                            {/* this needs a conditional for if the user is not logged in take him to the login page */}
                                {program.is_enrolled ? <button>Unenroll</button> : <button>Enroll</button>}
                            </div>
                        </footer>
                    </article>

                </div>
                <aside>
                    <h2>Daily Tasks</h2>
                    <ul className="program-tasks-list">
                        {program.tasks.map((task) => {
                            return (
                                <div key={task.id}>
                                    <h6>{task.name}</h6>
                                </div>
                            )
                        })}
                    </ul>
                    
                </aside>
            </div>
            {user && user.id == program.creator_id && 
            <div className="creator-actions">im the creator dawg, soon to be creator actions section</div>
            }
        </main>
    )
}