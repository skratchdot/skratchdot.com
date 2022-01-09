import Link from 'next/link';

const Header = () => {
  return (
    <>
      <div className="hrRed"></div>
      <div className="hrBlack"></div>
      <header className="oneColumn">
        <h1>
          <Link href="/">
            <a>
              &#91;skratchdot<span>.</span>&#93;
            </a>
          </Link>
        </h1>
      </header>
      <nav id="mainNav" className="oneColumn">
        <ul>
          <li>
            <Link href="/">
              <a title="Home">
                <span>&#91;</span>Home<span>&#93;</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/projects/">
              <a title="Projects">
                <span>&#91;</span>Projects<span>&#93;</span>
              </a>
            </Link>
          </li>
          <li>
            <Link href="/contact/">
              <a title="Contact">
                <span>&#91;</span>Contact<span>&#93;</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      {/* old #share-buttons-container had height of 38.5. it's now replaced by the following <br /> tag: */}
      <br />
    </>
  );
};

export default Header;
