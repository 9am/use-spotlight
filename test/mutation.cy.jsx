import React from 'react';
import pick from 'lodash.pick';
import { List } from '../demo';
import { isSameSize } from './common';

describe('mutation', () => {
    it('size right when stage mutation', () => {
        cy.mount(<List />);
        cy.get('[data-cy=light]').then((light) => {
            // disable animation
            light[0].style.setProperty('--spotlight-duration', '0');
            // trigger light
            cy.get('span:last').click();
            // mutation
            cy.get('[data-cy=stage]').then((stage) => {
                cy.get('[data-cy=add]').click();
                cy.get('[data-cy=add]').click();
                cy.get('[data-cy=actor]').then((actor) => {
                    isSameSize(actor, light);
                });
                cy.get('[data-cy=remove]').click();
                cy.get('[data-cy=actor]').then((actor) => {
                    isSameSize(actor, light);
                });
            });
        });
    });
    // it('size right when actor mutation', () => {
    //     cy.mount(<List />);
    //     cy.get('[data-cy=light]').then((light) => {
    //         // disable animation
    //         light[0].style.setProperty('--spotlight-duration', '0');
    //         // trigger light
    //         cy.get('span:last').click();
    //         // mutation
    //         cy.get('[data-cy=update]').click();
    //         cy.get('[data-cy=actor]').then((actor) => {
    //             isSameSize(actor, light);
    //         });
    //     });
    // });
});
