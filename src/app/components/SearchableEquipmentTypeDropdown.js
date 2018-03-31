import React from "react";
import PropTypes from "prop-types";
// require("../css/EquipmentTypeAttributeSearchToolStyle.css");

let dao = require("../dao.js");

/*
   This component builds off of the EquipmentTypeSearchTool. It uses a dropdown
   functionality that creates a fillable form for actually filling in the
   attributes instead of just linking to the equipment type.
 */
export class SearchableEquipmentTypeDropdown extends React.Component {

    /*
        Upon construction, gets all equipment from database and adds it to
        dropdown.
     */
    constructor() {
        super();
        this.state = {
            searchString: "",
            db_response: "",
            optionsList: ""
        };

        var ref = this;
        dao.getEquipmentTypeAll(function(error, response) {
            if (error != null) {
                console.log(error);
            } else {
                var numEls = response.result.length;
                var equipmentTypeList = [];
                for (var i = 0; i < numEls; i++) {
                    equipmentTypeList.push(response.result[i]);
                }

                var results = equipmentTypeList.map((function(equipmentType){
                                return (
                                    <option key={equipmentType.name} value={equipmentType.name} />);
                            }).bind(this));

                ref.setState({
                    db_response: response,
                    optionsList: results,
                })
            }
        });
    }

    onHandleSearchChange(event) {
        this.setState({
            searchString: event.target.value
        });
    }

    render () {
        return (
            <div>
                <form onSubmit={(event) =>this.props.searchHandler(event, this.state.searchString)}>
                    <div className="input-group" style={this.props.barStyle}>
                      <input id="search" list="equipsearch" type="search" className="form-control transparent-input" placeholder={this.props.placeholder} onChange={(event) => this.onHandleSearchChange(event)}/>
                        <datalist id="equipsearch">
                            {this.state.optionsList}
                        </datalist>
                        <span className="input-group-btn">
                          <button id="submit" className="btn btn-secondary" type="button" onClick={(event) =>this.props.searchHandler(event, this.state.searchString)}>
                              <span className="glyphicon glyphicon-search"></span>
                              
                          </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

SearchableEquipmentTypeDropdown.propTypes = {
    barStyle: PropTypes.object,
    placeholder: PropTypes.string,
    history: PropTypes.object,
    searchHandler: PropTypes.func
};
