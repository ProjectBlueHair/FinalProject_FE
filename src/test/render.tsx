import * as React from 'react';
import { ReactElement } from 'react';
import { render as reactRender } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/config';

const render = (ui: ReactElement, { ...options } = {}) =>
    reactRender(ui, {
        wrapper: ({ children }) => (
            <Provider store={store}>
                {children}
            </Provider>
        ),
        ...options
    });

export * from '@testing-library/react';
export { render };