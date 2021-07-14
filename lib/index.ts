/* eslint-disable @typescript-eslint/no-explicit-any */
import html2canvas, { Options } from 'html2canvas';
import { useCallback, useRef, useState } from 'react';

/**
 * @param options - optional html2canvas Options object
 *
 * @deprecated Prefer useCurrentPng for faster performance
 */
export function useRechartToPng(
  options?: Partial<Options>
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
