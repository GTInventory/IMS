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
        var equipmentTypeNameString = this.props[0].match.params.equipmentTypeName;
        var equip = this.props[0].history.location.state;
        this.state = {
            editDisabled: true,
            equipmentType: equip,
            editText: "Edit",
            equipmentTypeHelp: "",
            items: [],
            // attributeType: "",
            // attributeRequired: "",
            // attributeUnique: "",
            // attributePublic: ""
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
        var newList = this.state.items.slice();
        newList.push(attribute);
        this.setState({items:newList});
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({items: arrayMove(this.state.items, oldIndex, newIndex)});
    };

    // handleRequiredChange(event){
    //     this.setState({
    //         attributeRequired: event.target.checked
    //     });
    // }

    // handleUniqueChange(event){
    //     this.setState({
    //         attributeUnique: event.target.checked
    //     });
    // }

    // handlePublicChange(event){
    //     this.setState({
    //         attributePublic: event.target.checked
    //     });
    // } 

    handleSave(event) {
        // TODO: Create a popup to verify user wants to save.

        /* var ref = this;
        dao.updateAttribute(this.state.attribute.id, this.state.attribute.name,
                            this.state.attributeType, this.state.attributePublic,
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

    render() {

        //TODO: if user chooses to go to website through URL directly,
        // search for equipment type name from URL bar.
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
                                    Help Text:
                                    <input name="enteraName" type="textarea" placeholder={this.state.equipmentType.helpText} onChange={(event) => this.handleHelpChange(event)}/>
                                </label>
                            </fieldset>
                            <br />
                            <fieldset disabled={this.state.editDisabled}>
                                <label id="editFormLabel">
                                    <EquipmentTypeAttributeList items={this.state.items} handleOnSortEnd={this.onSortEnd}/>
                                </label>
                            </fieldset>
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
