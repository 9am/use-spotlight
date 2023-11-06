<div align="center"> <h1>use-spotlight</h1>
	<p>A react hook that generates 'spotlight' for active target. 🎙</p>
    <p>
        <a href="https://github.com/9am/use-spotlight/blob/main/LICENSE">
            <img alt="GitHub" src="https://img.shields.io/github/license/9am/use-spotlight?style=flat-square&color=success">
        </a>
        <a href="https://www.npmjs.com/package/@9am/use-spotlight">
            <img alt="npm" src="https://img.shields.io/npm/v/@9am/use-spotlight?style=flat-square&color=orange">
        </a>
        <a href="https://www.npmjs.com/package/@9am/use-spotlight">
            <img alt="npm" src="https://img.shields.io/npm/dt/@9am/use-spotlight?style=flat-square&color=blue">
        </a>
        <a href="https://bundlephobia.com/package/@9am/use-spotlight@latest">
            <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@9am/use-spotlight?style=flat-square">
        </a>
    </p>
</div>

## Features

- TBD

## Demo

- TBD

|Description|Live demo|
|:---------:|:-------:|


## Usage

#### Install

```sh
npm install use-spotlight
```

#### JSX

```jsx
import { stage, actor, style } from 'use-spotlight'

const List = () => {
    const [active, setActive] = useState(-1);
    const { stage, actor, style } = useSpotlight();
    return (
        // set ref for 'stage'
        <ul ref={stage}>
            {listData.map(({ value }) => (
                <li
                    key={value}
                    onClick={() => setActive(value)}
                    // set ref for 'actor'
                    ref={value === active ? actor : null}
                >
                    {value}
                </li>
            ))}
            // set 'style' to the light
            <div style={style} />
        </ul>
    );
};
```

## Documentation

- TBD

## License
[MIT](LICENSE)
