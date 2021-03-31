import React from 'react';
import { secondsToMinutes } from '../utils/Seconds_To_Minutes';

interface TimerProps {
    mainTime: number;
}

const Timer = (props: TimerProps): JSX.Element => {
    return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
};

export default Timer;
