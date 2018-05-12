import React, { Component } from 'react';
import Button from './Button';
import Input from './Input';
import TitleBar from './TitleBar';


class App extends Component {
  render() {
    return (
      <div className="tr-app-container" >
        <div className="tr-app" >
          <TitleBar text="Who payed how much?" />
          <Input />
          <Button text="test"/>
        </div>
      </div>
    );
  }
}

export default App;
