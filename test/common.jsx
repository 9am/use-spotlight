import React from 'react';
import { List } from '../demo';
import pick from 'lodash.pick';

export const DELAY = 300;

const getSize = (actor, light) => {
    const attr = ['x', 'y', 'width', 'height'];
    const rectActor = pick(actor[0].getBoundingClientRect(), attr);
    const rectLight = pick(light[0].getBoundingClientRect(), attr);
    return { rectActor, rectLight };
};

export const isSameSize = (actor, light) => {
    const { rectLight, rectActor } = getSize(actor, light);
    expect(JSON.stringify(rectLight)).to.equal(JSON.stringify(rectActor));
};

export const isNotSameSize = (actor, light) => {
    const { rectLight, rectActor } = getSize(actor, light);
    expect(JSON.stringify(rectLight)).not.to.equal(JSON.stringify(rectActor));
};

export const getCases =
    (Component = List) =>
    () => {
        it("doesn't break render", () => {
            cy.mount(<Component />);
        });

        it('light common style', () => {
            cy.mount(<Component />);
            const light = cy.get('[data-cy=light]');
            light.should('have.css', 'content', '""');
            light.should('have.css', 'display', 'block');
            light.should('have.css', 'box-sizing', 'border-box');
            light.should('have.css', 'position', 'absolute');
            light.should('have.css', 'top', '0px');
            light.should('have.css', 'left', '0px');
            light.should('have.css', 'pointer-events', 'none');
        });

        it('has no size with no actor', () => {
            cy.mount(<Component />);
            const light = cy.get('[data-cy=light]');
            light.should('have.css', 'width', '0px');
            light.should('have.css', 'height', '0px');
            light.should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
        });

        it('renders the light with actor size', () => {
            cy.mount(<Component />);
            cy.get('[data-cy=light]').then((light) => {
                // disable animation
                light[0].style.setProperty('--spotlight-duration', '0');
                cy.get('span:last')
                    .click()
                    .then((actor) => {
                        isSameSize(actor, light);
                    });
                // reset
                cy.get('[data-cy=reset]').click();
                const next = cy.get('[data-cy=light]');
                next.should('have.css', 'width', '0px');
                next.should('have.css', 'height', '0px');
            });
        });
    };
