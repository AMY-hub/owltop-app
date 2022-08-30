import { TopLevelCategory } from './page.interface';

export interface PageItem {
    alias: string;
    title: string;
    category: string;
    _id: string;
}

export interface MenuItem {
    _id: {
        secondCategory: string;
    },
    isOpened?: boolean;
    pages: PageItem[];
}

export interface TopLevelMenuItem {
    route: string;
    name: string;
    icon: JSX.Element;
    id: TopLevelCategory;
}
