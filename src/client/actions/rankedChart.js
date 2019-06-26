
export function fetchRankedChart(timesVoted) {
    return function(dispatch) {
        fetch(`http://localhost:8080/getRankedContent${timesVoted}`,{
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed...");
            }
            return res.json();
        }).then(data => {
            dispatch({
                type: 'FETCH_RANKED_CHART',
                payload: data.content
            });
        }).catch(err => {
            console.log(err);
        });
    }
}
