import React from 'react';
import { secondsToTime } from '../utils/Seconds_To_Time';

interface TimerProps {
    mainTime: number;
}

const Timer = (props: TimerProps): JSX.Element => {
    return <div className="timer">{secondsToTime(props.mainTime)}</div>;
};

export default Timer;
