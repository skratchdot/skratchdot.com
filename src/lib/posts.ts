import { POSTS_PER_PAGE } from '../constants/site';
import fs from 'fs';
import { markdownToHtml } from './markdown-to-html';
import matter from 'gray-matter';
import path from 'path';

export type PostData = {
  year: string;
  month: string;
  day: string;
  slug: string;
  filename: string;
  html: string;
  frontmatter: {
    layout?: string;
    title?: string;
    categories?: Array<string>;
    tags?: Array<string>;
    type?: string;
    status?: string;
    [key: string]: any;
  };
};
export type PostList = Array<PostData>;
export type PageList = Array<PostList>;

export const getAllPosts = async () => {
  const postsDirectory = path.resolve(process.cwd(), '_posts/');
  const filenames = await fs.promises.readdir(postsDirectory);
  const posts: PostList = [];

  for (let filename of filenames) {
    const pathname = path.resolve(postsDirectory, filename);
    const fileContent = await fs.promises.readFile(pathname, 'utf8');
    const {
      content: markdownContent,
      excerpt,
      data: frontmatter,
    } = matter(fileContent, { excerpt: true });
    const html = markdownToHtml(markdownContent);

    const slugWithDate = path.parse(filename).name;
    const [year, month, day, ...rest] = slugWithDate.split('-');
    const slug = rest.join('-');
    const post: PostData = {
      year,
      month,
      day,
      slug,
      filename,
      // pathname,
      // fileContent,
      // markdownContent,
      html,
      // excerpt,
      frontmatter,
    };
    // make sure newest posts show up first
    posts.unshift(post);
  }
  return posts;
};

export const getAllPostPages = async () => {
  const pages: PageList = [[]];
  const posts = await getAllPosts();
  posts.forEach((post) => {
    let pageNum = pages.length - 1;
    if (pages[pageNum].length >= POSTS_PER_PAGE) {
      pages.push([]);
      pageNum = pages.length - 1;
    }
    pages[pageNum].push(post);
  });
  return pages;
};

export const getAllPostsWithTag = async (tag: string) => {
  const posts = await getAllPosts();
  return posts.filter((post) => post?.frontmatter?.tags?.includes(tag));
};

export const getAllPostsWithCategory = async (category: string) => {
  const posts = await getAllPosts();
  return posts.filter((post) =>
    post?.frontmatter?.categories?.includes(category)
  );
};

export const getAllTags = async () => {
  const tags = new Set<string>();
  const posts = await getAllPosts();
  posts.forEach((post) => {
    post?.frontmatter?.tags?.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags);
};

export const getAllCategories = async () => {
  const categories = new Set<string>();
  const posts = await getAllPosts();
  posts.forEach((post) => {
    post?.frontmatter?.categories?.forEach((category) =>
      categories.add(category)
    );
  });
  return Array.from(categories);
};
