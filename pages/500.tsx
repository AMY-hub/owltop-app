import Head from 'next/head';
import Link from 'next/link';

import { WithLayout } from '../layout/Layout';
import { ErrorPageComponent } from '../page-components';

export function Error500(): JSX.Element {
    return (
        <>
            <Head>
                <title>404 - страница не найдена</title>
            </Head>
            <ErrorPageComponent errorCode={500} errorName='Ошибка сервера'>
                <p>На сервере произошла непредвиденная ошибка. Пожалуйста, подождите, она вскоре будет исправлена.</p>
                <p>
                    Попробуйте
                    <Link href={'/'}>
                        <a> вернуться на главную страницу.</a>
                    </Link>
                </p>
            </ErrorPageComponent>
        </>

    );
}

export default WithLayout(Error500);