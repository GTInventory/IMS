/*
    The add attributes page modal allows for a user to create a new attribute to be added to the
    system.
 */

import React from 'react';
import PropTypes from 'prop-types';
require("../css/PopUpStyle.css");

export class Modal extends React.Component {
  render() {
    return (
        <div className="modal fade" id="addModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="exampleModalLabel">{this.props.mtitle}</h1>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {this.props.children}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Save</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

Modal.propTypes = {
  mtitle: PropTypes.string,
  children: PropTypes.node
};
