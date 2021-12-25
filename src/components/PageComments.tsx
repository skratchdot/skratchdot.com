import { DiscussionEmbed } from 'disqus-react';

export interface DisqusConfig {
  url?: string;
  identifier?: string;
  title?: string;
}

export type PageCommentsProps = {
  config?: DisqusConfig;
};

const PageComments: React.FC<PageCommentsProps> = ({ config }) => {
  if (config) {
    return (
      <>
        <div>
          <br />
          <div style={{ borderBottom: '1px dotted' }}></div>
          <br />
        </div>
        <div id="disqus_thread"></div>
        <DiscussionEmbed shortname="skratchdot" config={config} />
      </>
    );
  } else {
    return null;
  }
};

export default PageComments;
