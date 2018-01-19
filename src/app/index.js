import React from  "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Home} from "./components/Home";
import {Header} from "./components/Header";
import {SearchResults} from "./components/SearchResults";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/search/:searchString" render={(...props)=><SearchResults {...props}/>}/>
                </div>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));
