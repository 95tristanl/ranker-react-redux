
const state = {
    voteContent: [],
    hasVotedBoolArray: [],
    timesVoted: 0,
    alreadyVoted: []
};

const voteContentReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_VOTE_CONTENT':
            return {
                ...state,
                voteContent: action.payload.voteContent,
                hasVotedBoolArray: action.payload.hasVotedBoolArray
            };
        case 'CAST_VOTE':
            return {
                ...state,
                hasVotedBoolArray: action.payload.hasVotedBoolArray,
                timesVoted: action.payload.timesVoted,
                alreadyVoted: action.payload.alreadyVoted
            }
        default:
            return {
                ...state
            };
    }
}

export default voteContentReducer;
