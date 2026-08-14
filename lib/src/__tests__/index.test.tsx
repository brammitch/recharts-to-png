import '@testing-library/jest-dom';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import html2canvas from 'html2canvas';
import { Line, LineChart } from 'recharts';
import { CurrentPng, CurrentPngProps, useCurrentPng, useGenerateImage } from '../index';

jest.mock('html2canvas');

const mockHtml2canvas = html2canvas as jest.MockedFunction<typeof html2canvas>;

jest.setTimeout(10000);

type CaptureHook = () => [
  (callback?: BlobCallback) => Promise<string | undefined>,
  { isLoading: boolean; ref: React.MutableRefObject<Element | null> },
];

// useCurrentPng captures ref.current.parentElement, so the target needs a parent.
function svgInDiv() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  document.createElement('div').appendChild(svg);
  return svg;
}

describe.each<[string, CaptureHook, () => Element]>([
  ['useGenerateImage', useGenerateImage, () => document.createElement('div')],
  ['useCurrentPng', useCurrentPng, svgInDiv],
])('%s', (_name, useCaptureHook, createTarget) => {
  test('returns a tuple', () => {
    const { result } = renderHook(() => useCaptureHook());

    expect(result.current).toHaveLength(2);
  });

  test('clears isLoading after a successful capture', async () => {
    mockHtml2canvas.mockResolvedValue(document.createElement('canvas'));

    const { result } = renderHook(() => useCaptureHook());
    result.current[1].ref.current = createTarget();

    await act(async () => {
      await expect(result.current[0]()).resolves.toContain('data:image/png');
    });

    expect(result.current[1].isLoading).toBe(false);
  });

  test('clears isLoading and propagates the error when html2canvas rejects', async () => {
    mockHtml2canvas.mockRejectedValue(new Error('tainted canvas'));

    const { result } = renderHook(() => useCaptureHook());
    result.current[1].ref.current = createTarget();

    await act(async () => {
      await expect(result.current[0]()).rejects.toThrow('tainted canvas');
    });

    expect(result.current[1].isLoading).toBe(false);
  });
});

function TestComponent(props: CurrentPngProps) {
  const handleClick = async () => {
    await props.getPng();
  };

  return (
    <>
      <LineChart width={200} height={200} data={[{ name: 'a', amt: 1 }]} ref={props.chartRef}>
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

    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(getPng).toHaveBeenCalledTimes(1);
  });

  test('clears isLoading and propagates the error when html2canvas rejects', async () => {
    mockHtml2canvas.mockRejectedValue(new Error('tainted canvas'));

    let props!: CurrentPngProps;

    render(
      <CurrentPng>
        {(renderProps) => {
          props = renderProps;
          return (
            <div>
              <svg ref={renderProps.chartRef} />
            </div>
          );
        }}
      </CurrentPng>
    );

    await act(async () => {
      await expect(props.getPng()).rejects.toThrow('tainted canvas');
    });

    expect(props.isLoading).toBe(false);
  });
});
