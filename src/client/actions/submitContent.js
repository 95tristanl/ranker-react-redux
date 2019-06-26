
export function changeContent(content) {
    return {
        type: 'CHANGE_SUBMIT_CONTENT',
        payload: content
    }
}

export function submitContent(handle, content) {
    return function(dispatch) {
        let postedContent = {
            handle: handle,
            content: content
        };
        fetch('http://localhost:8080/postContent', {
            method: 'POST',
            body: JSON.stringify(postedContent),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                console.log("Did not send...");
                throw new Error("Failed...");
            }
            dispatch({
                type: 'SUBMIT_CONTENT',
                payload: ""
            });
        }).catch(err => {
            console.log(err);
        });
    }
}
