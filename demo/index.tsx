import React, { useState } from 'react';
import { useSpotlight } from '../src';
import { generate } from 'random-words';
import './index.css';

const getItem = () => {
    const word = generate({ minLength: 2 }).toString();
    return {
        label: word,
        value: `${self.crypto.randomUUID()}-${word}`,
    };
};
const config = Array.from({ length: 10 }).map(() => getItem());

export const List = ({ defaultActive = '', spotlightOptions = undefined, ...props }) => {
    const [list, setList] = useState(config);
    const [active, setActive] = useState(defaultActive);
    const { stage, actor, style } = useSpotlight(spotlightOptions);
    return (
        <>
            <ul {...props} ref={stage} data-cy="stage">
                {list.map(({ label, value }, i) => (
                    <li
                        key={value}
                        className={value === active ? 'active' : ''}
                        onClick={() => setActive(value)}
                    >
                        <span
                            ref={value === active ? actor : null}
                            data-cy={value === active ? 'actor' : ''}
                        >
                            {label}
                        </span>
                    </li>
                ))}
                <i style={style} data-cy="light" />
            </ul>
            <button data-cy="reset" onClick={() => setActive(defaultActive)}>
                reset active
            </button>
            <button
                data-cy="add"
                onClick={() => setList((state) => [getItem(), ...state])}
            >
                add child
            </button>
            <button data-cy="remove" onClick={() => setList((state) => state.slice(1))}>
                remove child
            </button>
            <button
                data-cy="update"
                onClick={() =>
                    setList((state) =>
                        state.map((item) =>
                            active === item.value
                                ? { ...item, label: Math.random() }
                                : item
                        )
                    )
                }
            >
                update
            </button>
        </>
    );
};

export const App = () => (
    <>
        <List className="horizontal" spotlightOptions={{ lightPseudo: '::before' }} />
        <List className="vertical" />
    </>
);
