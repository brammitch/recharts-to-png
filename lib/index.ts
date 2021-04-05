import html2canvas from 'html2canvas';
import { useCallback, useState } from 'react';

/**
 * Returns a PNG URL string
 * @param options - Html2Canvas formatting options
 */
export function useRechartToPng(
  options: Html2CanvasOptions = {}
): [string, (node: unknown) => Promise<void>] {
  const [png, setPng] = useState<string>('');

  const ref = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (node: any) => {
      if (node !== null && node?.container) {
        const data = await html2canvas(node.container as HTMLElement, options).then((canvas) =>
          canvas.toDataURL('image/png', 1.0)
        );
        setPng(data);
      }
    },
    [options]
  );

  return [png, ref];
}
