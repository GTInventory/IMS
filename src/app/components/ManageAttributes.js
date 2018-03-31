/*
    The manage attributes page allows for a user to add new attributes to the
    system and to look up existing attributes in the system.
    The ManageAttributes component makes use of an AttributeSearchTool
    that handles searching for existing attributes in the system. It also makes use
    of the modal component to create a popup for adding new attributes to the system.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/ManageAttributesStyle.css");

let dao = require("../dao.js");

import {AttributeSearchTool} from "./AttributeSearchTool";
import {Modal} from "./Modal";



const initialState = {
    isOpen: false,
    uniqueGlobally: false,
    visible: false,
    attributeType: "aType",
    attributeName: "",
    regex: "",
    placeholder: ""
};

export class ManageAttributes extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleSelectChange(event) {
        this.setState({
            attributeType: event.target.value
        });
        // Show/hide regex field based on attributeType
        if (event.target.value == "String") {
            regexDiv.style.display = "";
        } else {
            regexDiv.style.display = "none";
        }
    }

    handleInputChange(event) {
        this.setState({
            attributeName: event.target.value
        });
    }
    // Saves if the 'Visible' checkbox gets marked
    handleCheckboxChangeVisible(event) {
        this.setState({
            visible: event.target.checked
        });
    }

    // Saves if the 'Unique' checkbox gets marked
    handleCheckboxChangeUnique(event) {
        this.setState({
            uniqueGlobally: event.target.checked
        });
    }

    handleRegexChange(event) {
        this.setState({
            regex: event.target.value
        });
    }

    handlePlaceholderChange(event) {
        this.setState({
            placeholder: event.target.value
        });
    }

    //Resets the popup form after a save is completed or the popup gets closed
    resetForm() {
        this.refs.aName.value = "";
        this.refs.regex.value = "";
        this.refs.placeholder.value = "";
        this.refs.uniqueGlobally.checked = "";
        this.refs.visible.checked = "";
        this.setState(initialState);
        regexDiv.style.display = "none";
    }

    handleSubmit(event) {
        //TODO: Check if attribute already exists in database before adding

        console.log(this.state.visible);

        // If not string, don't submit regex
        if (this.state.attributeType != "String") {
            this.setState({
                regex: ""
            });
        }

        dao.createAttribute(this.state.attributeName, this.state.attributeType,
            this.state.visible, this.state.uniqueGlobally, this.state.regex,
            this.state.placeholder, function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                console.log(response);
            }
        });

        this.resetForm();

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div id="titleBlock">
                    <h1 id="manageAttributesTitle">Configure Attributes</h1>
                    <button id="addAttribute" className="btn btn-secondary" type="button" data-toggle="modal" data-target="#addModal">
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                </div>
                <Modal mtitle = "Add Attribute" handleSave={this.handleSubmit.bind(this)} handleClose={this.resetForm.bind(this)} >
                    <form>
                        <label>
                            Attribute Name:
                            <input name="aName" ref="aName" type="textarea" onChange={(event) => this.handleInputChange(event)} />
                        </label>
                        <br />
                        <label>
                            Attribute Type:
                            <select value={this.state.attributeType} onChange={(event) => this.handleSelectChange(event)}>
                            <option value="aType" disabled hidden>Select an Attribute Type</option>
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
                        <br/>
                        <div id="regexDiv" style={{display:"none"}} >
                            <label>
                                Regex (optional):
                                <input name="regex" ref="regex" type="textarea" onChange={(event) => this.handleRegexChange(event)} />
                            </label>
                        </div>
                        <label>
                            Placeholder:
                            <input name="placeholder" ref="placeholder" type="textarea" onChange={(event) => this.handlePlaceholderChange(event)} />
                        </label>
                        <br/>
                        <label>
                          Globally Unique:
                          <input name="uniqueGlobally" ref="uniqueGlobally" type="checkbox" onChange={(event) => this.handleCheckboxChangeUnique(event)} />
                        </label>
                        <br/>
                        <label>
                          Visible to Renter:
                          <input name="visible" ref="visible" type="checkbox" onChange={(event) => this.handleCheckboxChangeVisible(event)} />
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

styles.attributeSearchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '5em'
}
