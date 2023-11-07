import { useCallback, useEffect, useRef, useState } from 'react';
import type { Size, Rect } from './types';

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

const getScrollRect = (node: HTMLElement): Rect => {
    const rect = node?.getBoundingClientRect() ?? initialRect;
    return {
        ...rect,
        x:
            rect.x -
            (node?.scrollLeft ?? 0) +
            getStyleValueLength(node, 'border-left-width'),
        y:
            rect.y -
            (node?.scrollTop ?? 0) +
            getStyleValueLength(node, 'border-top-width'),
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
});

export const useSpotlight = (options = {}) => {
    const [size, setSize] = useState<Size>(initialSize);
    const [stageRect, setContainerRect] = useState<Rect>(initialRect);
    const [actorRect, setActiveRect] = useState<Rect>(initialRect);

    let sRef = useRef<HTMLElement | null>(null);
    let aRef = useRef<HTMLElement | null>(null);

    const stageRefHandler = useCallback(
        (node: HTMLElement) => {
            sRef.current = node;
            setContainerRect(getScrollRect(node));
        },
        [setContainerRect]
    );
    const actorRefHandler = useCallback(
        (node: HTMLElement) => {
            aRef.current = node;
            setActiveRect(node?.getBoundingClientRect() ?? initialRect);
        },
        [setActiveRect]
    );

    useEffect(() => {
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
        // TODO throttle
        const handleResize = () => {
            const sSize = getScrollRect(sNode);
            const aSize = aNode.getBoundingClientRect();
            setSize([aSize.x - sSize.x, aSize.y - sSize.y, aSize.width, aSize.height]);
        };
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(sNode);
            resizeObserver.observe(aNode);
        }
        handleResize();
        const prev = sNode.style.position;
        sNode.style.position = 'relative';
        return () => {
            sNode.style.position = prev;
            resizeObserver?.disconnect();
        };
    }, [stageRect, actorRect, setSize]);

    return {
        stage: stageRefHandler,
        actor: actorRefHandler,
        style: getStyle(size),
        size,
    };
};

export type { Size, Rect } from './types';

export default null;
