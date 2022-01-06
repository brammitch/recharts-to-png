/// <reference types="react" />
import { Options } from 'html2canvas';
export declare type UseCurrentPng = [
    () => Promise<string | undefined>,
    {
        isLoading: boolean;
        ref: React.MutableRefObject<any>;
    }
];
/**
 * @param options - optional html2canvas Options object
 */
export declare function useCurrentPng(options?: Partial<Options>): UseCurrentPng;
