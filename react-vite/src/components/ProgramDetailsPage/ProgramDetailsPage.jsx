import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom";
import { getProgramThunk } from "../../redux/currentProgram";


export default function ProgramDetailsPage () {
    const dispatch = useDispatch()
    const { programId } = useParams();

    useEffect(() => {
        dispatch(getProgramThunk(programId))
    }, [])


    return (
        <h1>Welcome from ProgramDetailsPage</h1>
    )
}