import cn from 'classnames';

import { TagProps } from './Tag.props';

import styles from './Tag.module.css';

export const Tag = ({ tagSize = 'm', color = 'ghost', href, children, className, ...props }: TagProps): JSX.Element => {
    return (
        <div className={cn(styles.tag, styles[tagSize], styles[color], className)}
            {...props}>
            {href ?
                <a href={href}>{children}</a>
                : <>{children}</>
            }
        </div>
    );
};
