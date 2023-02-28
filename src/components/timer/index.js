import React from "react";
import styles from './styles.module.css';

const Timer = (props) => {
    console.log('timerActive', props.timerActive)
    const [seconds, setSeconds] = React.useState(0);

    if(props.timerActive) {
        setTimeout(() => {
            setSeconds(seconds + 1)
        }, 1000)
    }
    
    console.log(seconds)

    let timeDisplay = ''

    if(String(seconds).length === 1) {
        timeDisplay = '0' + '0' + seconds;
    }

    if(String(seconds).length === 2) {
        timeDisplay = '0' + seconds;
    }

    if(String(seconds).length === 3) {
        timeDisplay = seconds;
    }

    return (
        <div className={styles.timer}>
            {timeDisplay}
        </div>
    )
};

export default Timer;