import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { thunkAuthenticate } from "../../redux/session"

export default function ProfilePage () {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkAuthenticate())
    }, [dispatch])

    return (
        <main>
            <aside className="user-basic-info">
                <div className="profile-pic-items-container">
                    <div className="profile-pic-icon"></div>
                </div>
                <div className="username-email-container">
                    <div className="user-username"></div>
                    <div className="user-email"></div>
                </div>
            </aside>
            <section className="user-stats-info">
                <div className="badges-container">
                    <h2>Badges</h2>
                    <div className="badges-items-container"></div>
                </div>
                <div className="streak-score-section">
                    <div className="score-section">
                        <h2>Score</h2>
                        <div className="score-text"></div>
                    </div>
                    <div className="streak-section">
                        <h2>Streak</h2>
                        <div className="streak-text"></div>
                    </div>
                </div>
            </section>
        </main>
    )
}