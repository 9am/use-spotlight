import type { RefCallback } from 'react';

export type Size = [number, number, number, number];

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type SpotlightOptions = {
    throttleWait?: number;
    stageBorderEdge?: boolean;
    stageMutation?: boolean;
};

export const defaultOptions: Required<SpotlightOptions> = {
    throttleWait: 0,
    stageBorderEdge: false,
    stageMutation: false,
};

export type Spotlight = {
    stage: RefCallback<any>;
    actor: RefCallback<any>;
    style: { [key: string]: string };
    size: Size;
};
