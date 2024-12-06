import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { thunkAuthenticate } from "../../redux/session"
import "./ProfilePage.css"

export default function ProfilePage () {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    useEffect(() => {
        dispatch(thunkAuthenticate())
    }, [dispatch])

    if(!("badges" in user)){
        return <h1>Loading...</h1>
    }

    const badgeFormatter = () => {
        const finalJSX = []
        if(!user.badges.length){
            return (
                <h2>Complete Programs to earn badges!</h2>
            )
        }
        for(let i = 0; i < user.badges.length; i++){
            let currBadge = user.badges[i]
            finalJSX.push(
                <div className="profile-page-badge-item">
                    <h5>{currBadge.name}</h5>
                    <div className="profile-page-badge" style={{"backgroundImage": `url('${currBadge.icon_url}')`}}></div>
                </div>
            )
        }
        return finalJSX
    }

    return (
        <main className="profile-page">
            <aside className="user-basic-info">
                <div className="profile-pic-items-container">
                    <div className="profile-pic-icon"></div>
                </div>
                <div className="username-email-container">
                    <h4>Username</h4>
                    <div className="user-username">{user.username}</div>
                    <h4>Email</h4>
                    <div className="user-email">{user.email}</div>
                </div>
            </aside>
            <section className="user-stats-info">
                <div className="badges-section">
                    <h2>Badges</h2>
                    <div className="badges-container">
                        {badgeFormatter()}
                    </div>
                </div>
                <div className="streak-score-section">
                    <div className="score-section">
                        <h2>Score</h2>
                        <div className="score-text">{user.score}</div>
                    </div>
                    <div className="streak-section">
                        <h2>Streak</h2>
                        <div className="streak-text">{user.streak} Days</div>
                    </div>
                </div>
            </section>
        </main>
    )
}