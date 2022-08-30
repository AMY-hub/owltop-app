import { ButtonIconProps, Icons } from './ButtonIcon.props';
import cn from 'classnames';

import styles from './ButtonIcon.module.css';

export const ButtonIcon = ({ styleType, icon, className, ...props }: ButtonIconProps): JSX.Element => {

    const IconComp = Icons[icon];

    return (
        <button
            className={cn(
                styles.button, className,
                {
                    [styles.primary]: styleType === 'primary',
                    [styles.white]: styleType === 'white',
                }
            )}
            {...props}
        >
            <IconComp />
        </button >
    );
};
