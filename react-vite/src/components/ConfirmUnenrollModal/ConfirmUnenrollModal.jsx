import { useModal } from "../../context/Modal"
import { useDispatch } from 'react-redux'
import { unenrollProgramThunk } from "../../redux/currentProgram";

import './ConfirmUnenrollModal.css'

export default function ConfirmUnenrollModal({ programId }) {
    const { closeModal } = useModal()
    const dispatch = useDispatch()

    const handleUnenroll = () => {
        dispatch(unenrollProgramThunk(programId))
        closeModal()
    }
    return (
        <>
            <h1>Confirm Unenroll</h1>
               <h4 className='are-you-sure-text'>{`Are you sure you want to unenroll?`}</h4>
            <div className='unenroll-button-container'>
                <button className='confirm-unenroll-button' onClick={handleUnenroll}>{`Yes (unenroll)`}</button>
                <button className='keep-button' onClick={closeModal}>{`No (stay enrolled)`}</button>
            </div>
        </>
    )
}