<div align="center">
    <img src="https://raw.githubusercontent.com/9am/use-spotlight/main/logo.svg" alt="use-spotlight-logo" width="140" height="140" />
    <h1>use-spotlight</h1>
	<p>A react hook that generates a animated 'spotlight' follows the active target. 🎙</p>
    <p>
        <a href="https://github.com/9am/use-spotlight/blob/main/LICENSE">
            <img alt="GitHub" src="https://img.shields.io/github/license/9am/use-spotlight?style=flat-square&color=success">
        </a>
        <a href="https://github.com/9am/use-spotlight/actions/workflows/test.yml">
            <img alt="test" src="https://github.com/9am/use-spotlight/actions/workflows/test.yml/badge.svg">
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


## Features

- 🔦 Generate a 'spotlight' that **follows the size and position** of any active target.
- 👟 **Auto-updated** after resizing or DOM changing.
- ⚡️ Options to fit any position between **smooth effect** to **high-efficiency performance**.
- 🪩 Apply **customized style** to the 'light' easily.
- 💽 **≈ 2kB** minzipped.

## Demo

![spotlight](https://github.com/9am/use-spotlight/assets/1435457/ef54d5a7-460e-4396-a6c8-bf39703ed85e)

https://github.com/9am/use-spotlight/assets/1435457/5b570780-abb7-4df9-9e19-7454eafecce4

|Description|Live demo|
|:---------:|:-------:|
| **Basic** | [![Edit basic](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/basic-dfpl4w?fontsize=14&hidenavigation=1&module=%2Fsrc%2FtoggleButton.tsx&theme=dark) |
| **Auto-updated size** | [![Edit auto-follow-resize](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/auto-follow-resize-8grssc?fontsize=14&hidenavigation=1&module=%2Fsrc%2FtoggleButton.tsx&theme=dark) |
| **Auto-updated DOM change** | [![Edit auto-follow-mutation](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/auto-follow-mutation-jjlx8h?fontsize=14&hidenavigation=1&module=%2Fsrc%2FtoggleButton.tsx&theme=dark) |
| **Throttle** | [![Edit throttle](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/throttle-tpt53s?fontsize=14&hidenavigation=1&module=%2Fsrc%2FtoggleButton.tsx&theme=dark) |
| **Custom light style** | [![Edit custom style](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/custom-style-v6pwq3?fontsize=14&hidenavigation=1&module=%2Fsrc%2FtoggleButton.tsx&theme=dark) |

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

### `useSpotlight({ throttleWait, stageBorderEdge })`

#### Parameters

- `throttleWait`: The number of milliseconds to throttle invocations to. `default: 0`
- `stageBorderEdge`: With default setting, the 'light' will be positioned relative to the **padding edge** of the 'stage', which will cause an offset if 'stage' has **border**s. Set to `true`, if want to use the **border edge**, which will hurt performance but be more accurate on the position. `default: false`
- `stageMutation`: Enable watching 'stage' `childlist` `subtree` DOM mutation. `default: false`

#### Returns

- `stage`: The RefCallback which will be assigned to node as container.
- `actor`: The RefCallback which will be assigned to node as target to follow.
- `style`: A style object for the node 'light'.
- `size`: Provides the offset `[x, y, width, height]` between 'actor' and 'stage'.

## License
[MIT](LICENSE)
