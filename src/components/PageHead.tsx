import Head from 'next/head';
import { SITE_TITLE } from '../constants/site';

type PageHeadProps = {
  title?: string;
};

const PageHead = ({ title }: PageHeadProps) => {
  let titleContent = title ? `${title} » ${SITE_TITLE}` : SITE_TITLE;
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{titleContent}</title>
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/images/favicons/apple-touch-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/images/favicons/apple-touch-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/images/favicons/apple-touch-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/images/favicons/apple-touch-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/images/favicons/apple-touch-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/images/favicons/apple-touch-icon-76x76.png"
      />
      <meta name="apple-mobile-web-app-title" content="skratchdot" />
      <link
        rel="icon"
        type="image/png"
        href="/images/favicons/favicon-96x96.png"
        sizes="96x96"
      />
      <link
        rel="icon"
        type="image/png"
        href="/images/favicons/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="/images/favicons/favicon-32x32.png"
        sizes="32x32"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="application-name" content="skratchdot" />
      <meta name="generator" content="NextJS" />
      <link
        rel="alternate"
        type="application/atom+xml"
        title="Atom Feed for skratchdot.com"
        href="/atom.xml"
      />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="RSS Feed for skratchdot.com"
        href="/feed.xml"
      />
      <link
        rel="alternate"
        type="application/feed+json"
        title="JSON Feed for skratchdot.com"
        href="/feed.json"
      />
    </Head>
  );
};

export default PageHead;
