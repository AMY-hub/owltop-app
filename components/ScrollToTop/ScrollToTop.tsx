import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

import { useScrollY } from '../../hooks/useScrollY';
import { ButtonIcon } from '../index';

import styles from './ScrollToTop.module.css';

export const ScrollToTop = (): JSX.Element => {
    const controls = useAnimation();
    const y = useScrollY();

    useEffect(() => {
        controls.start({ opacity: y / document.body.scrollHeight });
    }, [y, controls]);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <motion.div
            className={styles.scroll}
            animate={controls}
            initial={{ opacity: 0 }}
        >
            <ButtonIcon
                aria-label='К началу страницы'
                styleType='primary'
                icon='arrow'
                onClick={scrollToTop} />
        </motion.div>
    );
};