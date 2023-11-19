import PageComments, { DisqusConfig } from './PageComments';
import PageNav, { PageNavProps } from './PageNav';

import Footer from './Footer';
import Header from './Header';
import PageHead from './PageHead';
import type { ReactNode } from 'react';

type PageProps = {
  children: ReactNode;
  commentsConfig?: DisqusConfig;
  footerSection?: ReactNode;
  headerSection?: ReactNode;
  pageClassName?: string;
  title?: string;
} & PageNavProps;

const Page = ({
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
}: PageProps) => {
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
