const GET_ALL_USER_PROGRAMS = 'userPrograms/getAll';

const getAllUserPrograms = (userPrograms) => {
    return {
        type: GET_ALL_USER_PROGRAMS,
        payload: userPrograms,
    };
};

export const getAllUserProgramsThunk = () => async (dispatch) => {
    const res = await fetch('/api/userprograms/current');
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllUserPrograms(data.user_programs));
    } else {
        const errors = await res.json();
        return errors;
    }
};

let initialState = {
    programs: {}
}

export default function programsReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_ALL_USER_PROGRAMS:
            return {programs: payload}
        default:
            return state;
    }
}