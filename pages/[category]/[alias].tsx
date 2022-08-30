import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';

import { API } from '../../helpers/api';
import { topLevelMenu } from '../../helpers/helpers';
import { MenuItem } from '../../interfaces/menu.interface';
import { TopLevelCategory, TopPageModel } from '../../interfaces/page.interface';
import { ProductModel } from '../../interfaces/product.interface';
import { WithLayout } from '../../layout/Layout';
import { TopPageComponent } from '../../page-components';

function TopPage({ firstCategory, menu, page, products }: TopPageProps): JSX.Element {

    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Head>
                <title>{page.metaTitle}</title>
                <meta name='description' content={page.metaDescription} />
                <meta property='og:title' content={page.metaTitle} />
                <meta property='og:description' content={page.metaDescription} />
                <meta property='og:type' content='article' />
            </Head>
            <TopPageComponent
                firstCategory={firstCategory} page={page} products={products} />
        </>

    );
}

export default WithLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: string[] = [];

    for (const m of topLevelMenu) {
        const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: m.id
        });
        paths = paths.concat(menu.flatMap(el => el.pages.map(p => `/${m.route}/` + p.alias)));
    }

    return {
        paths,
        fallback: true
    };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {

    if (!params) {
        return {
            notFound: true
        };
    }

    try {
        const firstLevelCategoryItem = topLevelMenu.find(m => m.route === params.category);

        if (!firstLevelCategoryItem) {
            return {
                notFound: true
            };
        }

        const { data: menu } = await axios.post<MenuItem[]>(API.toppage.find, {
            firstCategory: firstLevelCategoryItem.id
        });

        if (menu.length === 0) {
            return {
                notFound: true
            };
        }

        const { data: page } = await axios.get<TopPageModel>(API.toppage.byAlias + params.alias);

        const { data: products } = await axios.post<ProductModel[]>(API.product.find, {
            category: page.category,
            limit: 10
        });

        return {
            props: {
                menu,
                firstCategory: firstLevelCategoryItem.id,
                page,
                products
            }
        };
    } catch {
        return {
            notFound: true
        };
    }

};

interface TopPageProps extends Record<string, unknown> {
    menu: MenuItem[];
    firstCategory: TopLevelCategory;
    page: TopPageModel;
    products: ProductModel[];
}