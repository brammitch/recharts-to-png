import { render, renderHook, screen } from '@testing-library/react';
import { CurrentPng, CurrentPngProps, useCurrentPng } from '../index';

describe('useCurrentPng', () => {
  test('returns a tuple', async () => {
    const { result } = renderHook(() => useCurrentPng());

    expect(result.current.length).toBe(2);
  });
});

function TestComponent(props: CurrentPngProps): JSX.Element {
  return <div>{props.isLoading ? 'Loading' : 'Not Loading'}</div>;
}

describe('CurrentPng', () => {
  test('does stuff', () => {
    render(<CurrentPng>{(props) => <TestComponent {...props} />}</CurrentPng>);

    expect(screen.getByText('Not Loading')).toBeDefined();
  });
});
