import * as React from 'react';

global.React = React;

// Mocks for Recharts
window.getComputedStyle = jest.fn();
window.scrollTo = jest.fn();
