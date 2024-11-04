/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas, { Options as HTML2CanvasOptions } from 'html2canvas';
import { Component, createRef, useCallback, useRef, useState } from 'react';

export type UseGenerateImage<T extends HTMLElement = HTMLDivElement> = [
  (callback?: BlobCallback) => Promise<string | undefined>,
  {
    isLoading: boolean;
    ref: React.MutableRefObject<T | null>;
  },
];

export type UseGenerateImageArgs = {
  options?: HTML2CanvasOptions;
  quality?: number;
  type?: string;
};

/**
 * @param {{options: HTML2CanvasOptions, type: string, quality: number}} [args] Optional arguments.
 * @param {HTML2CanvasOptions} [args.options] An html2canvas Options object.
 * @param {number} [args.quality] Applies if the type is an image format that supports variable quality (such as "image/jpeg"), and is a number in the range 0.0 to 1.0 inclusive indicating the desired quality level for the resulting image.
 * @param {string} [args.type] Controls the type of the image to be returned (e.g. PNG or JPEG). The default is "image/png"; that type is also used if the given type isn't supported.
 *
 * [Reference: html.spec.whatwg.org](https://html.spec.whatwg.org/multipage/canvas.html#dom-canvas-todataurl-dev)
 */
export function useGenerateImage<T extends HTMLElement = HTMLDivElement>(
  args?: UseGenerateImageArgs
): UseGenerateImage<T> {
  const ref = useRef<T>(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateImage = useCallback(
    async (callback?: BlobCallback) => {
      if (ref !== null && ref?.current) {
        setIsLoading(true);

        return await html2canvas(ref.current as HTMLElement, {
          logging: false,
          ...args?.options,
        }).then((canvas) => {
          if (callback) {
            canvas.toBlob(callback, args?.type, args?.quality);
          }
          setIsLoading(false);
          return canvas.toDataURL(args?.type, args?.quality);
        });
      }
    },
    [args]
  );

  return [
    generateImage,
    {
      ref,
      isLoading,
    },
  ];
}

export type UseCurrentPng = [
  (callback?: BlobCallback) => Promise<string | undefined>,
  {
    isLoading: boolean;
    ref: React.MutableRefObject<any>;
  },
];

/**
 * @param options - optional html2canvas Options object
 */
export function useCurrentPng(options?: Partial<HTML2CanvasOptions>): UseCurrentPng {
  const ref = useRef<any>();
  const [isLoading, setIsLoading] = useState(false);

  const getPng = useCallback(
    async (callback?: BlobCallback) => {
      if (ref !== null && ref?.current?.container) {
        setIsLoading(true);

        return await html2canvas(ref.current.container as HTMLElement, {
          logging: false,
          ...options,
        }).then((canvas) => {
          if (callback) {
            canvas.toBlob(callback, 'image/png', 1.0);
          }
          setIsLoading(false);
          return canvas.toDataURL('image/png', 1.0);
        });
      }
    },
    [options]
  );

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
  getPng: (options?: Partial<HTML2CanvasOptions>) => Promise<string | undefined>;
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

  getPng = async (options?: Partial<HTML2CanvasOptions>) => {
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
