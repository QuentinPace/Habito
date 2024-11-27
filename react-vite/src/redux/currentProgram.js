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