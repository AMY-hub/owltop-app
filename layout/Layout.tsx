import { FunctionComponent, KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';

import { ContextProvider, IAppContext } from '../context/AppContext';
import { LayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { SideBar } from './SideBar/SideBar';
import { Footer } from './Footer/Footer';
import { ScrollToTop } from '../components';

import styles from './Layout.module.css';

export const Layout = ({ children }: LayoutProps): JSX.Element => {

    const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
    const mainRef = useRef<HTMLDivElement>(null);

    const skipContent = (key: KeyboardEvent): void => {
        if (key.code === 'Space' || key.code === 'Enter') {
            key.preventDefault();
            mainRef.current?.focus();
        }
        setIsSkipLinkDisplayed(false);
    };

    return (
        <div className={styles.wrapper}>
            <a
                tabIndex={1}
                onFocus={() => setIsSkipLinkDisplayed(true)}
                onKeyDown={skipContent}
                className={cn(styles.skiplink, {
                    [styles.skiplink_displayed]: isSkipLinkDisplayed
                })}
            >Сразу к содержанию</a>
            <Header className={styles.header} />
            <SideBar className={styles.sidebar} />
            <main
                className={styles.main}
                ref={mainRef}
                tabIndex={0}
                role='main'>
                {children}
                <ScrollToTop />
            </main>
            <Footer className={styles.footer} />
        </div>
    );
};

export const WithLayout = <T extends Record<string, unknown> & IAppContext>(Component: FunctionComponent<T>) => {
    return function WithLayoutComponent(props: T): JSX.Element {
        return (
            <ContextProvider menu={props.menu} firstCategory={props.firstCategory}>
                <Layout>
                    <Component {...props} />
                </Layout>
            </ContextProvider>
        );
    };
};


