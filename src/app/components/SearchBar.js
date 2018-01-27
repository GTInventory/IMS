import React from "react";
import PropTypes from "prop-types";
require("../css/SearchBarStyle.css");

import {AdvancedSearchOptions} from "./AdvancedSearchOptions";

export class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            advancedState: "asHidden",
            normalSearch: true,
            advancedButton: "glyphicon glyphicon-menu-down",
            searchString: {
                "success": true,
                "result": [
                    {
                        "id": 1,
                        "name": "MAC Address",
                        "regex": "^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$",
                        "required": false,
                        "unique": true,
                        "public": true,
                        "helpText": "A media access control address (MAC address) of a device is a unique identifier assigned to network interfaces for communications",
                        "createdAt": "2018-01-27T01:17:26.457Z",
                        "updatedAt": "2018-01-27T01:17:26.457Z"
                    },
                    {
                        "id": 2,
                        "name": "Serial Number",
                        "regex": null,
                        "required": null,
                        "unique": null,
                        "public": true,
                        "helpText": "string",
                        "createdAt": "2018-01-27T01:45:28.488Z",
                        "updatedAt": "2018-01-27T01:45:28.488Z"
                    },
                    {
                        "id": 4,
                        "name": null,
                        "regex": null,
                        "required": null,
                        "unique": null,
                        "public": null,
                        "helpText": "",
                        "createdAt": "2018-01-27T01:51:41.174Z",
                        "updatedAt": "2018-01-27T01:51:41.174Z"
                    }
                ]
            }
        };
    }

    onHandleSearchChange(event) {
        console.log(this.state.db_response);
        this.setState({
            searchString: event.target.value
        });
    }

    searchButtonClicked(event) {
        if (this.state.searchString !== "") {
            this.props.history.push("/search/"+this.state.searchString);
        }
        event.preventDefault();
    }

    toggleSearch() {
        if (this.state.normalSearch) {
            this.setState({
                advancedState: "asVisible",
                normalSearch: false,
                advancedButton: "glyphicon glyphicon-menu-up"
            });
        } else {
            this.setState({
                advancedState: "asHidden",
                normalSearch: true,
                advancedButton: "glyphicon glyphicon-menu-down"
            });
        }
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
                          <button id="advancedSearch" className="btn btn-secondary" type="button" onClick={this.toggleSearch.bind(this)}>
                              <span className={this.state.advancedButton} id="navItem"></span>
                          </button>
                        </span>
                    </div>
                </form>
                <div id={this.state.advancedState}>
                    <hr id="advancedHR"/>
                    <AdvancedSearchOptions/>
                </div>
            </div>
        );
    }
}

SearchBar.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string,
    history: PropTypes.object
};
