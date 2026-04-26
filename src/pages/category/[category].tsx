import type { GetStaticPropsContext, NextPage } from 'next';
import {
  PostList,
  getAllCategories,
  getAllPostsWithCategory,
} from '../../lib/posts';

import Posts from '../../components/Posts';
import { SITE_URL } from '../../constants/site';
import { stripHtml } from '../../lib/strip-html';
import { useRouter } from 'next/router';

type CategoryListProps = {
  posts: PostList;
};

const CategoryList: NextPage<CategoryListProps> = ({ posts }) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <Posts
      title={`Category "${category}"`}
      posts={posts}
      canonical={`${SITE_URL}/category/${category}/`}
    />
  );
};

export const getStaticPaths = async () => {
  const categories = await getAllCategories();
  return {
    paths: categories.map((category) => {
      return {
        params: {
          category,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { category } = params ?? {};
  const posts = await getAllPostsWithCategory(
    typeof category === 'string' ? category : '',
  );
  return {
    props: {
      posts: stripHtml(posts),
    },
  };
};

export default CategoryList;
