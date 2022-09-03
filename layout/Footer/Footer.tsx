import Link from 'next/link';
import { format } from 'date-fns';
import cn from 'classnames';

import { FooterProps } from './Footer.props';

import styles from './Footer.module.css';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
        <footer className={cn(styles.footer, className)}
            {...props}>
            <div>
                OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены
            </div>
            <Link href='/privacy'>
                <a target='_blank'>
                    Пользовательское соглашение
                </a>
            </Link>
            <Link href='/terms'>
                <a target='_blank'>
                    Политика конфиденциальности
                </a>
            </Link>
        </footer>
    );
};
