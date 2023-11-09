import { useCallback, useEffect, useRef, useState } from 'react';
import throttle from 'lodash.throttle';
import { defaultOptions } from './types';
import type { Size, Rect, SpotlightOptions, Spotlight } from './types';

const initialSize: Size = [0, 0, 0, 0];
const initialRect: Rect = { x: 0, y: 0, width: 0, height: 0 };

const getStyleValueLength = (node: HTMLElement, attr: string): number => {
    try {
        const val = getComputedStyle(node, null)?.getPropertyValue(attr) ?? '';
        return +val.replace('px', '');
    } catch (error) {
        return 0;
    }
};

const getScrollRect = (node: HTMLElement, enableBorderEdge: boolean): Rect => {
    const rect = node?.getBoundingClientRect() ?? initialRect;
    const borderLeft = enableBorderEdge
        ? getStyleValueLength(node, 'border-left-width')
        : 0;
    const borderTop = enableBorderEdge
        ? getStyleValueLength(node, 'border-top-width')
        : 0;
    return {
        ...rect,
        x: rect.x - (node?.scrollLeft ?? 0) + borderLeft,
        y: rect.y - (node?.scrollTop ?? 0) + borderTop,
    };
};

const getStyle = ([x, y, w, h]: Size) => ({
    '--spotlight-x': `${x}px`,
    '--spotlight-y': `${y}px`,
    '--spotlight-w': `${w}px`,
    '--spotlight-h': `${h}px`,
    '--spotlight-duration': '200ms',
    '--spotlight-bg': 'rgba(255, 0, 0, 0.1)',
    content: '""',
    display: 'block',
    boxSizing: 'border-box',
    position: 'absolute',
    top: '0px',
    left: '0px',
    width: 'var(--spotlight-w)',
    height: 'var(--spotlight-h)',
    transform: `translate(var(--spotlight-x), var(--spotlight-y))`,
    transitionProperty: 'transform, width, height',
    transitionDuration: 'var(--spotlight-duration)',
    background: 'var(--spotlight-bg)',
    pointerEvents: 'none',
    zIndex: '999',
    padding: '0px',
    margin: '0px',
});

export const useSpotlight = (options?: SpotlightOptions): Spotlight => {
    const { throttleWait, enableBorderEdge } = { ...defaultOptions, ...options };
    const [size, setSize] = useState<Size>(initialSize);
    const [stageRect, setStageRect] = useState<Rect>(initialRect);
    const [actorRect, setActorRect] = useState<Rect>(initialRect);

    let sRef = useRef<HTMLElement | null>(null);
    let aRef = useRef<HTMLElement | null>(null);

    const stageRefCallback = useCallback(
        (node: HTMLElement | null) => {
            sRef.current = node;
            setStageRect(node ? getScrollRect(node, enableBorderEdge) : initialRect);
        },
        [setStageRect, enableBorderEdge]
    );
    const actorRefCallback = useCallback(
        (node: HTMLElement | null) => {
            aRef.current = node;
            setActorRect(node?.getBoundingClientRect() ?? initialRect);
        },
        [setActorRect]
    );

    useEffect(() => {
        // 'stage' or 'actor' ref updated
        setSize([
            actorRect.x - stageRect.x,
            actorRect.y - stageRect.y,
            actorRect.width,
            actorRect.height,
        ]);
    }, [stageRect, actorRect, setSize]);

    useEffect(() => {
        const sNode = sRef.current;
        const aNode = aRef.current;
        if (!sNode || !aNode) {
            return () => setSize(initialSize);
        }
        let resizeObserver: ResizeObserver | null = null;
        const handleResize = throttle(() => {
            // 'stage' or 'actor' size updated
            const sSize = getScrollRect(sNode, enableBorderEdge);
            const aSize = aNode.getBoundingClientRect();
            setSize([aSize.x - sSize.x, aSize.y - sSize.y, aSize.width, aSize.height]);
        }, throttleWait);
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(sNode);
            resizeObserver.observe(aNode);
        }
        const prev = sNode.style.position;
        sNode.style.position = 'relative';
        return () => {
            sNode.style.position = prev;
            resizeObserver?.disconnect();
        };
    }, [stageRect, actorRect, setSize, throttleWait, enableBorderEdge]);

    return {
        stage: stageRefCallback,
        actor: actorRefCallback,
        style: getStyle(size),
        size,
    };
};

export type { Size, Rect, SpotlightOptions, Spotlight } from './types';

export default null;
