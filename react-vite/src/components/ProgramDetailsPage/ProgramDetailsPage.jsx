import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom";
import { getProgramThunk, enrollProgramThunk } from "../../redux/currentProgram";
import OpenModalButton from '../OpenModalButton'
import ConfirmUnenrollModal from "../ConfirmUnenrollModal/ConfirmUnenrollModal";
import "./ProgramDetailsPage.css"


export default function ProgramDetailsPage () {
    const dispatch = useDispatch()
    const program = useSelector(state => state.currentProgram.currentProgram)
    const user = useSelector(state => state.session.user)
    const { programId } = useParams();
    const navigate = useNavigate()

    useEffect(() => { //initial dispatch
        dispatch(getProgramThunk(programId))
    }, [dispatch, programId])

    if (!Object.keys(program).length) { // fail safe to not get to code using program when undefined
        return <h1>loading...</h1>
    }

    const handleEnroll = () => {
        dispatch(enrollProgramThunk(program.id))
    }

    const completionRewards = () => {
        return (
            <div className="completion-rewards-header-container">
                <h2>Completion Rewards</h2>
                <div className="completion-rewards-container">
                    <div className="badge-container">
                        <h4>Badge Awarded:</h4>
                        <div className="badge-emblem-details" style={{"backgroundImage": `url('${program.badge.icon_url}')`}}></div>
                    </div>
                    <div className="badge-details-container">
                        <h4>Name:</h4>
                        <p>{program.badge.name}</p>
                        <h4>Description:</h4>
                        <p>{program.badge.description}</p>
                    </div>
                    <div className="score-awarded-container">
                        <h4>Score Awarded:</h4>
                        <div className="score-awarded-number-container">
                            <p>{program.score}</p>
                        </div>
                    </div>
                </div>
            </div>
        )

    }



    return (
        <main>
            <div className="program-info-all-container">
                <div className="program-details-container">
                    <div className="program-details-container-top">
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
                                        {program.total_days}
                                    </div>
                                </div>
                                <div className="enroll-edit-buttons-container">
                                {/* this needs a conditional for if the user is not logged in take him to the login page */}
                                    {/* {program.is_enrolled ? <button onClick={handleUnenroll}>Unenroll</button> : <button  onClick={handleEnroll}>Enroll</button>} */}
                                    {program.is_enrolled ? <OpenModalButton
                                        buttonText='Unenroll'
                                        modalComponent={<ConfirmUnenrollModal programId={program.id}/>} />: <button  onClick={handleEnroll}>Enroll</button>}
                                    {user && user.id == program.creator_id && 
                                        <button className="creator-actions" onClick={() => navigate(`/program/${program.id}/edit`)}>edit</button>
                                    }
                                </div>
                            </footer>
                        </article>
                    </div>
                    {(program.badge && program.score) && completionRewards()}
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
        </main>
    )
}