/*
    The manage attributes page allows for a user to add new attributes to the
    system. The ManageAttributes component makes use of an AttributeSearchTool
    that handles searching for existing attributes in the system.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/ManageAttributesStyle.css");

import {SearchBar} from "./SearchBar";
import {AttributeSearchTool} from "./AttributeSearchTool";

export class ManageAttributes extends React.Component {

    searchButtonClicked(event) {
        // Handle button click event
        event.preventDefault();
    }

    onHandleSearchChange(event) {

    }

    render() {
        return (
            <div>
                <SearchBar barStyle={styles.searchBar} placeholder="Search" history={this.props.history}/>
                <div id="titleBlock">
                    <h1 id="manageAttributesTitle">Manage Attributes</h1>
                    <button id="addAttribute" className="btn btn-secondary" type="button" onClick={(event) =>this.addAttributeButtonClicked(event)}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <AttributeSearchTool barStyle={styles.attributeSearchBar} placeholder="Attribute Search"/>
            </div>
        );
    }
}

ManageAttributes.propTypes = {
    history: PropTypes.object
};

const styles = {};

styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '2em'
}

styles.attributeSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
