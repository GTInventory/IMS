import React from "react";
import PropTypes from "prop-types";
//require("../css/AttributeOrganizer.css");

let dao = require("../dao.js");

/*
    This class takes in a list of attributes and displays them in a dynamically
    modifiable table.
*/
export class AttributeOrganizer extends React.Component {
}

AttributeOrganizer.propTypes = {
    attributeList: PropTypes.array
}
