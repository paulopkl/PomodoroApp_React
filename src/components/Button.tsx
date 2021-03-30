import React from 'react';

interface ButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
}

const Button = (props: ButtonProps): JSX.Element => {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.text}
        </button>
    );
};

export default Button;
