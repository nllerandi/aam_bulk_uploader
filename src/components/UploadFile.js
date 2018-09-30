import React, { Component } from "react";
import CSVReader from "react-csv-reader";
// import ReactDOM from "react-dom";
// import axios from "axios";

import TraitsOutput from "./TraitsOutput";

import "./UploadFile.css";


class UploadFile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            newTraitsData: null,
        }
    }

    createNewTraitsArray = newTraitsData => {
        this.setState({newTraitsData: newTraitsData});
        // console.log("UploadFile", this.state.newTraitsData);
    };

    render() {
        return (
            <div className="uploadAndTraits">
                <div className="UploadFile">
                    <CSVReader
                        cssClass="react-csv-input"
                        label="Select CSV"
                        onFileLoaded={this.createNewTraitsArray}
                    />
                </div>
                <div className="TraitsOutput">
                    <TraitsOutput data={this.state.newTraitsData}/>
                </div>
            </div>
        )
    }
}

export default UploadFile;