import React from  "react";
import { render } from "react-dom";
import {BrowserRouter as Router, Route, Link } from "react-router-dom";

import {Home} from "./components/Home";
import {Header} from "./components/Header";
import {SearchResults} from "./components/SearchResults";
import {ManageAttributes} from "./components/ManageAttributes";
import {PopUp} from "./components/Modal";
//maybe delete this .js form
//import {freeForm} from "./components/freeForm";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/search/:searchString" render={(...props)=><SearchResults {...props}/>}/>
                    <Route exact path="/configure/attributes" component={ManageAttributes}/>
                    <Route exact path="/configure" component={ManageAttributes}/>
                </div>
            </Router>
        );
    }
}

render(<App />, window.document.getElementById('app'));
