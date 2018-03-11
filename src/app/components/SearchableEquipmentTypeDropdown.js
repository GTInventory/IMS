/*
    This component includes both an attribute search bar and the generated
    table of closest matching attributes. It differs from the AttributeSearchTool
    because this is for use when adding and Equipment Type, so it does not share
    all of its functionality.
 */

import React from "react";
import PropTypes from "prop-types";
// require("../css/EquipmentTypeAttributeSearchToolStyle.css");

let dao = require("../dao.js");

export class SearchableEquipmentTypeDropdown extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      value: ''
    };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  focusNext() {
    const input = ReactDOM.findDOMNode(this.input);

    if (input) {
      input.focus();
    }
  }

  render() {
    const { children } = this.props;
    const { value } = this.state;

    return (
      <div className="dropdown-menu" style={{ padding: '' }}>
        <FormControl
          ref={c => {
            this.input = c;
          }}
          type="text"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            child => !value.trim() || child.props.children.indexOf(value) !== -1
          )}
        </ul>
      </div>
    );
  }
}
