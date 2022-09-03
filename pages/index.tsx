import Head from 'next/head';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { API } from '../helpers/api';
import { TopLevelCategory } from '../interfaces/page.interface';
import { MenuItem } from '../interfaces/menu.interface';
import { WithLayout } from '../layout/Layout';
import { MainPageComponent } from '../page-components';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {

  return (
    <>
      <Head>
        <title>OWLtop</title>
      </Head>
      <MainPageComponent />
    </>
  );
}

export default WithLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {

  const firstCategory = TopLevelCategory.Courses;

  const { data: menu } = await axios.post<MenuItem[]>(API.toppage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory,
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}