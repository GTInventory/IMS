import React from "react";
import PropTypes from "prop-types";
require("../css/SearchResultsStyle.css");

/*
    The search results page shows search results for a given query.
    This query is gotten from the page that transitions to this page.
 */
export class SearchResults extends React.Component {
    render() {
        var searchString = this.props[0].match.params.searchString;
        return (
            <div>
                <h1 id="searchResultsTitle">Search Results</h1>
                <div id="resultsList">
                    <h3>Computer</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Hostname</th>
                                <th>Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PC-7</td>
                                <td>{searchString}</td>
                            </tr>
                            <tr>
                                <td>PC-13</td>
                                <td>{searchString}</td>
                            </tr>
                            <tr>
                                <td>PC-14</td>
                                <td>{searchString}</td>
                            </tr>
                            <tr>
                                <td>PC-20</td>
                                <td>{searchString}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br/>
                    <h3>Monitor</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Manufacturer</th>
                                <th>Display Size</th>
                                <th>Room</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Dell</td>
                                <td>24</td>
                                <td>{searchString}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

SearchResults.propTypes = {
    searchString: PropTypes.string,
    history: PropTypes.object
};
