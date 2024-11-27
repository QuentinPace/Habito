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