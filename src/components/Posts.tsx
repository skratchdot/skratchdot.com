import PageNav, { PageNavProps } from './PageNav';

import { CommentCount } from 'disqus-react';
import { DISQUS_SHORTNAME } from '../constants/site';
import Footer from './Footer';
import Header from './Header';
import ItemList from './ItemList';
import Link from 'next/link';
import PageHead from './PageHead';
import { PostList } from '../lib/posts';
import React from 'react';

type PostListProps = {
  posts: PostList;
  title: string;
} & PageNavProps;

const Posts: React.FC<PostListProps> = ({
  posts,
  title,
  nextTitle,
  nextUrl,
  previousUrl,
  previousTitle,
}) => {
  return (
    <>
      <PageHead title={title} />
      <Header />
      <section id="mainSection" className="oneColumn">
        <article>
          <h1>{title}:</h1>
          <ul className="postlist">
            {posts.map((post) => {
              const categories = Array.isArray(
                post?.frontmatter?.categories
              ) ? (
                <ItemList
                  items={post.frontmatter.categories}
                  title="Categories"
                  linkPrefix="/category/"
                />
              ) : undefined;
              const tags = Array.isArray(post?.frontmatter?.tags) ? (
                <ItemList
                  items={post.frontmatter.tags}
                  title="Tags"
                  linkPrefix="/tag/"
                />
              ) : undefined;
              const postUrl = `/${post.year}/${post.month}/${post.slug}`;
              return (
                <li key={post.filename}>
                  <div className="clearfix rel">
                    <div className="pl-date">
                      {post.year}-{post.month}-{post.day}
                    </div>
                    <div className="pl-title">
                      <Link href={postUrl}>
                        <a>{post.frontmatter.title}</a>
                      </Link>
                    </div>
                    <div className="pl-comments">
                      <Link href={`${postUrl}#disqus_thread`}>
                        <a>
                          <CommentCount
                            shortname={DISQUS_SHORTNAME}
                            config={{
                              url: postUrl,
                              identifier: postUrl,
                              title: post.frontmatter.title,
                            }}
                          >
                            Comments
                          </CommentCount>
                        </a>
                      </Link>
                    </div>
                  </div>
                  {categories}
                  {tags}
                </li>
              );
            })}
          </ul>
        </article>
        <PageNav
          nextTitle={nextTitle}
          nextUrl={nextUrl}
          previousUrl={previousUrl}
          previousTitle={previousTitle}
        />
      </section>
      <Footer />
    </>
  );
};

export default Posts;
