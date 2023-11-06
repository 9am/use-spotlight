import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';
import { useSpotlight } from './src';
import { generate } from 'random-words';

const config = Array.from({ length: 10 }).map(
    () => ({ value: generate({ minLength: 2 }) })
);

const List = (props) => {
    const [active, setActive] = useState(-1);
    const { stage, actor, style } = useSpotlight();
    return (
        <ul {...props} ref={stage}>
            {config.map(({ value }) => (
                <li
                    key={value}
                    className={value === active ? 'active' : ''}
                    onClick={() => setActive(value)}
                >
                    <span ref={value === active ? actor : null}>{value}</span>
                </li>
            ))}
            <div style={style} />
        </ul>
    );
};

const App = () => (
    <>
        <List className="horizontal" />
        <List className="vertical" />
    </>
);

const root = createRoot(document.querySelector('#app'));
root.render(<App />);
