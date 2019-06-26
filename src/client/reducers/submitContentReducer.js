
const state = {
    formContent: ""
};

const submitContentReducer = (state, action) => {
    switch (action.type) {
        case 'SUBMIT_CONTENT':
            return {
                ...state,
                formContent: ""
            }
        case 'CHANGE_SUBMIT_CONTENT':
            return {
                ...state,
                formContent: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default submitContentReducer;
