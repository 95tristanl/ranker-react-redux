const state = {
    rankedContent: []
};

const rankedChartReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_RANKED_CHART':
            return {
                ...state,
                rankedContent: action.payload
            };
        default:
            return {
                ...state
            };
    }
}

export default rankedChartReducer;
