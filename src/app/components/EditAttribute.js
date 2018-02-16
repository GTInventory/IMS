import React from "react";
import PropTypes from "prop-types";
require("../css/EditAttributeStyle.css");

let dao = require("../dao.js");

export class EditAttribute extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editDisabled: true,
            attributeType: "",
        };
    }

    editButtonClicked(event) {
        this.setState({
            editDisabled: false
        });
    }

    handleAttributeChange(event) {
        
    }

    render() {
        var attributeNameString = this.props[0].match.params.attributeName;
        var attribute = this.props[0].history.location.state;

        //TODO: if user chooses to go to website through URL directly,
        // search for attribute name from URL bar.
        return (
            <div>
                <div id="titleBlock">
                    <h1 id="EditAttributeTitle">{attribute.name}</h1>
                    <button id="editAttribute" className="btn btn-secondary" type="button" onClick={(event) =>this.editButtonClicked(event)}>
                        Edit
                    </button>
                </div>
                <div id="outerFormDiv">
                    <div id="innerFormDiv">
                        <form id="editForm">
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                    Help Text:
                                    <input name="enteraName" type="textarea" placeholder={attribute.helpText} onChange={(event) => this.handleAttributeChange(event)}/>
                                </label>
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                    Attribute Type:
                                    <select value={this.state.value} onChange={(event) => this.handleAttributeChange(event)} required>
                                        <option value="">{attribute.type}</option>
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
                                  <input name="visible" type="checkbox" checked={attribute.required} onChange={(event) => this.handleAttributeChange(event)}/>
                                </label>
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                  Unique:
                                  <input name="visible" type="checkbox" checked={attribute.unique} onChange={(event) => this.handleAttributeChange(event)} />
                                </label>
                            </fieldset>
                            <br/>
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                  Public:
                                  <input name="visible" type="checkbox" checked={attribute.public} onChange={(event) => this.handleAttributeChange(event)} />
                                </label>
                            </fieldset>
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

const styles = {};
styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '2em'
}
