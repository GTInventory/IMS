import React from "react";
import {Link} from "react-router-dom";
import {SearchBar} from "./SearchBar";

require("../css/HeaderStyle.css");

export class Header extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-default navbar-static-top">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <li><Link to={"/"}><span className="glyphicon glyphicon-home" id="navItem"></span></Link></li>
                        <li><Link to={"/"} id="navItem">Search</Link></li>
                        <li className="dropdown"><a id="navItem" className="dropdown-toggle navItem" data-toggle="dropdown" href="#">Configure<span className="caret"></span></a>
                          <ul className="dropdown-menu">
                            <li><Link to={"/configure/attributes"}>Attributes</Link></li>
                            <li><Link to={"/configure/equipmentTypes"}>Equipment Types</Link></li>
                          </ul>
                        </li>
                        <li><Link to={"/configure/equipment"} id="navItem">Add Equipment</Link></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                      <li><SearchBar barStyle={styles.searchBar}
                                    placeholder="Search"
                                    history={this.props.history}
                                    inputSpecialClass="navSearch"/>
                      </li>
                      <li><Link to={"/Logout"} id="navItem"><span className="glyphicon glyphicon-log-out" id="navItem"></span> Logout</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
};

const styles = {};

styles.searchBar = {
    paddingTop: '0.5em',
    margin: '0 auto',
    width: '25em'
}
