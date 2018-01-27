/*
    This component includes both an attribute search bar and the generated
    table of closest matching attributes.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/AttributeSearchToolStyle.css");

var BASE_URL = "https://ims-backend.mybluemix.net"

export class AttributeSearchTool extends React.Component {
    constructor() {
        super();
        this.state = {
            tableState: "asHidden",
            searchString: "",
            db_response: "",
            resultsTable: ""
        };
    }

    onHandleSearchChange(event) {
        this.setState({
            searchString: event.target.value
        });
    }

    searchButtonClicked(event) {
        var ref = this;
        var url = BASE_URL + "/attribute?q=" + this.state.searchString;
        fetch(url, {method: 'GET'}).then(res => res.json())
            .catch(function(error) {
                throw new Error('Network response was not ok:', response.status);
            })
            .then(function(response) {
                ref.setState({
                db_response: response
                })

                console.log('Success:', ref.state.db_response);
            });

        var numEls = this.state.db_response.result.length;
        var namesList = [];
        for (var i = 0; i < numEls; i++) {
            namesList.push(this.state.db_response.result[i].name);
        }

        var results = namesList.map(function(name){
                        return <tr><td>{name}</td></tr>;
                    });

        this.setState({
            resultsTable: results,
            tableState: "asVisible"
        });

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

AttributeSearchTool.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string
};
