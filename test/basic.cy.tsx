import * as React from 'react';
import promisify from 'cypress-promise';
import pick from 'lodash.pick';
import { List } from '../demo';

describe('basic', () => {
    it("doesn't break render", () => {
        cy.mount(<List />);
    });

    it('light common style', () => {
        cy.mount(<List />);
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
        cy.mount(<List />);
        const light = cy.get('[data-cy=light]');
        light.should('have.css', 'width', '0px');
        light.should('have.css', 'height', '0px');
        light.should('have.css', 'transform', 'matrix(1, 0, 0, 1, 0, 0)');
    });

    it('renders the light with actor size', async () => {
        cy.mount(<List />);
        const light = await promisify(cy.get('[data-cy=light]'));
        // disable animation
        light[0]!.style.setProperty('--spotlight-duration', '0');
        let target = await promisify(cy.get('span:first').click());
        const attr = ['x', 'y', 'width', 'height'];
        const rectTarget = pick(target[0]!.getBoundingClientRect(), attr);
        const rectLight = pick(light[0]!.getBoundingClientRect(), attr);
        expect(JSON.stringify(rectLight)).to.equal(JSON.stringify(rectTarget));
    });
});
