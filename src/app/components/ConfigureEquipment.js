import React from "react";
import PropTypes from "prop-types";
require("../css/ConfigureEquipmentStyle.css");

let dao = require("../dao.js");

import {SearchBar} from "./SearchBar";
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
            attributeName: ""
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

    handleSubmit(event) {
        //TODO: Check if equipment already exists in database before adding
        /*
        dao.createAttribute(this.state.attributeName, this.state.attributeType, this.state.visible, function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                console.log(response);
            }
        });
        */
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <SearchBar barStyle={styles.searchBar} placeholder="Search" history={this.props.history}/>
                <div id="titleBlock">
                    <h1 id="configureEquipmentTitle">Add Equipment</h1>
                </div>
                <form id="addEquipmentForm">
                            <label>
                            Equipment Name:
                                    <input name="enteraName" type="textarea" onChange={(event) => this.handleInputChange(event)} />
                            </label>
                            <br />
                            <Dropdown id="EquipmentTypeDropDown">
                            <SearchableEquipmentTypeDropdown bs="menu">
                                <MenuItem eventKey="1">Red</MenuItem>
                                <MenuItem eventKey="2">Blue</MenuItem>
                                <MenuItem eventKey="3" active>
                                    Orange
                                </MenuItem>
                                <MenuItem eventKey="1">Red-Orange</MenuItem>
                            </SearchableEquipmentTypeDropdown>
                            </Dropdown>
                    </form>
            </div>
        );
    }
}

ConfigureEquipment.propTypes = {
    history: PropTypes.object
};

const styles = {};

styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '2em'
}

styles.equipmentSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
