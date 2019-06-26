const state = {
    //local state
    fullName: "",
    email: "",
    reg_handle: "",
    reg_pass: "",
    login_handle: "",
    login_pass: "",
    errorStatus: "",
    validStatus: "",
    showReg: true,
    usersPosts: [],
    //global state
    isLoggedIn: false,
    usersName: "",
    usersEmail: "",
    usersHandle: ""
};

const homeLoginReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FORM':
            return {
                ...state,
                [action.payload.key]: action.payload.value
            }
        case 'VALIDATION':
            return {
                ...state,
                errorStatus: action.payload.errorStatus,
                validStatus: action.payload.validStatus
            }
        case 'REGISTER':
            return {
                ...state,
                validStatus: action.payload.validStatus,
                errorStatus: "",
                fullName: "",
                email: "",
                reg_handle: "",
                reg_pass: ""
            }
        case 'LOGIN':
            return {
                ...state,
                errorStatus: action.payload.errorStatus,
                validStatus: action.payload.validStatus,
                usersName: action.payload.usersName,
                usersEmail: action.payload.usersEmail,
                usersHandle: action.payload.usersHandle,
                login_handle: "",
                login_pass: "",
                isLoggedIn: action.payload.isLoggedIn
            }
        case 'LOGOUT':
            return {
                ...state,
                isLoggedIn: false
            }
        case 'GET_USERS_POSTS':
            return {
                ...state,
                usersPosts: action.payload
            }
        case 'RESET_STATUS_TIMEOUT':
            return {
                ...state,
                validStatus: ""
            }
        case 'TOGGLE_REG_LOGIN':
            return {
                ...state,
                showReg: action.payload.showReg,
                errorStatus: "",
                validStatus: ""
            }
        default:
            return {
                ...state
            }
    }
}

export default homeLoginReducer;
