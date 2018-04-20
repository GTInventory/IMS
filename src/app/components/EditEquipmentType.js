import React from "react";
import PropTypes from "prop-types";
import {EquipmentTypeAttributeList} from "./EquipmentTypeAttributeList";
import {EquipmentTypeAttributeSearchTool} from "./EquipmentTypeAttributeSearchTool";
import {EquipmentTypeSearchTool} from "./EquipmentTypeSearchTool";
import {arrayMove} from  'react-sortable-hoc';
require("../css/EditAttributeStyle.css");

let dao = require("../dao.js");

/*
    The edit equipment type page is dynamically created when a user clicks on an
    equipment type from the equipment type search tool. A user can also navigate to this
    page themselves. In this case, the page is created after finding a match
    in the database.
 */
export class EditEquipmentType extends React.Component {
    constructor(props) {
        super(props);
        let equipmentTypeNameString = this.props[0].match.params.equipmentTypeName;
        let equip = JSON.parse(JSON.stringify(this.props[0].history.location.state));
        this.state = {
            editDisabled: true,
            editText: "Edit",
            equipmentType: equip,
            equipmentTypeHelp: "",
            items: []
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
            this.resetForm();
        }
    }

    //  handleTypeChange(event) {
    //     this.setState({
    //         attributeType: event.target.value
    //     });
    // }

    handleHelpChange(event){
        this.setState({
            equipmentTypeHelp: event.target.value
        });
    }

    handleAddAttribute(event, attribute) {
        let newList = this.state.items.slice();
        newList.push(attribute);
        this.setState({items:newList});
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({items: arrayMove(this.state.items, oldIndex, newIndex)});
    };

    resetForm() {
        location.reload();
    }

    handleSave(event) {
        // TODO: Create a popup to verify user wants to save.

        /* var ref = this;
        dao.updateEquipmentType(this.state.equipmentType.id, this.state.attribute.name,
                            this.state.items,
                            function(error, response) {
                                if (error != null) {
                                    console.log(error);
                                } else {
                                    console.log("hi");
                                    ref.setState({
                                    db_response: response
                                    })
                                }
        }); */
    }

    handleDelete(event) {
        // TODO: Create a popup to tell user of consequences
    }

    handleBack(event) {
        window.location = '/configure/equipmentTypes';
    }

    handleCheckboxChangeUnique(attributePos, event) {
        let equipmentType = this.state.equipmentType;

        equipmentType.attributes[attributePos].attributeType.uniqueForType = event.target.checked;

        this.setState({
            equipmentType: equipmentType
        });
    }

    handleSelectChange(attributePos, event) {
        let equipmentType = this.state.equipmentType;
        equipmentType.attributes[attributePos].attributeType.required = event.target.value;

        this.setState({
            equipmentType: equipmentType
        });
    }

    populateTable() {
        let attributes = this.state.equipmentType.attributes;

        let attrRows = [];

        for (let i = 0; i < attributes.length; i++) {

            attrRows.push(<tr key={attributes[i].id}>
                <td>{attributes[i].name}</td>
                <td>{attributes[i].type}</td>
                <td>
                    <label>
                        <select value={attributes[i].attributeType.required} onChange={this.handleSelectChange.bind(this, i)}>
                            <option value="Required">Required</option>
                            <option value="Suggested">Suggested</option>
                            <option value="Optional">Optional</option>
                        </select>
                    </label>
                </td>
                <td>
                    <label>
                        <input name="required" type="checkbox" defaultChecked={attributes[i].attributeType.uniqueForType} onChange={this.handleCheckboxChangeUnique.bind(this, i)}/>
                    </label>
                </td>
            </tr>);
        }

        this.state.items = attrRows
    }

    render() {

        //TODO: if user chooses to go to website through URL directly,
        // search for equipment type name from URL bar.

        this.populateTable();

        return (
            <div>
                <div id="titleBlock">
                    <h1 id="EditEquipmentTypeTitle">{this.state.equipmentType.name}</h1>
                    <button id="editEquipmentType" className="btn btn-secondary" type="button" onClick={(event) =>this.editToggle(event)}>
                        {this.state.editText}
                    </button>
                </div>
                <div id="outerFormDiv">
                    <div id="innerFormDiv">
                        <form id="editForm">
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                    <div id={this.state.tableState} className="hiddenTableDiv" style={{width: '40em'}}>
                                        <table className="table table-hover">
                                            <thead>
                                            <tr>
                                                <th>Attribute Name</th>
                                                <th>Type</th>
                                                <th>Required Level</th>
                                                <th>Unique for Type</th>
                                            </tr>
                                            </thead>
                                            <tbody>{this.state.items}</tbody>
                                        </table>
                                    </div>
                                </label>
                            </fieldset>
                            <br />
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                </label>
                            </fieldset>
                            <button type="button" className="btn btn-primary" style={!this.state.editDisabled ? {display:""} : {display:"none"}} onClick={(event) => this.handleSave(event)}>Save</button>
                            <button type="button" className="btn btn-danger" style={!this.state.editDisabled ? {display:""} : {display:"none"}} onClick={(event) => this.handleDelete(event)}>Delete</button>
                            <button type="button" className="btn btn-secondary" style={this.state.editDisabled ? {display:""} : {display:"none"}} onClick={(event) => this.handleBack(event)}>Back</button>
                        </form>
                    </div>
                </div>

            </div>

        );
    }
}

EditEquipmentType.propTypes = {
    equipmentTypeNameString: PropTypes.string,
    history: PropTypes.object
};

const styles = {};

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
