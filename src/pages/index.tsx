import { PostList, getAllPostPages } from '../lib/posts';

import type { NextPage } from 'next';
import { PageNavProps } from '../components/PageNav';
import Posts from '../components/Posts';

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
      posts: page,
      previousTitle: 'Older',
      previousUrl: pages.length > 1 ? '/page/2' : undefined,
    },
  };
};

export default HomePage;
