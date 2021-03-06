/*
    This component includes both an attribute search bar and the generated
    table of closest matching attributes. It differs from the AttributeSearchTool
    because this is for use when adding and Equipment Type, so it does not share
    all of its functionality.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/EquipmentTypeAttributeSearchToolStyle.css");

let dao = require("../dao.js");

export class EquipmentTypeAttributeSearchTool extends React.Component {
    constructor() {
        super();
        this.state = {
            tableState: "asHidden",
            searchString: "",
            db_response: "",
            resultsTable: ""
        };

        this.getAllAttributes();
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

    getAllAttributes() {
        var ref = this;

        dao.getAttributeAll(function(error, response){
            if (error != null) {
                console.log(error);
            } else {
                var numEls = response.result.length;
                var attributesList = [];
                for (var i = 0; i < numEls; i++) {
                    attributesList.push(response.result[i]);
                }

                var results = attributesList.map((function(attribute){
                                return (
                                    <tr  na={attribute.name} key={attribute.name} onClick={(event)=>ref.attributeClicked(event, attribute)}>
                                        <td>{attribute.name}</td>
                                        <td>{attribute.type}</td>
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

    getSearchResults() {
        var ref = this;

        dao.getAttributeByName(this.state.searchString, function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                var numEls = response.result.length;
                var attributesList = [];
                for (var i = 0; i < numEls; i++) {
                    attributesList.push(response.result[i]);
                }

                var results = attributesList.map((function(attribute){
                                return (
                                    <tr  na={attribute.name} key={attribute.name} onClick={(event)=>ref.attributeClicked(event, attribute)}>
                                        <td>{attribute.name}</td>
                                        <td>{attribute.type}</td>
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

    attributeClicked(event, attribute) {
        this.props.handleAddAttribute(event, attribute);
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
                                <th>Name</th>
                                <th>Type</th>
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

EquipmentTypeAttributeSearchTool.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string,
    history: PropTypes.object,
    handleAddAttribute: PropTypes.func,
};
