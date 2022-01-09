import { PostData, getAllPosts } from '../../../lib/posts';

import BlogFooter from '../../../components/BlogFooter';
import BlogHeader from '../../../components/BlogHeader';
import type { NextPage } from 'next';
import Page from '../../../components/Page';
import { PageNavProps } from '../../../components/PageNav';
import React from 'react';
import { useRouter } from 'next/router';

type BlogPostProps = {
  post: PostData;
} & PageNavProps;

const BlogPost: NextPage<BlogPostProps> = ({
  post,
  previousTitle,
  previousUrl,
  nextTitle,
  nextUrl,
}) => {
  const router = useRouter();
  const { year, month, slug } = router.query;
  const postUrl = `/${year}/${month}/${slug}`;
  return (
    <Page
      commentsConfig={{
        url: postUrl,
        identifier: postUrl,
        title: post.frontmatter.title,
      }}
      footerSection={<BlogFooter tags={post.frontmatter.tags} />}
      headerSection={
        <BlogHeader
          year={post.year}
          month={post.month}
          day={post.day}
          postUrl={postUrl}
          categories={post.frontmatter.categories}
          title={post.frontmatter.title}
        />
      }
      title={post.frontmatter.title}
      previousTitle={previousTitle}
      previousUrl={previousUrl}
      nextTitle={nextTitle}
      nextUrl={nextUrl}
    >
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Page>
  );
};

export const getStaticPaths = async () => {
  const posts = await getAllPosts();
  return {
    paths: posts.map((post: any) => {
      const { year, month, slug } = post;
      return {
        params: {
          year,
          month,
          slug,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { year, month, slug } = params;
  const posts = await getAllPosts();
  const postIndex = posts.findIndex(
    (post) => post.year === year && post.month === month && post.slug === slug
  );

  const post = posts[postIndex];
  const previous = posts[postIndex + 1];
  const next = posts[postIndex - 1];

  let previousTitle = previous ? previous.frontmatter.title : null;
  let previousUrl = previous
    ? `/${previous.year}/${previous.month}/${previous.slug}`
    : null;
  let nextTitle = next ? next.frontmatter.title : null;
  let nextUrl = next ? `/${next.year}/${next.month}/${next.slug}` : null;

  return {
    props: {
      post,
      previousTitle,
      previousUrl,
      nextTitle,
      nextUrl,
    },
  };
};

export default BlogPost;
