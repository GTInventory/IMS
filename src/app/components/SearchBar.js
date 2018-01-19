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
            searchString: ""
        };
    }

    onHandleSearchChange(event) {
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
