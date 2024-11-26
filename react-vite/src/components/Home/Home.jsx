import { getAllUserProgramsThunk } from "../../redux/programs"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

export default function Home () {
    const dispatch = useDispatch() 

    useEffect(() => {
        dispatch(getAllUserProgramsThunk())
    }, [])


    return (
        <h1>Welcome from home</h1>
    )
}