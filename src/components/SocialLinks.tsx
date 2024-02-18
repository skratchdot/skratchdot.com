import { SocialIcon, SocialIconProps } from 'react-social-icons';

const Social = ({ ...args }: SocialIconProps) => (
  <SocialIcon style={{ height: 25, width: 25 }} {...args} />
);

export const SocialLinks = () => {
  return (
    <>
      <Social network="rss" url="/atom.xml" />
      <Social url="https://github.com/skratchdot" />
      <Social network="mastodon" url="https://fosstodon.org/@skratchdot" />
      <Social url="https://www.tiktok.com/@skratchdot" />
      <Social url="https://x.com/intent/user?screen_name=skratchdot" />
      <Social url="https://www.instagram.com/skratchdot" />
    </>
  );
};
