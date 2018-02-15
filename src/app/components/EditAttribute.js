import React from "react";
import PropTypes from "prop-types";
require("../css/EditAttributeStyle.css");

export class EditAttribute extends React.Component {
    render() {
        var searchString = this.props[0].match;
        var attribute = this.props[0].history.location.state;
        console.log(searchString);
        console.log(attribute);
        //TODO: if user chooses to go to website through URL directly,
        // search for attribute name from URL bar.
        return (
            <div>
                <h1 id="EditAttributeTitle">{attribute.name}</h1>
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
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>PC-13</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>PC-14</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>PC-20</td>
                                <td>0</td>
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
                                <td>0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

EditAttribute.propTypes = {
    attributeNameString: PropTypes.string,
    history: PropTypes.object
};

const styles = {};
styles.searchBar = {
    margin: '0 auto',
    width: '30em',
    paddingTop: '2em'
}
