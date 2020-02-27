import React, { Component } from 'react';
import './App.css';
import NameForm from './NameForm';
 
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
}
  render() {
    
    return (
      
      <div className="App">
        <NameForm/>
      </div>
    );
  }
  
}

export default App;
