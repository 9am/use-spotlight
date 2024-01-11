import type { RefCallback, CSSProperties } from 'react';

export type Size = [number, number, number, number];

export const DEFAULT_SIZE: Size = [0, 0, 0, 0];

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export const DEFAULT_RECT: Rect = { x: 0, y: 0, width: 0, height: 0 };

export type SpotlightOptions = {
    throttleWait?: number;
    stageBorderEdge?: boolean;
    stageMutation?: boolean;
    lightPseudo?: '::before' | '::after' | null;
};

export const DEFAULT_OPTIONS: Required<SpotlightOptions> = {
    throttleWait: 0,
    stageBorderEdge: false,
    stageMutation: false,
    lightPseudo: null,
};

export type Spotlight = {
    stage: RefCallback<any>;
    actor: RefCallback<any>;
    style: CSSProperties;
    size: Size;
};

export const STYLE: CSSProperties = {
    content: '""',
    display: 'block',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: 'var(--spotlight-w)',
    height: 'var(--spotlight-h)',
    transform: 'translate(var(--spotlight-x), var(--spotlight-y))',
    transitionProperty: 'transform, width, height',
    transitionDuration: 'var(--spotlight-duration, 200ms)',
    background: 'var(--spotlight-bg, rgba(255, 0, 0, 0.1))',
    pointerEvents: 'none',
    zIndex: '999',
    padding: '0px',
    margin: '0px',
    overflow: 'hidden',
};

export const STYLE_TEXT = Object.keys(STYLE).reduce((memo, key) => {
    const cssName = key.replace(/([A-Z])/, '-$1').toLowerCase();
    const cssVal = STYLE[key as keyof CSSProperties];
    return `${memo}${cssName}:${cssVal};`;
}, '');

export const STAGE_CLASSNAME = 'spotlight-stage';
