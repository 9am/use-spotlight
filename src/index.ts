import { useCallback, useEffect, useRef, useState } from 'react';
import type { Size, Rect } from './types';

const getStyle = ([x, y, w, h]: Size) => ({
    content: '',
    display: 'block',
    position: 'absolute',
    top: '0',
    left: '0',
    width: `${w}px`,
    height: `${h}px`,
    transform: `translate(${x}px, ${y}px)`,
    transitionProperty: 'transform, width, height',
    transitionDuration: '200ms',
    background: 'rgba(255 0 0 / 0.1)', // TODO
    pointerEvents: 'none',
});

const initialSize: Size = [0, 0, 0, 0];
const initialRect: Rect = { x: 0, y: 0, width: 0, height: 0 };

export const useSpotlight = (options = {}) => {
    const [size, setSize] = useState<Size>(initialSize);
    const [containerRect, setContainerRect] = useState<Rect>(initialRect);
    const [activeRect, setActiveRect] = useState<Rect>(initialRect);

    let cRef = useRef<HTMLElement | null>(null);
    let aRef = useRef<HTMLElement | null>(null);

    const containerRefHandler = useCallback(
        (node: HTMLElement) => {
            cRef.current = node;
            const rect = node?.getBoundingClientRect() ?? initialRect;
            setContainerRect({
                ...rect,
                x: rect.x - node.scrollLeft,
                y: rect.y - node.scrollTop,
            });
        },
        [setContainerRect]
    );
    const activeRefHandler = useCallback(
        (node: HTMLElement) => {
            aRef.current = node;
            setActiveRect(node?.getBoundingClientRect() ?? initialRect);
        },
        [setActiveRect]
    );

    useEffect(() => {
        setSize([
            activeRect.x - containerRect.x,
            activeRect.y - containerRect.y,
            activeRect.width,
            activeRect.height,
        ]);
    }, [containerRect, activeRect, setSize]);

    useEffect(() => {
        const cNode = cRef.current;
        const aNode = aRef.current;
        if (!cNode || !aNode) {
            return () => setSize(initialSize);
        }
        let resizeObserver: ResizeObserver | null = null;
        // TODO throttle
        const handleResize = () => {
            const test = cNode.getBoundingClientRect();
            const cSize = {
                ...test,
                x: test.x - cNode.scrollLeft,
                y: test.y - cNode.scrollTop,
            };
            const aSize = aNode.getBoundingClientRect();
            setSize([aSize.x - cSize.x, aSize.y - cSize.y, aSize.width, aSize.height]);
        };
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(cNode);
            resizeObserver.observe(aNode);
        }
        handleResize();
        const prev = cNode.style.position;
        cNode.style.position = 'relative';
        return () => {
            cNode.style.position = prev;
            resizeObserver?.disconnect();
        };
    }, [containerRect, activeRect, setSize]);

    return {
        stage: containerRefHandler,
        actor: activeRefHandler,
        style: getStyle(size),
        size,
    };
};

export type { Size, Rect } from './types';

export default null;
