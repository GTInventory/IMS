 /*
    The configure equipment types page allows for a user to add new equipment to the
    system. The ConfigureEquipmentType component makes use of an EquipmentTypeSearchTool
    that handles searching for existing equipment types in the system.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/ConfigureEquipmentTypesStyle.css");

let dao = require("../dao.js");

import {SearchBar} from "./SearchBar";
import {EquipmentTypeAttributeList} from "./EquipmentTypeAttributeList";
import {EquipmentTypeAttributeSearchTool} from "./EquipmentTypeAttributeSearchTool";
import {EquipmentTypeSearchTool} from "./EquipmentTypeSearchTool";
import {Modal} from "./Modal";
import {arrayMove} from  'react-sortable-hoc';
//import {freeForm} from "./freeForm";

const initialState = {
    equipmentTypeName: "",
    items: [],
    attributeData: {} //Key-val pair of attribute id and attribute data
};

const searchToolInitial = {
    tableState: "asHidden",
    searchString: "",
    db_response: "",
    resultsTable: ""
};

export class ConfigureEquipmentType extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialState;
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

        // console.log(this.state.equipmentTypeName);
        // console.log(this.state.attributeData);

        let attributeList = [];
        let nameAttribute = "";

        for(let i in this.state.attributeData) {
            attributeList.push({
                "id": i,
                "required": this.state.attributeData[i].required,
                "uniqueForType": this.state.attributeData[i].uniqueForType
            });

            if (this.state.attributeData[i].required) {
                nameAttribute = i;
            }
        }

        dao.createEquipmentType(this.state.equipmentTypeName, attributeList, nameAttribute, function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                console.log(response);
            }
        });

        this.resetForm();

        event.preventDefault();
    }

    resetForm() {
        // this.refs.searchTool.setState(searchToolInitial);
        this.refs.typeName.value = "";
        this.setState({
            equipmentTypeName: "",
            items: [],
            attributeData: {}
        });
    }

    handleCheckboxChangeUnique(attribute, event) {
        var attrData = this.state.attributeData;
        attrData[attribute.id].uniqueForType = event.target.checked;

        this.setState({
            attributeDate: attrData
        });
    }

    handleSelectChange(attribute, event) {
        var attrData = this.state.attributeData;
        attrData[attribute.id].required = event.target.value;

        this.setState({
            attributeDate: attrData
        });
    }

    handleAddAttribute(event, attribute) {
        let attributeObj = {
            "id": attribute.id,
            "name": attribute.name,
            "type": attribute.type,
            "required": "Required",
            "uniqueForType": false
        };

        let attrData = this.state.attributeData;
        attrData[attributeObj.id] = attributeObj;

        this.setState({
            attributeData: attrData
        });

        this.state.items.push(<tr key={attributeObj.id}>
            <td>{attributeObj.name}</td>
            <td>{attributeObj.type}</td>
            <td>
                <label>
                    <select onChange={this.handleSelectChange.bind(this, attributeObj)}>
                        <option value="Required">Required</option>
                        <option value="Suggested">Suggested</option>
                        <option value="Optional">Optional</option>
                    </select>
                </label>
            </td>
            <td>
                <label>
                    <input name="required" type="checkbox" onChange={this.handleCheckboxChangeUnique.bind(this, attributeObj)}/>
                </label>
            </td>
        </tr>);
    }

    // onSortEnd = ({oldIndex, newIndex}) => {
    //     this.setState({items: arrayMove(this.state.items, oldIndex, newIndex)});
    // };

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
                <Modal mtitle = "Add Equipment Type" handleSave={this.handleSubmit.bind(this)} style={{position:'relative'}} >
                    <form>
                        <label>
                            Equipment Type Name:
                            <input name="enteraName" ref="typeName" type="textarea" onChange={(event) => this.handleInputChange(event)} />
                        </label>
                        <br />
                    </form>
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

                    <br />
                    <EquipmentTypeAttributeSearchTool barStyle={styles.equipmentTypeAttributeSearchBar} placeholder="Attribute Search"
                                                      history={this.props.history} handleAddAttribute={this.handleAddAttribute.bind(this)} />
                    <br/>
                </Modal>
                <EquipmentTypeSearchTool barStyle={styles.equipmentTypeSearchBar} placeholder="Equipment Type Search" history={this.props.history}/>
                <br/>
            </div>
        );
    }
}

ConfigureEquipmentType.propTypes = {
    history: PropTypes.object,
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
