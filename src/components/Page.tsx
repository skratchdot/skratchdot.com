import PageComments, { DisqusConfig } from './PageComments';
import PageNav, { PageNavProps } from './PageNav';

import Footer from './Footer';
import Header from './Header';
import PageHead from './PageHead';
import React from 'react';

type PageProps = {
  children: React.ReactNode;
  commentsConfig?: DisqusConfig;
  footerSection?: React.ReactNode;
  headerSection?: React.ReactNode;
  pageClassName?: string;
  title?: string;
} & PageNavProps;

const Page: React.FC<PageProps> = ({
  children,
  commentsConfig,
  footerSection,
  headerSection,
  pageClassName,
  title,
  nextTitle,
  nextUrl,
  previousUrl,
  previousTitle,
}) => {
  return (
    <div className={pageClassName}>
      <PageHead title={title} />
      <Header />
      <section className="oneColumn">
        <article>
          {headerSection}
          <div className="entry">{children}</div>
          {footerSection}
          <PageComments config={commentsConfig} />
        </article>
        <PageNav
          nextTitle={nextTitle}
          nextUrl={nextUrl}
          previousUrl={previousUrl}
          previousTitle={previousTitle}
        />
      </section>
      <Footer />
    </div>
  );
};

export default Page;
