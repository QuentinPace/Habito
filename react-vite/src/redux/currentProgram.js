const GET_PROGRAM = 'programs/getOne';

const getProgram = (program) => {
    return {
        type: GET_PROGRAM,
        payload: program,
    };
};

export const getProgramThunk = (programId) => async (dispatch) => {
    const res = await fetch(`/api/programs/${programId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getProgram(data));
    } else {
        const errors = await res.json();
        return errors;
    }
};

export const createProgramThunk = (programObj) => async () => {
    const res = await fetch(`/api/programs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(programObj)
    })
    if(res.ok){
        const data = await res.json();
        // dispatch(getProgramThunk(data.id))
        return data.id
    } else {
        // const errors = await res.json();
        return {errors: true};
    }
}

export const editProgramThunk = (addedTasks, deletedTasks, programDetails, programId) => async () => {
    const programDetailsRes = await fetch(`/api/programs/${programId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(programDetails)
    })
    if(programDetailsRes.ok){
        for(let i = 0; i < addedTasks.length; i++){  // looping through added tasks and fetching the db
            let addedTaskRes = await fetch(`/api/programs/${programId}/tasks`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(addedTasks[i])
            })
            if(!addedTaskRes.ok){
                console.log("problem adding a task")
            }
        }
        for(let i = 0; i < deletedTasks.length; i++){ // looping through deleted tasks and fetching the db
            let deletedTaskRes = await fetch(`/api/programs/${programId}/tasks/${deletedTasks[i].id}`, {method: "DELETE"})
            if(!deletedTaskRes.ok) console.log("problem deleting a task")
        }
        return programId
    } else {
        return {errors: true};
    }
}

export const enrollProgramThunk = (programId) => async dispatch => {
    const res = await fetch(`/api/userprograms/${programId}`, {
        method: "POST"
    })
    if(res.ok){
        dispatch(getProgramThunk(programId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

export const unenrollProgramThunk = (programId) => async dispatch => {
    const res = await fetch(`/api/userprograms/${programId}?by_program_id=true`, {
        method: "DELETE"
    })
    if(res.ok){
        dispatch(getProgramThunk(programId))
    } else {
        const errors = await res.json();
        return errors;
    }
}

let initialState = {
    currentProgram: {}
}

export default function currentProgramReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PROGRAM:
            return {currentProgram: payload}
        default:
            return state;
    }
}