import { DISQUS_SHORTNAME } from '../constants/site';
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
        <div></div>
        <DiscussionEmbed shortname={DISQUS_SHORTNAME} config={config} />
      </>
    );
  } else {
    return null;
  }
};

export default PageComments;
