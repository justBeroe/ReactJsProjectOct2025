import  { useEffect, useState } from 'react';
import './clock.css';

export function Clock() {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="clock-card">
      <p className="clock-time">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </p>
    </div>
  );
}
