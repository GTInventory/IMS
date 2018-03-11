/*
    This component includes both an equipment type search bar and the generated
    table of closest matching equpment types.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/EquipmentTypeSearchToolStyle.css");

let dao = require("../dao.js");

export class EquipmentTypeSearchTool extends React.Component {
    constructor() {
        super();
        this.state = {
            tableState: "asHidden",
            searchString: "",
            db_response: "",
            resultsTable: "",
        };

        // This makes all equipment types load in results table on page render
        this.getSearchResults();
    }

    onHandleSearchChange(event) {
        this.setState({
            searchString: event.target.value
        });
    }

    searchButtonClicked(event) {
        this.getSearchResults();
        event.preventDefault();
    }

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

    equipmentTypeClicked(event, equipmentType) {
        this.props.history.push("/configure/equipmentTypes/"+equipmentType.name, equipmentType);
        event.preventDefault();
    }

    render () {
        return (
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
        );
    }
}

EquipmentTypeSearchTool.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string,
    history: PropTypes.object
};
