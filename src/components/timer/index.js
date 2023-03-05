import React, { useEffect, useState } from 'react';
import { Number } from '../number';
import styles from './styles.module.css';

let intervalId;

export const Timer = ({ isTimerActive }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isTimerActive) {
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      setSeconds(0);
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isTimerActive]);

  const timeDisplayValue = String(seconds).padStart(3, '0');
  const timeDisplay = timeDisplayValue.split('').map((digit, index) => <Number key={index} digit={digit} />);

  return <div className={styles.timer}>{timeDisplay}</div>;
};