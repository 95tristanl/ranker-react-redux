import React, { Component } from 'react';
import UsersPosts from "../../components/usersPosts/usersPosts.js";
import './homePage.css';
import { connect } from "react-redux";
import {
    updateForm,
    validateName,
    validateEmail,
    validateHandle,
    validatePassword,
    register,
    login,
    logout,
    getUsersPosts,
    toggleRegLogin
} from "../../actions/homeLogin.js";


class HomePage extends Component {
    componentDidMount() {
        if (this.props.homeLogin_R.isLoggedIn) {
            this.props.getUsersPosts(this.props.homeLogin_R.usersHandle);
        }
    }

    updateForm = (event) => {
        this.props.updateForm(event.target.name, event.target.value);
        switch(event.target.name) {
            case "fullName":
                this.props.validateName(event.target.value);
                break;
            case "email":
                this.props.validateEmail(event.target.value);
                break;
            case "reg_handle":
                this.props.validateHandle(event.target.value);
                break;
            case "reg_pass":
                this.props.validatePassword(event.target.value);
                break;
        }
    }

    onSubmit = () => {
        if (this.props.homeLogin_R.showReg && (this.props.homeLogin_R.errorStatus || !this.props.homeLogin_R.fullName ||
            !this.props.homeLogin_R.email || !this.props.homeLogin_R.reg_handle || !this.props.homeLogin_R.reg_pass) ) {
            this.props.updateForm("errorStatus", "Form is invalid");
        } else {
            if (this.props.homeLogin_R.showReg) {
                this.props.register(this.props.homeLogin_R.fullName, this.props.homeLogin_R.email,
                    this.props.homeLogin_R.reg_handle, this.props.homeLogin_R.reg_pass);
            } else {
                this.props.login(this.props.homeLogin_R.login_handle, this.props.homeLogin_R.login_pass);
                setTimeout(() => {
                    if (this.props.homeLogin_R.isLoggedIn) {
                        this.props.getUsersPosts(this.props.homeLogin_R.usersHandle);
                    }
                }, 1000);

            }
        }
    }

    render() {
        return (
            <div>
                <div id="errorStatus">{this.props.homeLogin_R.errorStatus}</div>
                <div id="validStatus">{this.props.homeLogin_R.validStatus}</div>

                <div className="content_container">
                    <div className="title_and_regLogin_btns">
                        {!this.props.homeLogin_R.isLoggedIn &&
                            <h1 className="homePage_title">Just A Simple React App</h1>
                        }
                        {!this.props.homeLogin_R.isLoggedIn &&
                            <div className="reg_login_btns">
                                <button id="reg_btn" onClick={() => this.props.toggleRegLogin(true)}>Register</button>
                                <button id="login_btn" onClick={() => this.props.toggleRegLogin(false)}>Login</button>
                                <button id="submit_btn" onClick={this.onSubmit}>Submit</button>
                            </div>
                        }
                    </div>

                    {this.props.homeLogin_R.isLoggedIn &&
                        <div id="profile_header">
                            <div id="profile_creds">
                                {"Name: " + this.props.homeLogin_R.usersName +
                                 ", Email: " + this.props.homeLogin_R.usersEmail +
                                 ", Handle: " + this.props.homeLogin_R.usersHandle}
                            </div>
                            <button id="logout_btn" onClick={() => this.props.logout()}>Logout</button>
                        </div>
                    }

                    {!this.props.homeLogin_R.isLoggedIn &&
                        <div className="homePage_forms">
                            {this.props.homeLogin_R.showReg &&
                                <div id="register_form">
                                        <div className="form_section">
                                            <label className="form_label" htmlFor="fullName">Full Name:</label>
                                            <input className="input_feild" name="fullName" type="text" id="fullName"
                                                onChange={this.updateForm} value={this.props.homeLogin_R.fullName}/>
                                        </div>
                                        <div className="form_section">
                                            <label className="form_label" htmlFor="email">Email:</label>
                                            <input className="input_feild" name="email" type="text" id="email"
                                                onChange={this.updateForm} value={this.props.homeLogin_R.email}/>
                                        </div>
                                        <div className="form_section">
                                            <label className="form_label" htmlFor="reg_handle">Handle:</label>
                                            <input className="input_feild" name="reg_handle" type="text" id="reg_handle"
                                                onChange={this.updateForm} value={this.props.homeLogin_R.reg_handle}/>
                                        </div>
                                        <div className="form_section">
                                            <label className="form_label" htmlFor="reg_pass">Password:</label>
                                            <input className="input_feild" name="reg_pass" type="password" id="reg_pass"
                                                onChange={this.updateForm} value={this.props.homeLogin_R.reg_pass}/>
                                        </div>
                                </div>
                            }

                            {!this.props.homeLogin_R.showReg &&
                                <div id="login_form">
                                        <div className="form_section">
                                            <label className="form_label" htmlFor="login_handle">Handle:</label>
                                            <input className="input_feild" name="login_handle" type="text" id="login_handle"
                                                onChange={this.updateForm} value={this.props.homeLogin_R.login_handle}/>
                                        </div>
                                        <div className="form_section">
                                            <label className="form_label" htmlFor="login_pass">Password:</label>
                                            <input className="input_feild" name="login_pass" type="password" id="login_pass"
                                                onChange={this.updateForm} value={this.props.homeLogin_R.login_pass}/>
                                        </div>
                                </div>
                            }
                        </div>
                    }
                </div>

                {this.props.homeLogin_R.isLoggedIn &&
                    <div>
                        {this.props.homeLogin_R.usersPosts.length === 0
                            ? <h3>You have not submitted any Content</h3>
                            : <UsersPosts posts={this.props.homeLogin_R.usersPosts}/>
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { homeLogin_R: state.homeLogin_R }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateForm: (key, value) => { dispatch(updateForm(key, value)); },
        validateName: (name) => { dispatch(validateName(name)); },
        validateEmail: (email) => { dispatch(validateEmail(email)); },
        validateHandle: (reg_handle) => { dispatch(validateHandle(reg_handle)); },
        validatePassword: (reg_pass) => { dispatch(validatePassword(reg_pass)); },
        register: (name, email, reg_handle, reg_pass) => { dispatch(register(name, email, reg_handle, reg_pass)); },
        login: (handle, password) => { dispatch(login(handle, password)); },
        logout: () => { dispatch(logout()); },
        getUsersPosts: (handle) => {dispatch(getUsersPosts(handle)); },
        toggleRegLogin: (showReg) => { dispatch(toggleRegLogin(showReg)); }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

/*
console.time('benchmark');
//any code here, this tests time it takes to run code
console.timeEnd('benchmark');
*/
