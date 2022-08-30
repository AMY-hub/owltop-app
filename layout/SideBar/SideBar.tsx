import cn from 'classnames';

import { Menu } from '../Menu/Menu';
import { Search } from '../../components';

import Logo from '../logo.svg';

import { SideBarProps } from './SideBar.props';
import styles from './SideBar.module.css';

export const SideBar = ({ className, ...props }: SideBarProps): JSX.Element => {
    return (
        <div {...props} className={cn(styles.sidebar, className)}>
            <Logo />
            <Search />
            <Menu />
        </div>
    );
};
