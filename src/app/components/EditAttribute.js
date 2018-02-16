import React from "react";
import PropTypes from "prop-types";
require("../css/EditAttributeStyle.css");

let dao = require("../dao.js");

/*
    The edit attribute page is dynamically created when a user clicks on an
    attribute from the attribute search tool. A user can also navigate to this
    page themselves. In this case, the page is created after finding a match
    in the database.
 */
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
            attributeType: "",
            attributeRequired: "",
            attributeUnique: "",
            attributePublic: ""
        };
    }

    editToggle(event) {
        if (this.state.editDisabled) {
            this.setState({
                editDisabled: false,
                editText: "Cancel"
            });
        } else {
            this.setState({
                editDisabled: true,
                editText: "Edit"
            });
        }
    }

    handle

    handleTypeChange(event) {
        this.state.setState({
            attributeType: event.target.value
        });
    }

    handleHelpChange(event){
        this.state.setState({
            attributeHelp: event.target.value
        });
    }

    handleRequiredChange(event){
        this.state.setState({
            attributeRequired: event.target.checked
        });
    }

    handleUniqueChange(event){
        this.state.setState({
            attributeUnique: event.target.checked
        });
    }

    handlePublicChange(event){
        this.state.setState({
            attributePublic: event.target.checked
        });
    }

    handleSave(event) {
        // TODO: Create a popup to verify user wants to save.

        var ref = this;
        dao.updateAttribute(this.state.attribute.id, this.state.attribute.name,
                            this.state.attributeType, this.state.attributePublic,
                            function(error, response) {
                                if (error != null) {
                                    console.log(error);
                                } else {
                                    ref.setState({
                                    db_response: response
                                    })
                                }
        });
    }

    handleDelete(event) {
        // TODO: Create a popup to tell user of consequences
    }

    render() {

        //TODO: if user chooses to go to website through URL directly,
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
                                    <input name="enteraName" type="textarea" placeholder={this.state.attribute.helpText} onChange={(event) => this.handleHelpChange(event)}/>
                                </label>
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                    Attribute Type:
                                    <select value={this.state.value} onChange={(event) => this.handleSelectChange(event)} required>
                                        <option value="">{this.state.attribute.type}</option>
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
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                  Required:
                                  <input name="visible" type="checkbox" defaultChecked={this.state.attribute.required} onChange={(event) => this.handleRequiredChange(event)}/>
                                </label>
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                  Unique:
                                  <input name="visible" type="checkbox" defaultChecked={this.state.attribute.unique} onChange={(event) => this.handleUniqueChange(event)} />
                                </label>
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                  Public:
                                  <input name="visible" type="checkbox" defaultChecked={this.state.attribute.public} onChange={(event) => this.handlePublicChange(event)} />
                                </label>
                            </fieldset>
                            <button type="button" className="btn btn-primary" onClick={(event) => this.handleSave(event)}>Save</button>
                            <button type="button" className="btn btn-danger" onClick={(event) => this.handleDelete(event)}>Delete</button>
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
