import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { Line, LineChart, XAxis, YAxis } from 'recharts';
import { CurrentPng, CurrentPngProps, useCurrentPng } from '../index';

jest.setTimeout(10000);

describe('useCurrentPng', () => {
  test('returns a tuple', async () => {
    const { result } = renderHook(() => useCurrentPng());

    expect(result.current.length).toBe(2);
  });
});

function TestComponent(props: CurrentPngProps) {
  const handleClick = async () => {
    await props.getPng();
  };

  return (
    <>
      <LineChart width={200} height={200} data={[{ name: 'a', amt: 1 }]} ref={props.chartRef}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line type="monotone" dataKey="amt" stroke="#82ca9d" />
      </LineChart>
      <button onClick={() => handleClick()}>Get Png</button>
    </>
  );
}

describe('CurrentPng', () => {
  test('uses render props', async () => {
    const getPng = jest.fn();

    render(
      <CurrentPng>
        {({ chartRef, isLoading }) => (
          <TestComponent chartRef={chartRef} getPng={getPng} isLoading={isLoading} />
        )}
      </CurrentPng>
    );

    const button = await screen.findByText('Get Png');
    fireEvent.click(button);
    expect(getPng).toHaveBeenCalledTimes(1);
  });
});
