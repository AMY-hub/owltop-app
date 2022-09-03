import { DetailedHTMLProps, HTMLProps } from 'react';
import { MenuItem } from '../../interfaces/menu.interface';

export interface CategoryComponentProps extends DetailedHTMLProps<HTMLProps<HTMLDivElement>, HTMLDivElement> {
    menu: MenuItem[];
    route: string;
}