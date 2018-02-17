/*
    The manage attributes page allows for a user to add new attributes to the
    system. The ManageAttributes component makes use of an AttributeSearchTool
    that handles searching for existing attributes in the system.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/configureEquipmentTypesStyle.css");

let dao = require("../dao.js");

import {SearchBar} from "./SearchBar";
import {AttributeSearchTool} from "./AttributeSearchTool";
import {Modal} from "./Modal";
//import {freeForm} from "./freeForm";

export class ConfigureEquipmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            //visible: false,
            //attributeType: "",
            equipmentTypeName: ""
        };
    }

    handleSelectChange(event) {
        this.setState({
            attributeType: event.target.value
        });
    }

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
        //TODO: Check if attribute already exists in database before adding

        console.log(this.state.visible);

        dao.createAttribute(this.state.attributeName, this.state.attributeType, this.state.visible, function(error, response) {
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
                        <AttributeSearchTool barStyle={styles.attributeSearchBar} placeholder="Attribute Search" history={this.props.history}/>

                        <br/>
                    </form>
                </Modal>
                <AttributeSearchTool barStyle={styles.attributeSearchBar} placeholder="Equipment Type Search" history={this.props.history}/>
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

styles.attributeSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
