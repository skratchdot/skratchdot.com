import Link from 'next/link';

const TwitterFollow = () => {
  return (
    <div className="twitter-button">
      <Link
        href="https://twitter.com/intent/user?screen_name=skratchdot"
        className="twitter-button-link"
        target="_blank"
        aria-label="Follow @skratchdot on Twitter"
        title="Follow @skratchdot on Twitter"
      >
        <i></i>
        <span>
          Follow <b>@skratchdot</b>
        </span>
      </Link>
    </div>
  );
};
export default TwitterFollow;
