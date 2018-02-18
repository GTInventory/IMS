/*
    The configure equipment types page allows for a user to add new equipment to the
    system. The ConfigureEquipmentType component makes use of an EquipmentTypeSearchTool
    that handles searching for existing equipment types in the system.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/configureEquipmentTypesStyle.css");

let dao = require("../dao.js");

import {SearchBar} from "./SearchBar";
import {EquipmentTypeSearchTool} from "./EquipmentTypeSearchTool";
import {EquipmentTypeAttributeSearchTool} from "./EquipmentTypeAttributeSearchTool";
import {Modal} from "./Modal";
//import {freeForm} from "./freeForm";

export class ConfigureEquipmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            //visible: false,
            //attributeType: "",
            equipmentTypeName: "",
        };
    }

    /* handleSelectChange(event) {
        this.setState({
            attributeType: event.target.value
        });
    } */

    handleInputChange(event) {
        this.setState({
            equipmentTypeName: event.target.value
        });
    }

    // handleCheckboxChange(event) {
    //     this.setState({
    //         visible: event.target.checked
    //     });
    // }

    handleSubmit(event) {
        //TODO: Check if equipment type already exists in database before adding

        console.log(this.state.visible);

        dao.createEquipmentType(this.state.equipmentTypeName, function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                console.log(response);
            }
        });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <SearchBar barStyle={styles.searchBar} placeholder="Search" history={this.props.history}/>
                <div id="titleBlock">
                    <h1 id="configureEquipmentTypesTitle">Configure Equipment Types</h1>
                    <button id="addEquipmentType" className="btn btn-secondary" type="button" data-toggle="modal" data-target="#addModal">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <Modal mtitle = "Add Equipment Type" handleSave={this.handleSubmit.bind(this)}>
                    <form>
                        <label>
                            Equipment Type Name:
                            <input name="enteraName" type="textarea" onChange={(event) => this.handleInputChange(event)} />
                        </label>
                        <br />



                        <br />
                        <EquipmentTypeAttributeSearchTool barStyle={styles.equipmentTypeAttributeSearchBar} placeholder="Attribute Search" history={this.props.history}/>

                        <br/>
                    </form>
                </Modal>
                <EquipmentTypeSearchTool barStyle={styles.equipmentTypeSearchBar} placeholder="Equipment Type Search" history={this.props.history}/>
                <br/>
            </div>
        );
    }
}

ConfigureEquipmentType.propTypes = {
    history: PropTypes.object
};

const styles = {};

styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '2em'
}

styles.equipmentTypeAttributeSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}

styles.equipmentTypeSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
