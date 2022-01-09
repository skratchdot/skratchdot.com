import Link from 'next/link';
import React from 'react';

export type PageNavProps = {
  nextUrl?: string;
  nextTitle?: string;
  previousUrl?: string;
  previousTitle?: string;
};

const PageNav: React.FC<PageNavProps> = ({
  nextUrl,
  nextTitle,
  previousUrl,
  previousTitle,
}) => {
  const next = nextUrl ? (
    <Link href={nextUrl}>
      <a>&laquo; {nextTitle || 'Next'}</a>
    </Link>
  ) : undefined;
  const previous = previousUrl ? (
    <Link href={previousUrl}>
      <a>{previousTitle || 'Previous'} &raquo;</a>
    </Link>
  ) : undefined;
  return (
    <nav id="articlesNav">
      <div>
        <div className="newEntries">{next}</div>
        <div className="oldEntries">{previous}</div>
      </div>
      <div className="homeEntries">
        <Link href="/">
          <a>HOME</a>
        </Link>
      </div>
    </nav>
  );
};

export default PageNav;
