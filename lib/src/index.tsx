/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas, { Options } from 'html2canvas';
import { Component, createRef, useCallback, useRef, useState } from 'react';

export type UseCurrentPng = [
  () => Promise<string | undefined>,
  {
    isLoading: boolean;
    ref: React.MutableRefObject<any>;
  }
];

/**
 * @param options - optional html2canvas Options object
 */
export function useCurrentPng(options?: Partial<Options>): UseCurrentPng {
  const ref = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);

  const getPng = useCallback(async () => {
    if (ref !== null && ref?.current?.container) {
      setIsLoading(true);

      return await html2canvas(ref.current.container as HTMLElement, {
        logging: false,
        ...options,
      }).then((canvas) => {
        setIsLoading(false);
        return canvas.toDataURL('image/png', 1.0);
      });
    }
  }, [options]);

  return [
    getPng,
    {
      ref,
      isLoading,
    },
  ];
}

export interface CurrentPngProps {
  chartRef: React.RefObject<any>;
  getPng: (options?: Partial<Options>) => Promise<string | undefined>;
  isLoading: boolean;
}

interface Props {
  children: (props: CurrentPngProps) => React.ReactNode;
}

interface State {
  isLoading: boolean;
}

export class CurrentPng extends Component<Props, State> {
  private chartRef = createRef<any>();

  state: State = {
    isLoading: false,
  };

  getPng = async (options?: Partial<Options>) => {
    if (this.chartRef.current?.container) {
      this.setState({ isLoading: true });

      return await html2canvas(this.chartRef.current.container as HTMLElement, {
        ...options,
      }).then((canvas) => {
        this.setState({ isLoading: false });
        return canvas.toDataURL('image/png', 1.0);
      });
    }
  };

  render() {
    return this.props.children({
      chartRef: this.chartRef,
      getPng: this.getPng,
      isLoading: this.state.isLoading,
    });
  }
}
