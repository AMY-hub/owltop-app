import { DetailedHTMLProps, HTMLProps, ReactNode } from 'react';

export interface SortProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    sort: SortEnum;
    setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
    Rating,
    Price
}