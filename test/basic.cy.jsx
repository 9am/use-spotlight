import React from 'react';
import { List } from '../demo';
import { getCases } from './common';

describe(
    'horizontal basic',
    getCases(() => <List className="horizontal" />)
);
describe(
    'vertical basic',
    getCases(() => <List className="horizontal" />)
);
describe(
    'horizontal with scroll',
    getCases(() => <List className="horizontal" style={{ width: '200px' }} />)
);
describe(
    'vertical with scroll',
    getCases(() => <List className="vertical" style={{ height: '200px' }} />)
);
