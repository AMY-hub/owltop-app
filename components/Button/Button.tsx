import { motion } from 'framer-motion';
import cn from 'classnames';

import ArrowIcon from './arrow.svg';
import { ButtonProps } from './Button.props';

import styles from './Button.module.css';

export const Button = ({ styleType, arrow = 'none', children, className, ...props }: ButtonProps): JSX.Element => {

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            className={cn(
                styles.button, className,
                {
                    [styles.primary]: styleType === 'primary',
                    [styles.ghost]: styleType === 'ghost',
                }
            )}
            {...props}
        >
            {children}
            {arrow !== 'none' &&
                <span className={cn(styles.arrow, {
                    [styles.down]: arrow === 'down',
                })}
                >
                    <ArrowIcon />
                </span>}
        </motion.button >
    );
};
