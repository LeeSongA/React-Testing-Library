import React from 'react';
import { render } from '@testing-library/react';
import Profile from './Profile';

describe('<Profile />', () => {
    it('matches snapshot', () => {
        const utils = render(<Profile username="velopert" name="Song" />);
        expect(utils.container).toMatchSnapshot();
    });
    it('shows the props correctly', () => {
        const utils = render(<Profile username="velopert" name="Song" />);
        utils.getByText('velopert');
        utils.getByText('(Song)');
        utils.getByText(/S/);
    })
})