const GET_ALL_USER_PROGRAMS = 'userPrograms/getAll';
const RESET_USER_PROGRAMS = 'userPrograms/reset'

const getAllUserPrograms = (userPrograms) => {
    return {
        type: GET_ALL_USER_PROGRAMS,
        payload: userPrograms,
    };
};

const resetUserPrograms = () => {
    return {
        type: RESET_USER_PROGRAMS
    };
};

export const getAllUserProgramsThunk = () => async (dispatch) => {
    const res = await fetch('/api/userprograms/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllUserPrograms(data.user_programs));
    } else {
        const errors = await res.json();
        if (errors.errors.message == "Unauthorized"){
            dispatch(resetUserPrograms())
        }
        else{
            return errors;
        }
    }
};

let initialState = {
    programs: {}
}

export default function programsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_USER_PROGRAMS:
            return {programs: payload}
        case RESET_USER_PROGRAMS :
            return {...initialState}
        default:
            return state;
    }
}