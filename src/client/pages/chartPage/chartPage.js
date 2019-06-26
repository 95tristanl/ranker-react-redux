import React, { Component } from 'react';
import RankList from '../../components/rankList/rankList.js';
import './chartPage.css';
import { connect } from "react-redux";
import { fetchRankedChart } from "../../actions/rankedChart.js";


class ChartPage extends Component {
    componentDidMount() {
        this.props.fetchRankedChart();
    }

    render() {
        return (
            <div>
                <RankList content_R={this.props.rankedChart_R.rankedContent}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        rankedChart_R: state.rankedChart_R,
        voteContent_R: state.voteContent_R
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRankedChart: (timesVoted) => { dispatch(fetchRankedChart(timesVoted)); }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartPage);
