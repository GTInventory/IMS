import React from "react";
import PropTypes from "prop-types";

import {SearchBar} from "./SearchBar";

export class SearchResults extends React.Component {
    render() {
        var searchString = this.props[0].match.params.searchString;
        return (
            <div>
                <SearchBar barStyle={styles.searchBar} placeholder={searchString} history={this.props[0].history}/>
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

const styles = {};
styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '2em'
}
