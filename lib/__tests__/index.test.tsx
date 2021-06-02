import { renderHook } from '@testing-library/react-hooks';
import { useCurrentPng, useRechartToPng } from '../index';

describe('useRechartToPng', () => {
  test('returns a tuple', async () => {
    const { result } = renderHook(() => useRechartToPng());

    expect(result.current.length).toBe(2);
  });
});

describe('useCurrentPng', () => {
  test('returns a tuple', async () => {
    const { result } = renderHook(() => useCurrentPng());

    expect(result.current.length).toBe(2);
  });
});
