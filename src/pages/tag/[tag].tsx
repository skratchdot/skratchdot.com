import type { GetStaticPropsContext, NextPage } from 'next';
import { PostList, getAllPostsWithTag, getAllTags } from '../../lib/posts';

import Posts from '../../components/Posts';
import { SITE_URL } from '../../constants/site';
import { stripHtml } from '../../lib/strip-html';
import { useRouter } from 'next/router';

type TagListProps = {
  posts: PostList;
};

const TagList: NextPage<TagListProps> = ({ posts }) => {
  const router = useRouter();
  const { tag } = router.query;
  return (
    <Posts
      title={`Tag "${tag}"`}
      posts={posts}
      canonical={`${SITE_URL}/category/${tag}/`}
    />
  );
};

export const getStaticPaths = async () => {
  const tags = await getAllTags();
  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  const { tag } = params ?? {};
  const posts = await getAllPostsWithTag(typeof tag === 'string' ? tag : '');
  return {
    props: {
      posts: stripHtml(posts),
    },
  };
};

export default TagList;
