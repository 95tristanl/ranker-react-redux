
export function updateForm(key, value) {
    return function(dispatch) {
        switch(key) {
            case "fullName":
                validateName(value);
                break;
            case "email":
                validateEmail(value);
                break;
            case "reg_handle":
                validateHandle(value);
                break;
            case "reg_pass":
                validatePassword(value);
                break;
        }
        dispatch({
            type: 'UPDATE_FORM',
            payload: {
                key: key,
                value: value
            }
        });
    }
}

export function register(name, email, reg_handle, reg_pass) {
    return function(dispatch) {
        let postedContent = {
            fullName: name,
            email: email,
            handle: reg_handle,
            password: reg_pass
        };
        fetch('http://localhost:8080/register', {
            method: 'POST',
            body: JSON.stringify(postedContent),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed...");
            } else {
                console.log("Successfully registered, you can now login!");
                dispatch({
                    type: 'REGISTER',
                    payload: {
                        validStatus: "Successfully registered, you can now login",
                        errorStatus: "",
                        fullName: "",
                        email: "",
                        reg_handle: "",
                        reg_pass: ""
                    }
                });
                setTimeout(() => {
                    dispatch({
                        type: 'RESET_STATUS_TIMEOUT',
                        payload: ""
                    });
                }, 5000);
            }
        }).catch(err => {
            console.log(err);
        });
    }
}

export function login(handle, password) {
    return function(dispatch) {
        let postedContent = {
            handle: handle,
            password: password
        };
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify(postedContent),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 201 && res.status !== 409) {
                throw new Error("Failed...");
            }
            return res.json();
        }).then(data => {
            let errorStatus = "";
            let validStatus = "";
            let name = "";
            let email = "";
            let handle = "";
            let login_handle = "";
            let login_pass = "";
            let isLoggedIn = false;
            if (data.error) {
                errorStatus = "Wrong Username or Password";
            } else {
                name = data.creds.name;
                email = data.creds.email;
                handle = data.creds.handle;
                errorStatus = "";
                validStatus = "Successfully logged in";
                isLoggedIn = true;
            }
            dispatch({
                type: 'LOGIN',
                payload: {
                    errorStatus: errorStatus,
                    validStatus: validStatus,
                    usersName: name,
                    usersEmail: email,
                    usersHandle: handle,
                    login_handle: "",
                    login_pass: "",
                    isLoggedIn: isLoggedIn
                }
            });
            setTimeout(() => {
                dispatch({
                    type: 'RESET_STATUS_TIMEOUT',
                    payload: ""
                });
            }, 5000);
        }).catch(err => {
            console.log(err);
        });
    }
}

export function logout() {
    return {
        type: 'LOGOUT',
        payload: {
            isLoggedIn: false
        }
    };
}

export function getUsersPosts(handle) {
    return function(dispatch) {
        fetch(`http://localhost:8080/getUsersPosts${handle}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error("Failed...");
            }
            return res.json();
        }).then(data => {
            dispatch({
                type: 'GET_USERS_POSTS',
                payload: data.posts
            });
        }).catch(err => {
            console.log(err);
        });
    }
}

export function toggleRegLogin(showReg) {
    return {
        type: 'TOGGLE_REG_LOGIN',
        payload: {
            showReg: showReg,
            errorStatus: "",
            validStatus: ""
        }
    };
}

/* - - - - - - - - - - - - - - - VALIDATION _start - - - - - - - - - - - - - - - */
export function validateName(name) {
    let errorStatus = "";
    if (!name || name.indexOf(" ") < 0) {
        errorStatus = "You need to submit your first and last name.";
    } else {
        let names = [name.substr(0, name.indexOf(' ')), name.substr(name.indexOf(' ')+1)];
        if (names[0].length < 2 || names[1].length < 2) {
            errorStatus = "That does not look like your full name...";
        } else if (!names[0].match(/^[a-z]+$/i) || !names[1].match(/^[a-z\s]+$/i)) {
            errorStatus = "Your name should only contain letters...";
        }
    }
    return {
        type: 'VALIDATION',
        payload: {
            errorStatus: errorStatus,
            validStatus: ""
        }
    };
}

export function validateEmail(email) {
    let regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    let errorStatus = "";
    if (!email.match(regex)) {
        errorStatus = "Not a valid Email";
    }
    return {
        type: 'VALIDATION',
        payload: {
            errorStatus: errorStatus,
            validStatus: ""
        }
    };
}

export function validateHandle(handle) {
    return function(dispatch) {
        if (!handle || handle.length <= 3 || handle.length >= 16 || !handle.match(/^[a-z0-9]+$/i)) {
            dispatch({
                type: 'VALIDATION',
                payload: {
                    errorStatus: "Handle length must be > 3 and < 16 characters and can only contain letters and numbers",
                    validStatus: ""
                }
            });
        } else {
            fetch(`http://localhost:8080/validateHandle${handle}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                let errorStatus = "";
                let validStatus = "";
                if (res.status === 409) {
                    errorStatus = "Handle is already taken";
                } else if (res.status !== 200 && res.status !== 201) {
                    let errorStatus = "there was a problem, retry in a bit...";
                    throw new Error("Failed...");
                } else {
                    validStatus = "Valid Handle";
                }
                dispatch({
                    type: 'VALIDATION',
                    payload: {
                        errorStatus: errorStatus,
                        validStatus: validStatus
                    }
                });
            }).catch(err => {
                console.log(err);
            });
        }
    }
}

export function validatePassword(password) {
    let errorStatus = "";
    if (!password || password.length < 8) {
        errorStatus = "Password length must be > 7 characters";
    } else if (!password.match(/[0-9]/i)) {
        errorStatus = "Password must contain a number";
    } else if (!password.match(/[a-z]/)) {
        errorStatus = "Password must contain a lowercase letter";
    } else if (!password.match(/\@|\!|\#|\$|\%|\^/i)) {
        errorStatus = "Password must contain @, !, #, $, % or ^";
    } else if (!password.match(/[A-Z]/)) {
        errorStatus = "Password must contain an uppercase letter";
    }
    return {
        type: 'VALIDATION',
        payload: {
            errorStatus: errorStatus,
            validStatus: ""
        }
    };
}
/* - - - - - - - - - - - - - - - VALIDATION _end - - - - - - - - - - - - - - - */
