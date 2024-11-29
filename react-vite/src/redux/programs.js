const GET_ALL_USER_PROGRAMS = 'userPrograms/getAll';
const RESET_USER_PROGRAMS = 'userPrograms/reset'
const TOGGLE_USER_TASK = "userTasks/toggle"
const GET_ALL_PROGRAMS = 'programs/getAll';


const getAllUserPrograms = (userPrograms) => {
    return {
        type: GET_ALL_USER_PROGRAMS,
        payload: userPrograms,
    };
};

const getAllPrograms = (programs) => {
    return {
        type: GET_ALL_PROGRAMS,
        payload: programs,
    };
};

const toggleUserTask = (userTaskId) => {
    return {
        type: TOGGLE_USER_TASK,
        payload: userTaskId
    };
};

const resetUserPrograms = () => {
    return {
        type: RESET_USER_PROGRAMS
    };
};

export const toggleUserTaskThunk = (userTaskId, ) => async (dispatch)=> {
    const res = await fetch(`/api/usertasks/${userTaskId}`, {
        method: "PATCH"
    })
    if(res.ok) {
        // const data = await res.json()
        dispatch(toggleUserTask(userTaskId))
    }
    else {
        const errors = await res.json();
        return errors;
    }
}

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

export const getAllProgramsThunk = () => async (dispatch) => {
    const res = await fetch('/api/programs');
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllPrograms(data.all_programs));
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
        case GET_ALL_PROGRAMS:
            return {programs: payload}
        case RESET_USER_PROGRAMS :
            return {...initialState}
        case TOGGLE_USER_TASK :
            let i
            let j
            outerLoop: for (i = 0 ; i < state.programs.length; i++){
                let currProgram = state.programs[i]
                for(j = 0; j < currProgram.tasks.length; j++) {
                    let currTask = currProgram.tasks[j]
                    if(currTask.user_task_id == payload){
                        break outerLoop
                    }
                }
            }
            state.programs[i].tasks[j].is_completed = !state.programs[i].tasks[j].is_completed
            return JSON.parse(JSON.stringify(state))
        default:
            return state;
    }
}