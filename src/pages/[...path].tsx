import { PageData, getAllPages } from '../lib/pages';

import { NextPage } from 'next';
import Page from '../components/Page';
import { SITE_URL } from '../constants/site';
import { useRouter } from 'next/router';

const getPageSlug = (path: string | string[] | undefined) => {
  return Array.isArray(path)
    ? `/${path.join('/')}`.replace(/\/index.html$/gi, '')
    : '/';
};

const MarkdownPage: NextPage<PageData> = (props) => {
  const router = useRouter();
  const { path } = router.query;
  const slug = getPageSlug(path);
  const commentIdentifier = `${slug}/`;
  const commentsConfig =
    props.frontmatter.hideComments === true
      ? undefined
      : {
          url: commentIdentifier,
          identifier: commentIdentifier,
          title: props.frontmatter.title,
        };
  return (
    <Page
      title={props.frontmatter.title}
      commentsConfig={commentsConfig}
      canonical={`${SITE_URL}${slug}`}
    >
      <div dangerouslySetInnerHTML={{ __html: props.html }} />
    </Page>
  );
};

export const getStaticPaths = async () => {
  const pages = await getAllPages();
  return {
    paths: pages.map((page) => ({
      params: {
        path: page.slug.split('/').filter((v) => v),
      },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const { path } = params;
  const pages = await getAllPages();
  const slug = getPageSlug(path);
  const props = pages.find((page) => page.slug === slug);
  return {
    props,
  };
};

export default MarkdownPage;
