import { motion } from 'framer-motion';
import { Htag } from '../Htag/Htag';

import styles from './Preloader.module.css';

export const Preloader = (): JSX.Element => {

    const variants = {
        start: { opacity: 1, scale: 0 },
        end: { opacity: 0, scale: 1 }
    };

    return (
        <div className={styles.wrapper}>
            <Htag tag='h2' className={styles.wrapper__title}>Loading</Htag>
            <motion.div
                className={styles.bounce}
                initial='start'
                animate='end'
                variants={variants}
                transition={{
                    repeat: Infinity,
                    duration: 1.2,
                    staggerChildren: 0.5
                }}
            >
                <motion.div
                    className={styles.second}
                    variants={variants}
                    transition={{ repeat: Infinity, duration: 0.7 }}>
                </motion.div>
            </motion.div>
        </div>
    );
};
