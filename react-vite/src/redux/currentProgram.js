const GET_PROGRAM = 'userPrograms/getAll';

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
    programs: {}
}

export default function currentProgramReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_PROGRAM:
            return {program: payload}
        default:
            return state;
    }
}