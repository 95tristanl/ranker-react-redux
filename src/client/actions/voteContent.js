
export function fetchVoteContent(usersHandle, alreadyVoted) {
    return function(dispatch) {
        fetch(`http://localhost:8080/getVoteContent${usersHandle}`,{
            method: 'POST',
            body: JSON.stringify({lst: alreadyVoted}),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed...");
            }
            return res.json();
        }).then(data => {
            let arr = [];
            for (let i = 0; i < data.content.length; i++) {
                arr.push("-");
            }
            dispatch({
                type: 'FETCH_VOTE_CONTENT',
                payload: {
                    voteContent: data.content,
                    hasVotedBoolArray: arr
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function castVote(vote, voteContentIndex, voteContent, hasVotedBoolArray, timesVoted, alreadyVoted) {
    return function(dispatch) {
        hasVotedBoolArray[voteContentIndex] = vote;
        alreadyVoted.push(voteContent[voteContentIndex]);
        fetch(`http://localhost:8080/castVote${vote+"_"+voteContent[voteContentIndex]._id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log("Did not send...");
                throw new Error("Failed...");
            }
            dispatch({
                type: 'CAST_VOTE',
                payload: {
                    hasVotedBoolArray: hasVotedBoolArray,
                    timesVoted: timesVoted + 1,
                    alreadyVoted: alreadyVoted
                }
            });
        }).catch(err => {
            console.log(err);
        });
    }
}
