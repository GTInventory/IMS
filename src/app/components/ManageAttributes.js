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
import {PopUp} from "./PopUp";
//import {freeForm} from "./freeForm";

export class ManageAttributes extends React.Component {

    searchButtonClicked(event) {
        // Handle button click event
        event.preventDefault();
    }

    onHandleSearchChange(event) {

    }

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            enteraName: "Enter a name for this attribute",
            selectaType: "Select a Type",
            visible: false

        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === "checkbox" ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name] : value
        });
    }

    handleSubmit(event) {
        alert("Attribute: " + this.state.aName + " was created");
        event.preventDefault();
    }

    toggleAddAttribute = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }



    render() {
        return (
            <div>
                <SearchBar barStyle={styles.searchBar} placeholder="Search" history={this.props.history}/>
                <div id="titleBlock">
                    <h1 id="manageAttributesTitle">Manage Attributes</h1>
                    <button id="addAttribute" className="btn btn-secondary" type="button" onClick={this.toggleAddAttribute}>
                        <span className="glyphicon glyphicon-plus"></span>
                    </button>
                    <PopUp show = {this.state.isOpen}
                        onClose={this.toggleAddAttribute}>
                        <form onSubmit={this.handleSubmit}>
                            <h1> Add an Attribute </h1>
                            <label>
                                Attribute Name:
                                <input
                                    name="enteraName"
                                    type="textarea"
                                    named={this.state.enteraName} 
                                    onChange={this.handleInputChange} />
                            </label>
                            <br />
                            <label>
                                Attribute Type:
                                <select value={this.state.value} onChange={this.handleChange}>
                                <option value="aType">Select an Attribute Type</option>
                                <option value="boolean">Boolean</option>
                                <option value="currency">Currency</option>
                                <option value="Date/Time">Date/Time</option>
                                <option value="Enum">Enumerated set of options</option>
                                <option value="image">Image</option>
                                <option value="integer">Integer</option>
                                <option value="string">String</option>
                                <option value="textbox">Textbox</option>
                            </select>
                            </label> 
                            <br />
                            <label>
                              Visible to Renter:
                              <input
                                name="visible"
                                type="checkbox"
                                checked={this.state.visible}
                                onChange={this.handleInputChange} />
                            </label>
                            <br />
                            <input type="submit" value="Submit" />
                            <br />
                        </form>
                    </PopUp>
                </div>
                <AttributeSearchTool baSrtyle={styles.attributeSearchBar} placeholder="Attribute Search"/>
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
