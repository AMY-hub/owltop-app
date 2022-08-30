import Head from 'next/head';
import { GetStaticProps } from 'next';
import axios from 'axios';

import { Button, Htag, Paragraph, Tag, } from '../components';
import { API } from '../helpers/api';
import { TopLevelCategory } from '../interfaces/page.interface';
import { MenuItem } from '../interfaces/menu.interface';
import { WithLayout } from '../layout/Layout';

function Home({ menu, firstCategory }: HomeProps): JSX.Element {

  return (
    <>
      <Head>
        <title>Index title</title>
      </Head>
      <Htag tag='h1'>Text</Htag>
      <Button styleType='primary' arrow='right'>Button</Button>
      <Button styleType='ghost' arrow='down'>Button</Button>
      <Paragraph fontSize='m'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ut sapiente quo natus, reprehenderit tempora vero enim at soluta explicabo perferendis, architecto et similique nesciunt deserunt id laborum culpa ea. Quos?</Paragraph>
      <Tag tagSize='s' color='red'>exmpl1</Tag>
      <Tag tagSize='m'>exmpl2</Tag>
      <Tag tagSize='s' color='green'>exmpl3</Tag>
      <Tag tagSize='m' color='primary'>exmpl4</Tag>
      <Tag tagSize='m' color='gray'>exmpl5</Tag>
      <Tag color='red' href='#'>exmpl6</Tag>
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