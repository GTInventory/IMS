import React from "react";
import {Link} from "react-router-dom";
require("../css/AdvancedSearchOptionsStyle.css");

export const AdvancedSearchOptions = () => {
    return (
        <form id="advancedForm">
            <div className="input-group" id="advancedSearchOptions">
                <table>
                    <tbody>
                        <tr>
                          <td align="right">Attributes:</td>
                          <td align="left"><input type="text"/></td>
                        </tr>
                        <BreakTR colSpan="2"/>
                        <tr>
                          <td align="right">Excludes:</td>
                          <td align="left"><input type="text"/></td>
                        </tr>
                    </tbody>
                </table>
                <br/>
                <span id="submitButtonSpan">
                    <button id="submit" className="btn btn-secondary" type="button">
                        Submit
                    </button>
                </span>
            </div>
        </form>
    );
};

const BreakTR = (props) => (
    <tr id="break"><td {...props}></td></tr>
)
