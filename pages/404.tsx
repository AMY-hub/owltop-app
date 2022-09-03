import Head from 'next/head';
import Link from 'next/link';

import { WithLayout } from '../layout/Layout';
import { ErrorPageComponent } from '../page-components';

export function Error404(): JSX.Element {
    return (
        <>
            <Head>
                <title>500 - ошибка сервера</title>
            </Head>
            <ErrorPageComponent errorCode={404}>
                <p>Страница, которую вы запрашиваете, не существует. Возможно она устарела, была удалена или был введен неверный адрес в адресной строке.</p>
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

export default WithLayout(Error404);