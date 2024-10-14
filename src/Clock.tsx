import React from 'react';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

interface Props {
  setIsVisible: (visible: boolean) => void;
  isVisible: boolean;
}

interface State {
  currentTime: string;
  clockName: string;
}

export class Clock extends React.Component<Props, State> {
  private timerId: NodeJS.Timeout | undefined;

  private nameIntervalId: NodeJS.Timeout | undefined;

  state: State = {
    currentTime: new Date().toUTCString().slice(-12, -4),
    clockName: 'Clock-0',
  };

  componentDidMount() {
    this.timerId = setInterval(() => {
      const currentTime = new Date().toUTCString().slice(-12, -4);

      this.setState({ currentTime });
      // eslint-disable-next-line no-console
      console.log(currentTime);
    }, 1000);

    this.nameIntervalId = setInterval(() => {
      const oldName = this.state.clockName;
      const newName = getRandomName();

      // eslint-disable-next-line no-console
      console.warn(`Renamed from ${oldName} to ${newName}`);
      this.setState({ clockName: newName });
    }, 3300);

    document.addEventListener('contextmenu', this.handleContextMenu);
    document.addEventListener('click', this.handleClick);
  }

  componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.isVisible !== this.props.isVisible && !this.props.isVisible) {
      // eslint-disable-next-line no-console
      console.warn(`Clock is hidden. Last name was ${this.state.clockName}`);
    }
  }

  componentWillUnmount() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.nameIntervalId) {
      clearInterval(this.nameIntervalId);
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
        <strong className="Clock__name">{this.state.clockName}</strong>
        {' time is '}
        <span className="Clock__time">{this.state.currentTime}</span>
      </div>
    ) : null;
  }
}

export default Clock;
