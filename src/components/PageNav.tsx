import Link from 'next/link';

export type PageNavProps = {
  nextUrl?: string;
  nextTitle?: string;
  previousUrl?: string;
  previousTitle?: string;
};

const PageNav = ({
  nextUrl,
  nextTitle,
  previousUrl,
  previousTitle,
}: PageNavProps) => {
  const next = nextUrl ? (
    <Link href={nextUrl}>«{nextTitle || 'Next'}</Link>
  ) : undefined;
  const previous = previousUrl ? (
    <Link href={previousUrl}>{previousTitle || 'Previous'}»</Link>
  ) : undefined;
  return (
    <nav id="articlesNav">
      <div>
        <div className="newEntries">{next}</div>
        <div className="oldEntries">{previous}</div>
      </div>
      <div className="homeEntries">
        <Link href="/">HOME</Link>
      </div>
    </nav>
  );
};

export default PageNav;
