/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas from 'html2canvas';
import { useCallback, useRef, useState } from 'react';

/**
 * @param options - optional Html2CanvasOptions object
 *
 * @deprecated Prefer useCurrentPng for faster performance
 */
export function useRechartToPng(
  options: Html2CanvasOptions
): [string, (node: unknown) => Promise<void>] {
  const [png, setPng] = useState<string>('');

  const ref = useCallback(
    async (node: any) => {
      if (node !== null && node?.container) {
        const data = await html2canvas(node.container as HTMLElement, {
          logging: false,
          ...options,
        }).then((canvas) => canvas.toDataURL('image/png', 1.0));
        setPng(data);
      }
    },
    [options]
  );

  return [png, ref];
}

export type UseCurrentPng = [
  () => Promise<string | undefined>,
  {
    isLoading: boolean;
    ref: React.MutableRefObject<any>;
  }
];

/**
 * @param options - optional Html2CanvasOptions object
 */
export function useCurrentPng(options: Html2CanvasOptions = { logging: false }): UseCurrentPng {
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
