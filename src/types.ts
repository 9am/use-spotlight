export type Size = [number, number, number, number];

export type Rect = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export type SpotlightOptions = {
    throttleWait?: number;
    enableBorderEdge?: boolean;
};

export const defaultOptions: Required<SpotlightOptions> = {
    throttleWait: 0,
    enableBorderEdge: false,
};

type RefCallback = (node: HTMLElement | null) => void;

export type Spotlight = {
    stage: RefCallback;
    actor: RefCallback;
    style: { [key: string]: string };
    size: Size;
};
