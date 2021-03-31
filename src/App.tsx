import React from 'react';

import PomodotoTimer from './components/Pomodoro_Timer';

function App(): JSX.Element {
    return (
        <div className="container">
            <PomodotoTimer
                pomodoroTime={10}
                shortRestTime={2}
                LongRestTime={5}
                cycles={4}
            />
        </div>
    );
}

export default App;
