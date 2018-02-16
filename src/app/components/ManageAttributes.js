/*
    The manage attributes page allows for a user to add new attributes to the
    system. The ManageAttributes component makes use of an AttributeSearchTool
    that handles searching for existing attributes in the system.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/ManageAttributesStyle.css");

let dao = require("../dao.js");

import {SearchBar} from "./SearchBar";
import {AttributeSearchTool} from "./AttributeSearchTool";
import {Modal} from "./Modal";
//import {freeForm} from "./freeForm";

export class ManageAttributes extends React.Component {
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
        })
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
                    <h1 id="manageAttributesTitle">Manage Attributes</h1>
                    <button id="addAttribute" className="btn btn-secondary" type="button" data-toggle="modal" data-target="#addModal">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <Modal mtitle = "Add Attribute" handleSave={this.handleSubmit.bind(this)}>
                    <form>
                        <label>
                            Attribute Name:
                            <input name="enteraName" type="textarea" onChange={(event) => this.handleInputChange(event)} />
                        </label>
                        <br />
                        <label>
                            Attribute Type:
                            <select value={this.state.value} onChange={(event) => this.handleSelectChange(event)}>
                            <option value="aType">Select an Attribute Type</option>
                            <option value="Boolean">Boolean</option>
                            <option value="Currency">Currency</option>
                            <option value="Date/Time">Date/Time</option>
                            <option value="Enum">Enumerated set of options</option>
                            <option value="Image">Image</option>
                            <option value="Integer">Integer</option>
                            <option value="String">String</option>
                            <option value="Textbox">Textbox</option>
                            </select>
                        </label>
                        <br />
                        <label>
                          Visible to Renter:
                          <input name="visible" type="checkbox" onChange={(event) => this.handleCheckboxChange(event)} />
                        </label>
                        <br/>
                    </form>
                </Modal>
                <AttributeSearchTool barStyle={styles.attributeSearchBar} placeholder="Attribute Search" history={this.props.history}/>
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
