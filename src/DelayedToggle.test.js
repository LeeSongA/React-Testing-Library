import React from 'react';
import DelayedToggle from './DelayedToggle';
import {
    render,
    fireEvent,
    wait,
    waitForElement,
    waitForDomChange,
    waitForElementToBeRemoved
} from '@testing-library/react';

describe('<DelayedToggle />', () => {
    it('reveals text when toggle is ON', async () => {
        const { getByText } = render(<DelayedToggle />);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        await wait(() => getByText('야호!!'), { timeout: 3000 }); // 콜백 안의 함수가 에러를 발생시키지 않을 때까지 대기. timeout 기본값은 4500ms.
    });

    it('toggles text ON/OFF', async () => {
        const { getByText } = render(<DelayedToggle />);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        const text = await waitForElement(() => getByText('ON'));
        expect(text).toHaveTextContent('ON');
    });

    it('changes something when button is clicked', async () => {
        const { getByText, container } = render(<DelayedToggle />);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        const mutations = await waitForDomChange({ container });
        console.log(mutations);
    });

    it('removes text when toggle is OFF', async () => {
        const { getByText, container } = render(<DelayedToggle />);
        const toggleButton = getByText('토글');
        fireEvent.click(toggleButton);
        await waitForDomChange({ container });
        getByText('야호!!');
        fireEvent.click(toggleButton);
        await waitForElementToBeRemoved(() => getByText('야호!!'));
    });
});