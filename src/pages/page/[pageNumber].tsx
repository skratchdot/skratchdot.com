import { PostList, getAllPostPages } from '../../lib/posts';

import type { NextPage } from 'next';
import { PageNavProps } from '../../components/PageNav';
import Posts from '../../components/Posts';
import { SITE_URL } from '../../constants/site';
import { stripHtml } from '../../lib/strip-html';
import { useRouter } from 'next/router';

type PageNumberProps = {
  posts: PostList;
  currentPage: number;
} & PageNavProps;

const PageNumber: NextPage<PageNumberProps> = ({
  posts,
  currentPage,
  previousTitle,
  previousUrl,
  nextTitle,
  nextUrl,
}) => {
  return (
    <Posts
      title="All Posts"
      canonical={`${SITE_URL}/page/${currentPage}/`}
      posts={posts}
      previousTitle={previousTitle}
      previousUrl={previousUrl}
      nextTitle={nextTitle}
      nextUrl={nextUrl}
    />
  );
};

export const getStaticPaths = async () => {
  const pages = await getAllPostPages();
  return {
    paths: pages.map((page, num) => {
      return {
        params: {
          pageNumber: (num + 1).toString(),
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { pageNumber } = params;
  const pages = await getAllPostPages();
  const currentPage = parseFloat(pageNumber);
  const pageIndex = currentPage - 1;
  const previousPage = currentPage + 1;
  const nextPage = currentPage - 1;
  const page = pages[pageIndex];
  return {
    props: {
      posts: stripHtml(page),
      currentPage,
      previousTitle: 'Older',
      previousUrl:
        previousPage <= pages.length ? `/page/${previousPage}` : null,
      nextTitle: 'Newer',
      nextUrl: nextPage > 1 ? `/page/${nextPage}` : nextPage === 1 ? '/' : null,
    },
  };
};

export default PageNumber;
