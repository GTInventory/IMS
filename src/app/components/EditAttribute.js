/*
    The edit attribute page is dynamically created when a user clicks on an
    attribute from the attribute search tool. A user can also navigate to this
    page themselves. In this case, the page is created after finding a match
    in the database.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/EditAttributeStyle.css");

let dao = require("../dao.js");

export class EditAttribute extends React.Component {
    constructor(props) {
        super(props);
        var attributeNameString = this.props[0].match.params.attributeName;
        var attr = this.props[0].history.location.state;
        this.state = {
            editDisabled: true,
            attribute: attr,
            editText: "Edit",
            attributeHelp: "",
            attributeType: attr.type,
            attributeUniqueGlobally: "",
            attributePublic: "",
            regex: ""
        };
    }

    editToggle(event) {
        if (this.state.editDisabled) {
        	// Change to Edit mode
            this.setState({
                editDisabled: false,
                editText: "Cancel"
            });
        } else {
        	// Cancel Edit mode
            this.setState({
                editDisabled: true,
                editText: "Edit"
            });
            this.resetForm();
        }
    }

    resetForm() {
    	this.refs.helpText.value = this.state.attribute.helpText;
    	this.refs.regex.value = this.state.attribute.regex;
    	// Show/hide regex field
    	if ((this.refs.aType.value = this.state.attribute.type) == "String") {
    		regexDiv.style.display = "";
    	} else {
            regexDiv.style.display = "none";
    	}
    	this.refs.uniqueGlobally.checked = this.state.attribute.uniqueGlobally;
    	this.refs.visible.checked = this.state.attribute.public;
    }

    handleTypeChange(event) {
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

    handleRegexChange(event) {
        this.setState({
            regex: event.target.value
        });
    }

    handleHelpChange(event){
        this.setState({
            attributeHelp: event.target.value
        });
    }

    handleUniqueChange(event){
        this.setState({
            attributeUniqueGlobally: event.target.checked
        });
    }

    handlePublicChange(event){
        this.setState({
            attributePublic: event.target.checked
        });
    }

    handleSave(event) {
        // TODO: Create a popup to verify user wants to save.

        var ref = this;
        dao.updateAttribute(this.state.attribute.id, this.state.attribute.name,
        	this.state.attributeType, this.state.attributePublic,
        	this.state.attributeUniqueGlobally, this.state.regex, this.state.attributeHelp, //TODO: pick up here
                            function(error, response) {
                                if (error != null) {
                                    console.log(error);
                                } else {
                                    ref.setState({
                                        db_response: response
                                    });
                                }
        });
    }

    handleDelete(event) {
        // TODO: Create a popup to tell user of consequences
    }

    handleBack(event) {
        window.location = '/configure/attributes';
    }

    render() {
    	// To initially show/hide regex field based on attribute type
    	let regexStyle = null;
    	if (this.state.attributeType == "String") {
            regexStyle = {display:""};
        } else {
            regexStyle = {display:"none"};
        }

        // TODO: if user chooses to go to website through URL directly,
        // search for attribute name from URL bar.
        return (
            <div>
                <div id="titleBlock">
                    <h1 id="EditAttributeTitle">{this.state.attribute.name}</h1>
                    <button id="editAttribute" className="btn btn-secondary" type="button" onClick={(event) =>this.editToggle(event)}>
                        {this.state.editText}
                    </button>
                </div>
                <div id="outerFormDiv">
                    <div id="innerFormDiv">
                        <form id="editForm">
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                    Help Text:
                                    <input name="helpText" ref="helpText" type="textarea" defaultValue={this.state.attribute.helpText} onChange={(event) => this.handleHelpChange(event)}/>
                                </label>
                            	<br/>
                                <label id="editFormLabel">
                                    Attribute Type:
                                    <select defaultValue={this.state.attributeType} ref="aType" onChange={(event) => this.handleTypeChange(event)} required>
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
                            	<div id="regexDiv" style={regexStyle} >
	                                <label>
	                                    Regex:
	                                    <input name="regex" ref="regex" type="textarea" defaultValue={this.state.attribute.regex} onChange={(event) => this.handleRegexChange(event)} />
	                                </label>
                            	</div>
                                <label id="editFormLabel">
                                  Globally Unique:
                                  <input name="uniqueGlobally" ref="uniqueGlobally" type="checkbox" defaultChecked={this.state.attribute.uniqueGlobally} onChange={(event) => this.handleUniqueChange(event)} />
                                </label>
                            	<br/>
                                <label id="editFormLabel">
                                  Visible to Renter:
                                  <input name="visible" ref="visible" type="checkbox" defaultChecked={this.state.attribute.public} onChange={(event) => this.handlePublicChange(event)} />
                                </label>
                        	</fieldset>
                            <button type="button" className="btn btn-primary" onClick={(event) => this.handleSave(event)}>Save</button>
                            <button type="button" className="btn btn-danger" onClick={(event) => this.handleDelete(event)}>Delete</button>
                            <button type="button" className="btn btn-secondary" onClick={(event) => this.handleBack(event)}>Back</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

EditAttribute.propTypes = {
    attributeNameString: PropTypes.string,
    history: PropTypes.object
};
