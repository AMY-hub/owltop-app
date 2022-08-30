import cn from 'classnames';

import { ParagraphProps } from './Paragraph.props';

import styles from './Paragraph.module.css';

export const Paragraph = ({ fontSize = 'm', children, className, ...props }: ParagraphProps): JSX.Element => {
    return (
        <p className={cn(styles.text, className, styles[fontSize])}
            {...props}
        >
            {children}
        </p>
    );
};
