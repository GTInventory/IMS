/*
    This component includes a draggable, sortable list of attributes assigned to
    an equipment type.
 */

import React from "react";
import PropTypes from "prop-types";
require("../css/EquipmentTypeAttributeListStyle.css");

let dao = require("../dao.js");

import {SortableContainer, SortableElement} from 'react-sortable-hoc';

export class EquipmentTypeAttributeList extends React.Component {
    constructor() {
        super();
        this.state = {
            tableState: "asVisible",
        };
    }

    render () {
        return (
            <div id={this.state.tableState} className="hiddenTableDiv">
                <SortableList items={this.props.items} onSortEnd={this.props.handleOnSortEnd}
                    helperClass='sortableHelper' />
            </div>
        );
    }
}

const SortableItem = SortableElement(({attribute}) => {
    return(
        <tr na={attribute.name} key={attribute.name}>
            <td>{attribute.name}</td>
            <td>{attribute.type}</td>
            <label>
                <input name="required" type="checkbox" />
            </label>
        </tr>
    );
});

const SortableList = SortableContainer(({items}) => {
    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Attribute Name</th>
                    <th>Type</th>
                    <th>Required</th>
                </tr>
            </thead>
            <tbody>
                {items.map((attribute, index) => (
                    <SortableItem key={`item-${attribute.name}`} index={index} attribute={attribute} style={{zIndex:-999}} />
                ))}
            </tbody>
        </table>
  );
});

EquipmentTypeAttributeList.propTypes = {
    items: PropTypes.array,
    handleOnSortEnd: PropTypes.func,
};
