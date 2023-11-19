import { Fragment } from 'react';
import Link from 'next/link';

type BlogFooterProps = {
  tags?: Array<string>;
};
const BlogFooter = ({ tags }: BlogFooterProps) => {
  if (Array.isArray(tags)) {
    return (
      <div className="tagList">
        Tagged with:&nbsp;
        {tags.map((tag, index) => (
          <Fragment key={tag}>
            <Link href={`/tag/${tag}`}>{tag}</Link>
            {index < tags.length - 1 ? ' • ' : ''}
          </Fragment>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default BlogFooter;
