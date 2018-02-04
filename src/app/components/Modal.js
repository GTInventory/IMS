/*
    A basic popup modal that has forms for the user to fill out. (Ex. addattribute modal, add equipmenttype modal, etc)
 */

import React from 'react';
import PropTypes from 'prop-types';
require("../css/PopUpStyle.css");

export class Modal extends React.Component {
  render() {
    return (
        <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="addModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h2 className="modal-title" id="addModalLabel">{this.props.mtitle}</h2>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.props.handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Modal.propTypes = {
  mtitle: PropTypes.string,
  handleSave: PropTypes.func,
  children: PropTypes.node
};
