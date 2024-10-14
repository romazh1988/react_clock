import React, { useEffect, useState } from 'react';
import './App.scss';

function getRandomName(): string {
  const value = Date.now().toString().slice(-4);

  return `Clock-${value}`;
}

const Clock: React.FC<{
  name: string;
  setIsVisible: (visible: boolean) => void;
  isVisible: boolean;
}> = ({ name, setIsVisible, isVisible }) => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toUTCString().slice(-12, -4),
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      const time = new Date().toUTCString().slice(-12, -4);

      setCurrentTime(time);

      // eslint-disable-next-line no-console
      console.log(time);
    }, 1000);

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      setIsVisible(false);
    };

    const handleClick = () => {
      setIsVisible(true);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);

    return () => {
      clearInterval(timerId);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('click', handleClick);
    };
  }, [setIsVisible]);

  return isVisible ? (
    <div className="Clock">
      <strong className="Clock__name">{name}</strong>
      {'time is '}
      <span className="Clock__time">{currentTime}</span>
    </div>
  ) : null;
};

const App: React.FC = () => {
  const [clockName, setClockName] = useState('Clock-0');
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const updateClockName = () => {
      const newName = getRandomName();

      // eslint-disable-next-line no-console
      console.warn(`Renamed to ${newName}`);

      setClockName(newName);
    };

    const intervalId = setInterval(() => {
      if (isVisible) {
        updateClockName();
      }
    }, 3300);

    return () => {
      clearInterval(intervalId);
    };
  }, [isVisible]);

  return (
    <div className="App">
      <h1>React clock</h1>
      <Clock
        name={clockName}
        setIsVisible={setIsVisible}
        isVisible={isVisible}
      />
    </div>
  );
};

export default App;
