import React from 'react';
import { UseInterval } from '../hooks/Use_Interval';
import { secondsToTime } from '../utils/Seconds_To_Time';
import Button from './Button';
import Timer from './Timer';

interface PomodoroProps {
    pomodoroTime: number;
    shortRestTime: number;
    LongRestTime: number;
    cycles: number;
}

const PomodotoTimer = (props: PomodoroProps): JSX.Element => {
    const [mainTime, setMainTime] = React.useState(props.pomodoroTime);
    const [timeCounting, setTimeCounting] = React.useState(false);
    const [working, setWorking] = React.useState(false);
    const [resting, setResting] = React.useState(false);

    React.useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');
    }, [working]);

    UseInterval(
        () => {
            setMainTime(mainTime - 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = () => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.pomodoroTime);
    };

    const configureRest = (long: boolean) => {
        setTimeCounting(true);
        setWorking(false);
        setResting(true);

        if (long) setMainTime(props.LongRestTime);
        else setMainTime(props.shortRestTime);
    };

    return (
        <div className="pomodoro">
            <h2>You&apos;re: Working!</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Work" onClick={() => configureWork()}></Button>
                <Button
                    className={!working && !resting ? 'hidden' : ''}
                    text="Rest"
                    onClick={() => configureRest(false)}
                ></Button>
                <Button
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => setTimeCounting(!timeCounting)}
                ></Button>
            </div>

            <div className="details">
                <p>Testing: asadasdsaads adsadsaasd asdadsdsa a</p>
                <p>Testing: asadasdsaads adsadsaasd asdadsdsa a</p>
                <p>Testing: asadasdsaads adsadsaasd asdadsdsa a</p>
                <p>Testing: asadasdsaads adsadsaasd asdadsdsa a</p>
            </div>
        </div>
    );
};

export default PomodotoTimer;
