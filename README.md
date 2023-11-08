<div align="center">
    <h1>use-spotlight</h1>
	<p>A react hook that generates animated 'spotlight' for active target. 🎙</p>
    <p>
        <a href="https://github.com/9am/use-spotlight/blob/main/LICENSE">
            <img alt="GitHub" src="https://img.shields.io/github/license/9am/use-spotlight?style=flat-square&color=success">
        </a>
        <a href="https://www.npmjs.com/package/use-spotlight">
            <img alt="npm" src="https://img.shields.io/npm/v/use-spotlight?style=flat-square&color=orange">
        </a>
        <a href="https://www.npmjs.com/package/use-spotlight">
            <img alt="npm" src="https://img.shields.io/npm/dt/use-spotlight?style=flat-square&color=blue">
        </a>
        <a href="https://bundlephobia.com/package/use-spotlight@latest">
            <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/use-spotlight?style=flat-square">
        </a>
    </p>
</div>

## Usage

#### Install

```sh
npm install use-spotlight
```

#### JSX

```jsx
import { stage, actor, style } from 'use-spotlight'

() => {
    const [active, setActive] = useState(-1);
    // init hook
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
            <i style={style} />
        </ul>
    );
};
```

## Documentation

- TBD

## License
[MIT](LICENSE)
