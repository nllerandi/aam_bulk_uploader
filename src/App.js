import React, { Component } from 'react';
import './App.css';

import UploadFile from "./components/UploadFile";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UploadFile/>
      </div>
    );
  }
}

export default App;
