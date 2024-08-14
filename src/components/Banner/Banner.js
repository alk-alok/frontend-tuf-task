import React, { useState, useEffect } from 'react';
import './Banner.css';

function Banner({ description, timer, visible, link }) {
  const [timeLeft, setTimeLeft] = useState(timer * 3600); 

  useEffect(() => {
    setTimeLeft(timer * 3600);
  }, [timer]);

  useEffect(() => {
    if (visible && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(interval); //if reach to 0 then remove banner
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [timeLeft, visible]);

  // Convert seconds to days, hours, minutes, and seconds
  const formatTime = (seconds) => {
    const days = Math.floor(seconds / (24 * 3600));
    seconds %= (24 * 3600);
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    const minutes = Math.floor(seconds / 60);
    seconds %= 60;

    return `${days}d:${hours}h:${minutes}m:${seconds}s`;
  };

  // Hide banner if timer is 0
  if (!visible || timeLeft <= 0) return null;

  const handleClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <div className="banner" onClick={handleClick}>
      <div className="banner-content">
        <p>{description}</p>
        <p>Time left: {formatTime(timeLeft)}</p>
      </div>
    </div>
  );
}

export default Banner;
