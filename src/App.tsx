import React from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

class Clock extends React.Component<{
  name: string;
  setIsVisible: (visible: boolean) => void;
  isVisible: boolean;
}> {
  private timerId: NodeJS.Timeout | undefined;

  state = {
    currentTime: new Date().toUTCString().slice(-12, -4),
  };

  componentDidMount() {
    this.timerId = setInterval(() => {
      const currentTime = new Date().toUTCString().slice(-12, -4);

      this.setState({ currentTime });
      // eslint-disable-next-line no-console
      console.log(currentTime);
    }, 1000);

    document.addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    document.removeEventListener('contextmenu', this.handleContextMenu);
    document.removeEventListener('click', this.handleClick);
  }

  handleContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    this.props.setIsVisible(false);
  };

  handleClick = () => {
    this.props.setIsVisible(true);
  };

  render() {
    return this.props.isVisible ? (
      <div className="Clock">
        <strong className="Clock__name">{this.props.name}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.currentTime}</span>
      </div>
    ) : null;
  }
}

class App extends React.Component {
  private intervalId: NodeJS.Timeout | undefined;

  state = {
    clockName: 'Clock-0',
    isVisible: true,
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      const oldName = this.state.clockName;
      const newName = getRandomName();

      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${oldName} to ${newName}`);
      this.setState({ clockName: newName });
    }, 3300);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  setIsVisible = (visible: boolean) => {
    this.setState({ IsVisible: visible });
  };

  render() {
    return (
      <div className="App">
        <h1>React clock</h1>
        <Clock
          name={this.state.clockName}
          setIsVisible={this.setIsVisible}
          isVisible={this.state.isVisible}
        />
      </div>
    );
  }
}

export default App;
