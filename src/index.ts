import { useCallback, useEffect, useRef, useState, useInsertionEffect } from 'react';
import throttle from 'lodash.throttle';
import {
    DEFAULT_SIZE,
    DEFAULT_RECT,
    DEFAULT_OPTIONS,
    STYLE,
    STYLE_TEXT,
    STAGE_CLASSNAME,
} from './types';
import type { Size, Rect, Style, SpotlightOptions, Spotlight } from './types';

const useInsertion = useInsertionEffect ?? useEffect;

const getStyleValueLength = (node: HTMLElement, attr: string): number => {
    try {
        const val = getComputedStyle(node, null)?.getPropertyValue(attr) ?? '';
        return +val.replace('px', '');
    } catch (error) {
        return 0;
    }
};

const getScrollRect = (node: HTMLElement, stageBorderEdge: boolean): Rect => {
    const rect = node?.getBoundingClientRect() ?? DEFAULT_RECT;
    const borderLeft = stageBorderEdge
        ? getStyleValueLength(node, 'border-left-width')
        : 0;
    const borderTop = stageBorderEdge ? getStyleValueLength(node, 'border-top-width') : 0;
    return {
        ...rect,
        x: rect.x - (node?.scrollLeft ?? 0) + borderLeft,
        y: rect.y - (node?.scrollTop ?? 0) + borderTop,
    };
};

const getVariables = ([x, y, w, h]: Size): Style => ({
    '--spotlight-x': `${x}px`,
    '--spotlight-y': `${y}px`,
    '--spotlight-w': `${w}px`,
    '--spotlight-h': `${h}px`,
});

export const useSpotlight = (options?: SpotlightOptions): Spotlight => {
    const { throttleWait, stageBorderEdge, stageMutation, lightPseudo } = {
        ...DEFAULT_OPTIONS,
        ...options,
    };
    const [size, setSize] = useState<Size>(DEFAULT_SIZE);
    const [stageRect, setStageRect] = useState<Rect>(DEFAULT_RECT);
    const [actorRect, setActorRect] = useState<Rect>(DEFAULT_RECT);

    let sRef = useRef<HTMLElement | null>(null);
    let aRef = useRef<HTMLElement | null>(null);

    const stageRefCallback = useCallback(
        (node: HTMLElement | null) => {
            sRef.current = node;
            setStageRect(node ? getScrollRect(node, stageBorderEdge) : DEFAULT_RECT);
        },
        [setStageRect, stageBorderEdge]
    );
    const actorRefCallback = useCallback(
        (node: HTMLElement | null) => {
            aRef.current = node;
            setActorRect(node?.getBoundingClientRect() ?? DEFAULT_RECT);
        },
        [setActorRect]
    );

    /* handle ref change */
    useEffect(() => {
        setSize([
            actorRect.x - stageRect.x,
            actorRect.y - stageRect.y,
            actorRect.width,
            actorRect.height,
        ]);
    }, [stageRect, actorRect, setSize]);

    /* handle resize and mutation */
    useEffect(() => {
        const sNode = sRef.current;
        const aNode = aRef.current;
        if (!sNode || !aNode) {
            return () => setSize(DEFAULT_SIZE);
        }
        let resizeObserver: ResizeObserver | null = null;
        let mutationObserver: MutationObserver | null = null;
        const handleResize = throttle(() => {
            // 'stage' or 'actor' size updated
            const sSize = getScrollRect(sNode, stageBorderEdge);
            const aSize = aNode.getBoundingClientRect();
            setSize([aSize.x - sSize.x, aSize.y - sSize.y, aSize.width, aSize.height]);
        }, throttleWait);
        const handleMutation = () => {
            // 'stage' or 'actor' mutation
            handleResize();
        };
        if (typeof ResizeObserver !== 'undefined') {
            resizeObserver = new ResizeObserver(handleResize);
            resizeObserver.observe(sNode);
            resizeObserver.observe(aNode);
        }
        if (typeof MutationObserver !== 'undefined') {
            mutationObserver = new MutationObserver(handleMutation);
            if (stageMutation) {
                mutationObserver.observe(sNode, {
                    subtree: true,
                    childList: true,
                });
            }
            mutationObserver.observe(aNode, {
                subtree: true,
                childList: true,
                characterData: true,
            });
        }
        return () => {
            resizeObserver?.disconnect();
            mutationObserver?.disconnect();
        };
    }, [stageRect, actorRect, setSize, throttleWait, stageBorderEdge, stageMutation]);

    /* handle stage style */
    useInsertion(() => {
        const sNode = sRef.current;
        if (!sNode) {
            return () => {};
        }
        const prev = sNode.style.position;
        sNode.style.position = 'relative';
        let style: HTMLStyleElement | null = null;
        if (lightPseudo && typeof document !== 'undefined') {
            // add <style> for pseudo
            style = document.createElement('style');
            style.textContent = `.${STAGE_CLASSNAME}${lightPseudo} {${STYLE_TEXT}}`;
            document.head?.appendChild(style);
            sNode.classList.add(STAGE_CLASSNAME);
            // set css variables to 'stage'
            const variables = getVariables(size);
            Object.keys(variables).forEach((key) =>
                sNode.style.setProperty(key, variables[key]!)
            );
        }
        return () => {
            sNode.style.position = prev;
            if (lightPseudo && typeof document !== 'undefined') {
                // clean <style>
                sNode.classList.remove(STAGE_CLASSNAME);
                style && document.head?.removeChild(style);
            }
        };
    }, [size, lightPseudo]);

    return {
        stage: stageRefCallback,
        actor: actorRefCallback,
        style: { ...getVariables(size), ...STYLE },
        size,
    };
};

export type { Size, Style, SpotlightOptions, Spotlight } from './types';

export default null;
