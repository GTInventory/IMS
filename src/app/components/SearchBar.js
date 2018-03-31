import React from "react";
import PropTypes from "prop-types";
require("../css/SearchBarStyle.css");

import {AdvancedSearchOptions} from "./AdvancedSearchOptions";

export class SearchBar extends React.Component {
    constructor() {
        super();
        this.state = {
            advancedState: "asHidden",
            advancedButton: "glyphicon glyphicon-menu-down"
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
                advancedButton: "glyphicon glyphicon-menu-up"
            });
        } else {
            this.setState({
                advancedState: "asHidden",
                advancedButton: "glyphicon glyphicon-menu-down"
            });
        }
    }

    render () {
        return (
            <div>
                <form onSubmit={(event) =>this.searchButtonClicked(event)}>
                    <div className="input-group" style={this.props.barStyle}>
                        <input id="search" type="search"
                            className={"form-control transparent-input " + this.props.inputSpecialClass}
                            placeholder={this.props.placeholder}
                            onChange={(event) => this.onHandleSearchChange(event)}/>
                        <span className="input-group-btn">
                            <button id="submit" className="btn btn-secondary"
                                type="submit"
                                onClick={(event) =>this.searchButtonClicked(event)}>
                                <span className="glyphicon glyphicon-search"></span>
                            </button>
                            <button id="advancedSearch"
                                className="btn btn-secondary dropdown-toggle"
                                data-toggle="dropdown" aria-haspopup="true"
                                 aria-expanded="false" type="button"
                                 onClick={this.toggleSearch.bind(this)}>
                                 <span className={this.state.advancedButton} id="navItem"></span>
                            </button>
                            <div className="dropdown-menu">
                                <AdvancedSearchOptions/>
                            </div>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

SearchBar.propTypes = {
    barStyle: PropTypes.object,
    inputSpecialClass: PropTypes.string,
    placeholder: PropTypes.string,
    history: PropTypes.object,
};
