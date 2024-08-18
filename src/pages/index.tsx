import { PostList, getAllPostPages } from '../lib/posts';

import type { NextPage } from 'next';
import { PageNavProps } from '../components/PageNav';
import Posts from '../components/Posts';
import { SITE_URL } from '../constants/site';
import { stripHtml } from '../lib/strip-html';

type HomePageProps = {
  posts: PostList;
} & PageNavProps;

const HomePage: NextPage<HomePageProps> = ({
  posts,
  previousTitle,
  previousUrl,
}) => {
  return (
    <Posts
      title="All Posts"
      canonical={`${SITE_URL}/`}
      posts={posts}
      previousTitle={previousTitle}
      previousUrl={previousUrl}
    />
  );
};

export const getStaticProps = async ({ params }: any) => {
  const pages = await getAllPostPages();
  const page = pages[0];
  return {
    props: {
      posts: stripHtml(page),
      previousTitle: 'Older',
      previousUrl: pages.length > 1 ? '/page/2' : undefined,
    },
  };
};

export default HomePage;
