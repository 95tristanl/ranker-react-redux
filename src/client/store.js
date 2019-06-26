import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from 'redux-thunk';
import homeLoginReducer from "./reducers/homeLoginReducer";
import rankedChartReducer from "./reducers/rankedChartReducer";
import submitContentReducer from "./reducers/submitContentReducer";
import voteContentReducer from "./reducers/voteContentReducer";

const initialState = {
    homeLogin_R: {
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
        isLoggedIn: false,
        usersName: "",
        usersEmail: "",
        usersHandle: ""
    },
    rankedChart_R: {
        rankedContent: []
    },
    submitContent_R: {
        formContent: ""
    },
    voteContent_R: {
        voteContent: [],
        hasVotedBoolArray: [],
        timesVoted: 0,
        alreadyVoted: []
    }
};

const middleware = [thunk, logger];

export default createStore(
    combineReducers({
        homeLogin_R: homeLoginReducer,
        rankedChart_R: rankedChartReducer,
        submitContent_R: submitContentReducer,
        voteContent_R: voteContentReducer
    }),
    initialState,
    applyMiddleware(...middleware)
);
