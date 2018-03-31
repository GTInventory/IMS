import React from "react";
import PropTypes from "prop-types";
require("../css/ConfigureEquipmentStyle.css");

let dao = require("../dao.js");

import {EquipmentSearchTool} from "./EquipmentSearchTool";
import {Modal} from "./Modal";
import {SearchableEquipmentTypeDropdown} from "./SearchableEquipmentTypeDropdown";


/*
    The configure attribute page allows for a user to add, edit, and delete
    equipment in the IMS. This component makes use of an EquipmentSearchTool
    that handles searching for existing equipment in the system.
 */
export class ConfigureEquipment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            visible: false,
            attributeType: "",
            attributeName: "",
            formContents: ""
        };
    }

    handleSelectChange(event) {
        this.setState({
            attributeType: event.target.value
        });
    }

    handleInputChange(event) {
        this.setState({
            attributeName: event.target.value
        });
    }

    handleCheckboxChange(event) {
        this.setState({
            visible: event.target.checked
        });
    }


    /*
        When search button is clicked, search database for input search string
        and create a form that allows for attributes values to be filled in.
     */
    searchHandler(event, searchString) {
        var ref = this;
        dao.searchEquipmentTypesByName(searchString, function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                var responseExists = response.length;

                if (response.success) {
                    var equipmentType = response.result;
                    var attributeList = response.result[0].attributes;
                    console.log(attributeList);
                    // Iterate through attribute list and create form contents, then
                    // save to form contents
                }
            }

        });
		event.preventDefault();
    }

    /*
        TODO:
        Checks that all attributes are filled in and creates the new equipment
     */
    handleSubmit(event) {

    }

    render() {
        return (
            <div>
                <div id="titleBlock">
                    <h1 id="configureEquipmentTitle">Add Equipment</h1>
                </div>
                <SearchableEquipmentTypeDropdown barStyle={styles.equipmentTypeSearchBar}
                    placeholder="Equipment Type Search" history={this.props.history}
                    searchHandler={this.searchHandler}/>
                <form id="addEquipmentForm">
                    {this.state.formContents}
                </form>
            </div>
        );
    }
}

ConfigureEquipment.propTypes = {
    history: PropTypes.object
};

const styles = {};

styles.equipmentTypeSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}

styles.equipmentSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
