import React from "react";
import PropTypes from "prop-types";

export class freeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: "Select Value"};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
  	this.setState([value: event.target.value]);
  }

  handleSubmit(event) {
  	event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Attribute:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="string">"String"</option>
            <option value="integer">Integer</option>
            <option value="boolean">"Boolean"</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}