import { CommentCount } from 'disqus-react';
import Link from 'next/link';
import React from 'react';

type BlogHeaderProps = {
  year: string;
  month: string;
  day: string;
  postUrl: string;
  categories?: Array<string>;
  title?: string;
};

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const BlogHeader: React.FC<BlogHeaderProps> = ({
  year,
  month,
  day,
  postUrl,
  categories,
  title,
}) => {
  const categorySection = Array.isArray(categories)
    ? categories.map((category, index) => (
        <React.Fragment key={category}>
          <Link href={`/category/${category}`}>
            <a>{category}</a>
          </Link>
          {index < categories.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))
    : null;
  return (
    <div className="title">
      <div className="date">
        <div>
          <span>{MONTHS[parseFloat(month) - 1]}</span>
          &nbsp;
          <span>{day}</span>
        </div>
        <div>
          <span>{year}</span>
        </div>
      </div>
      <h2 className="title">
        <a href={postUrl} rel="bookmark" title={`Permanent Link to ${title}`}>
          {title}
        </a>
      </h2>
      <div className="info">
        <div className="category">
          {categorySection}
          &nbsp;
        </div>
        <div className="pl-comments comments">
          <Link href="#disqus_thread">
            <a>
              <CommentCount
                shortname="skratchdot"
                config={{
                  url: postUrl,
                  identifier: postUrl,
                  title: title,
                }}
              >
                Comments
              </CommentCount>
            </a>
          </Link>
        </div>
      </div>
      <div className="clearfix">&nbsp;</div>
    </div>
  );
};

export default BlogHeader;
