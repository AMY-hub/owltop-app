import { KeyboardEvent, useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, useReducedMotion } from 'framer-motion';
import cn from 'classnames';

import { topLevelMenu } from '../../helpers/helpers';
import { AppContext } from '../../context/AppContext';
import { PageItem, TopLevelMenuItem } from '../../interfaces/menu.interface';

import styles from './Menu.module.css';

export const Menu = (): JSX.Element => {

    const { menu, setMenu, firstCategory } = useContext(AppContext);
    const [announce, setAnnounse] = useState<'closed' | 'opened' | undefined>();
    const router = useRouter();
    const shouldReduceMotion = useReducedMotion();

    console.log('MENU:', menu);
    console.log('Category:', firstCategory);

    const variants = {
        visible: {
            marginBottom: '20px',
            transition: shouldReduceMotion ? {} : {
                staggerChildren: 0.05
            }
        },
        hidden: { marginBottom: 0 }
    };

    const variantsChildren = {
        visible: { opacity: 1, height: 'fit-content' },
        hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 }
    };

    const openSecondLevel = (levelName: string): void => {
        setMenu && setMenu(menu.map(m => {
            if (m._id.secondCategory === levelName) {
                setAnnounse(m.isOpened ? 'closed' : 'opened')
                m.isOpened = !m.isOpened;
            }
            return m;
        }));
    };

    const openSecondLevelKey = (e: KeyboardEvent, levelName: string): void => {
        if (e.code === 'Enter' || e.code === 'Space') {
            e.preventDefault();
            openSecondLevel(levelName);
        }
    };


    const buildTopLevel = (): JSX.Element => {
        return (
            <ul className={styles.top_level}>
                {topLevelMenu.map(m => (
                    <li key={m.route} aria-expanded={m.id === firstCategory}>
                        <Link href={`/${m.route}`}>
                            <a>
                                <span className={cn(styles.top_level__item, {
                                    [styles.top_level__item_active]: m.id === firstCategory
                                })}>
                                    {m.icon}                                    <span>{m.name}</span>
                                </span>
                            </a>
                        </Link>
                        {m.id === firstCategory && buildSecondLevel(m)}
                    </li>
                ))}
            </ul>
        );
    };

    const buildSecondLevel = (topMenuItem: TopLevelMenuItem): JSX.Element => {
        return (
            <ul className={styles.second_block}>
                {menu.map(m => {

                    if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
                        m.isOpened = true;
                    }

                    return (
                        <li key={m._id.secondCategory}>
                            <button
                                className={styles.second_level}
                                onClick={() => openSecondLevel(m._id.secondCategory)}
                                onKeyDown={(e: KeyboardEvent) => openSecondLevelKey(e, m._id.secondCategory)}
                            >{m._id.secondCategory}
                            </button>
                            <motion.ul
                                layout
                                variants={variants}
                                initial={'hidden'}
                                animate={m.isOpened ? 'visible' : 'hiddden'}
                                className={styles.third_level_block}>
                                {buildThirdLevel(m.pages, topMenuItem.route, m.isOpened ?? false)}
                            </motion.ul>
                        </li>
                    );
                })
                }
            </ul>
        );
    };

    const buildThirdLevel = (pages: PageItem[], route: string, isOpen: boolean): JSX.Element[] => {
        return (
            pages.map(p => (
                <motion.li key={p._id} variants={variantsChildren}>
                    <Link href={`/${route}/${p.alias}`} >
                        <a
                            tabIndex={isOpen ? 0 : -1}
                            className={cn(styles.third_level, {
                                [styles.third_level_active]: `/${route}/${p.alias}` == router.asPath
                            })}
                            aria-current={`/${route}/${p.alias}` == router.asPath ? 'page' : false}
                        >
                            {p.category}
                        </a>
                    </Link>
                </motion.li>

            ))
        );
    };

    return (
        <nav className={styles.menu} role='navigation'>
            {announce &&
                <span className='hidden' role='log'>
                    {announce === 'opened' ? 'развернута' : 'свернута'}
                </span>}
            {buildTopLevel()}
        </nav>
    );
};

