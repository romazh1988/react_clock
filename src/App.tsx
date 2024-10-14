import React from 'react';
import './App.scss';
import Clock from './Clock';

class App extends React.Component {
  state = {
    isVisible: true,
  };

  setIsVisible = (visible: boolean) => {
    this.setState({ isVisible: visible });
  };

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        <Clock
          setIsVisible={this.setIsVisible}
          isVisible={this.state.isVisible}
        />
      </div>
    );
  }
}

export default App;
