/*
    This component includes both an equipment type search bar and the generated
    table of closest matching equpment types.
 */

import React from "react";
import PropTypes from "prop-types";

require("../css/EquipmentTypeSearchToolStyle.css");

let dao = require("../dao.js");



export class EquipmentEquipmentTypeSearchTool extends React.Component {
    constructor() {
        super();
        this.state = {
            tableState: "asHidden",
            searchString: "",
            db_response: "",
            resultsTable: "",
            cancelText: "Cancel",
            addText:"Add Equipment",
            equipmentTypeEnum: "",
            equipmentTypeName: "",
            attributeNames: "",
    
        };

        // This makes all equipment types load in results table on page render
        this.getSearchResults();
    }

    onHandleSearchChange(event) {
        this.setState({
            searchString: event.target.value
        });
    }


    //This gets the search results
    searchButtonClicked(event) {
        this.getSearchResults();
        event.preventDefault();
    }

    handleInputChange(event) {
        this.setState({
            equipmentTypeName: event.target.value
        });
    }

    // getAttributeNames() {
    //     var ref = this;
    //     let attrNames = [];
    //     let attributes = this.state.equipmentType.attributes;

    //     for (let i = 0; i < attributes.length; i++) {
    //         attrNames.push(
    //             <label id={attributes[i].name}>
    //                 {attributes[i].name}: 
    //                 <input name={attributes[i].name} type ="textarea" ref="typeName" />
    //             </label>
    //             <br />
    //             );
    //     }
    // }

    getSearchResults() {
        var ref = this;

        dao.getEquipmentTypeAll(function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                var numEls = response.result.length;
                var equipmentTypeList = [];
                for (var i = 0; i < numEls; i++) {
                    equipmentTypeList.push(response.result[i]);
                }

                var results = equipmentTypeList.map((function(equipmentType){
                                return (
                                    <tr  na={equipmentType.name} key={equipmentType.name}  onClick={(event)=>ref.equipmentTypeClicked(event, equipmentType)}>
                                        <td>{equipmentType.name}</td>
                                    </tr>);
                            }).bind(this));

                ref.setState({
                    db_response: response,
                    resultsTable: results,
                    tableState: "asVisible"
                })
            }
        });
    }

    //hides and displays the form for adding equipment.
    equipmentTypeClicked(event, equipmentType) {
        equipmentTypeModal.style.display = "";
        
        event.preventDefault();
    }

    //handler for the cancel button when a equipment type is selected and the user wants to cancel
    cancelAddEquipment(event) {
        equipmentTypeModal.style.display = "none";
        event.preventDefault();
    }

    render () {
        return (
            <div>
                <div id= "equipmentTypeModal" style={{display:"none"}} >
                    <form id= "addEquipmentForm">
                        <button id="cancel" style={{position: "right"}} className="btn btn-secondary" type="button" onClick={(event) =>this.cancelAddEquipment(event)}>
                            {this.state.cancelText}
                        </button>
                        <br />
                        <label>
                            Equipment Name:
                            <input name="enteraName" ref="typeName" type="textarea" onChange={(event) => this.handleInputChange(event)} />
                        </label>
                        <br />
                            {this.state.attributeNames};
                        <br />
                
                        <br />
                        <button id="addEquipmentButton" className="btn btn-secondary" type="button" onClick={(event) =>this.cancelAddEquipment(event)}>
                            {this.state.addText}
                        </button>
                    </form>
                </div>
                <div>
                    <form onSubmit={(event) =>this.searchButtonClicked(event)}>
                        <div className="input-group" style={this.props.barStyle}>
                          <input id="search" type="search" className="form-control transparent-input" placeholder={this.props.placeholder} onChange={(event) => this.onHandleSearchChange(event)}/>
                            <span className="input-group-btn">
                              <button id="submit" className="btn btn-secondary" type="button" onClick={(event) =>this.searchButtonClicked(event)}>
                                  <span className="glyphicon glyphicon-search"></span>
                              </button>
                            </span>
                        </div>
                    </form>
                    <div id={this.state.tableState} className="hiddenTableDiv">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.resultsTable}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

EquipmentEquipmentTypeSearchTool.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string,
    history: PropTypes.object
};

