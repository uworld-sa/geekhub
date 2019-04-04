import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js'
import Gui from './components/Gui.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        package: 'react-dat-gui',
        power: 9000,
        isAwesome: true,
        feelsLike: '#2FA1D6',
      }
    }
    this.onGuiChange = this.onGuiChange.bind(this);
  }

  onGuiChange = data => {
    this.setState({
      data
    });
    console.log(data);
  }

  render() {
    const {
      data
    } = this.state;

    return (
      <div className="App">
        <Game></Game>
        <Gui 
          data = {
            data
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
