import React from 'react';
import pick from 'lodash.pick';
import { List } from '../demo';
import { DELAY, isSameSize } from './common';

describe('resize', () => {
    it('size right when stage resize', () => {
        cy.mount(<List />);
        cy.get('[data-cy=light]').then((light) => {
            // disable animation
            light[0].style.setProperty('--spotlight-duration', '0s');
            // trigger light
            cy.get('span:last').click();
            // resize
            cy.get('[data-cy=stage]').then((stage) => {
                stage[0].style.height = '600px';
                cy.wait(DELAY);
                cy.get('[data-cy=actor]').then((actor) => {
                    isSameSize(actor, light);
                });
                stage[0].style.height = '400px';
                cy.wait(DELAY);
                cy.get('[data-cy=actor]').then((actor) => {
                    isSameSize(actor, light);
                });
            });
        });
    });
    it('size right when actor resize', () => {
        cy.mount(<List />);
        cy.get('[data-cy=light]').then((light) => {
            // disable animation
            light[0].style.setProperty('--spotlight-duration', '0s');
            // trigger light
            cy.get('span:last').click();
            // resize
            cy.get('[data-cy=actor]').then((actor) => {
                actor[0].style.display = 'inline-block';
                actor[0].style.width = '100px';
                actor[0].style.height = '100px';
                cy.wait(DELAY);
                cy.get('[data-cy=actor]').then((next) => {
                    isSameSize(next, light);
                });
            });
        });
    });
    it('size right when sibling resize', () => {
        cy.mount(<List />);
        cy.get('[data-cy=light]').then((light) => {
            // disable animation
            light[0].style.setProperty('--spotlight-duration', '0s');
            // trigger light
            cy.get('span:last').click();
            // resize
            cy.get('span:first').then((sibling) => {
                sibling[0].style.display = 'inline-block';
                sibling[0].style.width = '100px';
                sibling[0].style.height = '100px';
                cy.wait(DELAY);
                cy.get('[data-cy=actor]').then((next) => {
                    isSameSize(next, light);
                });
            });
        });
    });
});
