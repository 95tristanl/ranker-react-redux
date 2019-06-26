import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import HeaderNav from "./components/headerNav/headerNav.js"
import HomePage from "./pages/homePage/homePage.js"
import SubmitPage from "./pages/submitPage/submitPage.js"
import VotePage from "./pages/votePage/votePage.js"
import ChartPage from "./pages/chartPage/chartPage.js"

class App extends Component {
    render() {
        return(
            <BrowserRouter>
                <HeaderNav/>
                <Switch>
                    <Redirect from={"/"} to={"/home"} exact/>
                    <Route path={"/home"} component={HomePage} exact/>
                    <Route path={"/submit"} component={SubmitPage} exact/>
                    <Route path={"/vote"} component={VotePage} exact/>
                    <Route path={"/chart"} component={ChartPage} exact/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
