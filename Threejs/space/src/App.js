import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js'
import Gui from './components/Gui.js'
import example from './example'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      params: Object.assign({}, example)
    }
    this.onGuiChange = this.onGuiChange.bind(this);
  }

  onGuiChange = data => {
    this.setState({
      params:data
    });
    console.log(data);
  }

  render() {
    const {
      params
    } = this.state;

    return (
      <div className="App">
        <Game params={params}></Game>
        <Gui 
          data = {
            params
          }
          onGuiChange = {
            this.onGuiChange
          } 
        > 
        </Gui>
      </div>
    );
  }
}

export default App;
