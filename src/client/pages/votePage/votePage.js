import React, { Component } from 'react';
import VoteList from '../../components/voteList/voteList.js';
import './votePage.css';
import { connect } from "react-redux";
import { fetchVoteContent, castVote } from "../../actions/voteContent.js";

class VotePage extends Component {
    componentDidMount() {
        if (this.props.homeLogin_R.isLoggedIn) {
            this.props.fetchVoteContent(this.props.homeLogin_R.usersHandle, this.props.voteContent_R.alreadyVoted);
        }
    }

    castVoteFunc = (vote, index) => {
        this.props.castVote(
            vote,
            index,
            this.props.voteContent_R.voteContent,
            this.props.voteContent_R.hasVotedBoolArray,
            this.props.voteContent_R.timesVoted,
            this.props.voteContent_R.alreadyVoted
        );
    }

    render() {
        return (
            <div>
                { this.props.homeLogin_R.isLoggedIn &&
                    <VoteList
                        voteFunc={this.castVoteFunc}
                        content_V={this.props.voteContent_R.voteContent}
                        votes={this.props.voteContent_R.hasVotedBoolArray}
                    />
                }
                {!this.props.homeLogin_R.isLoggedIn && <div>Log in to Vote on content</div>}
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        voteContent_R: state.voteContent_R,
        homeLogin_R: state.homeLogin_R
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchVoteContent: (usersHandle, alreadyVoted) => {
            dispatch(fetchVoteContent(usersHandle, alreadyVoted));
        },
        castVote: (vote, voteContentIndex, voteContent, hasVotedBoolArray, timesVoted, alreadyVoted) => {
            dispatch(castVote(vote, voteContentIndex, voteContent, hasVotedBoolArray, timesVoted, alreadyVoted));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(VotePage);
