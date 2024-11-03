import { SocialIcon } from 'react-social-icons';
import { useMemo } from 'react';

type SocialLinksProps = {
  size?: number;
};

export const SocialLinks = ({ size = 25 }: SocialLinksProps) => {
  const style = useMemo(() => ({ height: size, width: size }), [size]);
  return (
    <div
      style={{
        display: 'flex',
        gap: '0.5em',
        justifyContent: 'center',
      }}
    >
      <SocialIcon
        style={style}
        label="RSS Feed"
        network="rss"
        url="/atom.xml"
      />
      <SocialIcon
        style={style}
        label="Github Profile"
        url="https://github.com/skratchdot"
      />
      <SocialIcon
        style={style}
        bgColor="#6364ff"
        label="Mastodon Profile on Fosstodon"
        network="mastodon"
        url="https://fosstodon.org/@skratchdot"
      />
      <SocialIcon
        style={style}
        label="TikTok Profile"
        url="https://www.tiktok.com/@skratchdot"
      />
      <SocialIcon
        style={style}
        label="Bluesky Profile"
        url="https://bsky.app/profile/skratchdot.com"
      />
      <SocialIcon
        style={style}
        label="X.com (formerly Twitter) Profile"
        url="https://x.com/intent/user?screen_name=skratchdot"
      />
      <SocialIcon
        style={style}
        label="Instagram Profile"
        url="https://www.instagram.com/skratchdot"
      />
    </div>
  );
};
