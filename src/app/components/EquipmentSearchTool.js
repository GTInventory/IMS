import React from "react";
import PropTypes from "prop-types";
require("../css/EquipmentSearchToolStyle.css");

let dao = require("../dao.js");

/*
    This component includes both an equipment search bar and the generated
    table of closest matching equpment.
*/
export class EquipmentSearchTool extends React.Component {
    constructor() {
        super();
        this.state = {
            tableState: "asHidden",
            searchString: "",
            db_response: "",
            resultsTable: "",
        };
    }

    onHandleSearchChange(event) {
        this.setState({
            searchString: event.target.value
        });
    }

    searchButtonClicked(event) {
        var ref = this;

        dao.getEquipmentAll(function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                var numEls = response.result.length;
				var equipmentList = [];
				for (var i = 0; i < numEls; i++) {
					equipmentList.push(response.result[i]);
				}

				var results = equipmentList.map((function(equipment){
								return (
									<tr  na={equipment.name} key={equipment.name}  onClick={(event)=>ref.equipmentClicked(event, equipment)}>
										<td>{equipment.name}</td>
									</tr>);
							}).bind(this));

                ref.setState({
					db_response: response,
					resultsTable: results,
					tableState: "asVisible"
                })
            }
        });
		event.preventDefault();
    }

    equipmentClicked(event, equipment) {
        if (this.state.searchString !== "") {
            this.props.history.push("/configure/equipment/"+equipment.name, equipment);
        }
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

EquipmentSearchTool.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string,
    history: PropTypes.object
};
