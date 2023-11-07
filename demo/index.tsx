import React, { useState } from 'react';
import { useSpotlight } from '../src';
import { generate } from 'random-words';
import './index.css';

const config = Array.from({ length: 10 }).map(() => ({
    value: generate({ minLength: 2 }),
}));

export const List = ({ defaultActive = -1, ...props }) => {
    const [active, setActive] = useState(defaultActive);
    const { stage, actor, style } = useSpotlight();
    return (
        <ul {...props} ref={stage} data-cy="stage">
            {config.map(({ value }) => (
                <li
                    key={value}
                    className={value === active ? 'active' : ''}
                    onClick={() => setActive(value)}
                >
                    <span
                        ref={value === active ? actor : null}
                        data-cy={value === active ? 'actor' : ''}
                    >
                        {value}
                    </span>
                </li>
            ))}
            <i style={style} data-cy="light" />
        </ul>
    );
};

export const App = () => (
    <>
        <List className="horizontal" />
        <List className="vertical" />
    </>
);
