import React, {Component} from "react";
import "./TraitsOutput.css";
const request = require("request-promise-native");

class TraitsOutput extends Component {
  constructor(props) {
    super(props);

      this.state = {
          options: null,
          statuses: [],
          auth: ""
      };

    this.onInputChange = this.onInputChange.bind(this);
  }

  createTraitsArray = (newTraits) => {

    let mainTraitArray = [];
    let headers = newTraits[0];
    for (let i = 1; i < newTraits.length; i++) {
      let trait = {};
      let traitDetails = newTraits[i];
      for (let j = 0; j < traitDetails.length; j++) {
        let header = headers[j];
        let traitValue = traitDetails[j];
        trait[header] = traitValue;
      }
      mainTraitArray.push(trait);
    }
    return mainTraitArray;
  };

  createRequestOptions = (newTraits) => {
    let mainTraitArray = this.createTraitsArray(newTraits);
    let optionsArray = [];
    let authorization = `Bearer ${this.state.auth}`;
    for (let i = 0; i < mainTraitArray.length; i++) {
      let traitsObject = mainTraitArray[i];
      let option = {
        //Fixed data
        method: 'POST',
        url: 'https://api.demdex.com/v1/traits/',
        headers:
          {
            authorization: authorization,
            'content-type': 'application/json',
          },
        body: {
          // Dynamic data / populates with each trait throughout loop
          ...traitsObject,
        },
        json: true
      };
      console.log(option);
      optionsArray.push(option);
    }
      return optionsArray;
  };

  getTraitRows = (newTraits) => {
    return newTraits.map((trait, index) => {

      let className = "";
      if (index >= 1) {
        let status = this.state.statuses[index - 1];
        if (status === true) {
          className = "success"
        } else if (status === false) {
          className = "error"
        }
      }


      return (
        <tr key={trait[6]} className={className}>
          <td>{trait[0]}</td>
          <td>{trait[1]}</td>
          <td>{trait[2]}</td>
          <td>{trait[3]}</td>
          <td>{trait[4]}</td>
          <td>{trait[5]}</td>
          <td>{trait[6]}</td>
          <td>{trait[7]}</td>
        </tr>
      );
    });
  };

  postTraits = async () => {

    let options = this.state.options;

    for (let i = 0; i < options.length; i++) {
      let option = options[i];
      try {
        await request(option);
        let statuses = this.state.statuses;
        statuses.push(true);
        this.setState({statuses});
      } catch(e) {
        let statuses = this.state.statuses;
        statuses.push(false);
        this.setState({statuses});
      }
    }
    
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (this.props.data !== prevProps.data || this.state.auth !== prevState.auth) {
      let optionsArray = this.createRequestOptions(this.props.data);
      this.setState({options: optionsArray});
    }
  };

  onInputChange(e) {
      this.setState({auth: e.target.value});
  }

  render() {
    const newTraits = this.props.data;

    if (!newTraits) {
      return "Load a file..."
    }

    let renderTraits = this.getTraitRows(newTraits);

    return (
      <div>
        <form className="form-inline">
          <div className="form-group mx-sm-3 mb-2">
            <input
                className="form-control"
                type="text"
                placeholder="Enter Authorization Code"
                onChange={this.onInputChange}
                value={this.state.auth}
            />
            <button
                type="button"
                className="btn btn-primary mb-2"
                onClick={this.postTraits}>
                Create Traits
            </button>
          </div>
        </form>
        <table className="table table-hover">
          <thead>
          <tr>
            <th>Name</th>
            <th>Folder ID</th>
            <th>Data Source ID</th>
            <th>Trait Type</th>
            <th>Status</th>
            <th>Description</th>
            <th>Trait Rule</th>
            <th>Integration Code</th>
          </tr>
          </thead>
          <tbody>
          {renderTraits}
          </tbody>
        </table>
      </div>
    )
  };
}

export default TraitsOutput;