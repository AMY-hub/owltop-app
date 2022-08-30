import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { SideBar } from '../SideBar/SideBar';
import { ButtonIcon } from '../../components';
import Logo from '../logo.svg';

import { HeaderProps } from './Header.props';

import styles from './Header.module.css';

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {

    const [isOpened, setIsOpened] = useState<boolean>(false);
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setIsOpened(false);
    }, [router]);

    const variants = {
        opened: {
            opacity: 1,
            x: 0,
            transition: {
                stiffness: 20
            }
        },
        closed: {
            opacity: shouldReduceMotion ? 1 : 0,
            x: '100%'
        }
    };

    return (
        <header className={cn(styles.header, className)}
            {...props}>
            <Logo />
            <ButtonIcon
                onClick={() => setIsOpened(!isOpened)}
                styleType='white'
                icon='menu' />
            <motion.div
                className={styles.mobile_menu}
                variants={variants}
                initial='closed'
                animate={isOpened ? 'opened' : 'closed'}
            >
                <SideBar />
                <ButtonIcon
                    onClick={() => setIsOpened(!isOpened)}
                    className={styles.menu_close}
                    styleType='white'
                    icon='close' />
            </motion.div>
        </header>
    );
};
