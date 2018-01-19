import React from "react";
import PropTypes from "prop-types";
require("../css/HomeStyle.css");

import {SearchBar} from "./SearchBar";
import {AdvancedSearchOptions} from "./AdvancedSearchOptions";

export class Home extends React.Component {
    render() {
        return (
            <div>
                <h1 id="imsTitle">Inventory Management System</h1>
                <SearchBar barStyle={styles.searchBar} placeholder="Search" history={this.props.history}/>
            </div>
        );
    }
}

const styles = {};
styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
