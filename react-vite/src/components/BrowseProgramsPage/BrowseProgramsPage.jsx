import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProgramsThunk } from "../../redux/programs"

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


    const programsFormatter = () => {
        const finalJSX = []
        for(let i = 0; i < programs.length; i ++){



        }
    }

    return (
        <h1>Welcome from BrowseProgramsPage</h1>
    )
}