import React from "react";
import {Link} from "react-router-dom";
require("../css/HeaderStyle.css");

export const Header = () => {
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
                  <li><Link to={"/Logout"} id="navItem"><span className="glyphicon glyphicon-log-out" id="navItem"></span> Logout</Link></li>
                </ul>
            </div>
        </nav>
    );
};
