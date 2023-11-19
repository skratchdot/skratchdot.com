import Link from 'next/link';
import React from 'react';

type BlogFooterProps = {
  tags?: Array<string>;
};
const BlogFooter = ({ tags }: BlogFooterProps) => {
  if (Array.isArray(tags)) {
    return (
      <div className="tagList">
        Tagged with:&nbsp;
        {tags.map((tag, index) => (
          <React.Fragment key={tag}>
            <Link href={`/tag/${tag}`}>{tag}</Link>
            {index < tags.length - 1 ? ' • ' : ''}
          </React.Fragment>
        ))}
      </div>
    );
  } else {
    return null;
  }
};

export default BlogFooter;
