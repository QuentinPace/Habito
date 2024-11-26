import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function BrowseProgramsPage () {
    const dispatch = useDispatch() 

    // useEffect(() => {
    //     dispatch(getAllUserProgramsThunk())
    // }, [])


    return (
        <h1>Welcome from BrowseProgramsPage</h1>
    )
}