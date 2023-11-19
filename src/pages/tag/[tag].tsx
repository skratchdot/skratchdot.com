import { PostList, getAllPostsWithTag, getAllTags } from '../../lib/posts';

import type { NextPage } from 'next';
import Posts from '../../components/Posts';
import { stripHtml } from '../../lib/strip-html';
import { useRouter } from 'next/router';

type TagListProps = {
  posts: PostList;
};

const TagList: NextPage<TagListProps> = ({ posts }) => {
  const router = useRouter();
  const { tag } = router.query;
  return <Posts title={`Tag "${tag}"`} posts={posts} />;
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

export const getStaticProps = async ({ params }: any) => {
  const { tag } = params;
  const posts = await getAllPostsWithTag(tag);
  return {
    props: {
      posts: stripHtml(posts),
    },
  };
};

export default TagList;
