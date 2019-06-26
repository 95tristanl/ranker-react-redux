import React, { Component } from 'react';
import "./submitPage.css";
import { connect } from "react-redux";
import { changeContent, submitContent } from "../../actions/submitContent.js";

class SubmitPage extends Component {
    updateForm = (event) => {
        this.props.changeContent(event.target.value);
    }

    render() {
        return (
            <div>
                { this.props.homeLogin_R.isLoggedIn &&
                    <div className="submit_form">
                        <div className="form_block">
                            <div className="form_section">
                                <label className="form_label_2" htmlFor="form_content">Content:</label>
                                <input className="input_2" name="content" type="text" id="form_content"
                                    onChange={this.updateForm} value={this.props.submitContent_R.formContent}/>
                            </div>
                        </div>

                        <div className="btns">
                            <button className="btn1"onClick={
                                () => this.props.submitContent(this.props.homeLogin_R.usersHandle, this.props.submitContent_R.formContent)
                            }>Submit</button>
                        </div>
                    </div>
                }
                {!this.props.homeLogin_R.isLoggedIn && <div>Log in to Submit content</div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        submitContent_R: state.submitContent_R,
        homeLogin_R: state.homeLogin_R
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeContent: (content) => { dispatch(changeContent(content)); },
        submitContent: (usersHandle, content) => { dispatch(submitContent(usersHandle, content)); }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitPage);
