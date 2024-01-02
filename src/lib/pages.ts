import fs from 'fs';
import { glob } from 'glob';
import { markdownToHtml } from './markdown-to-html';
import matter from 'gray-matter';
import path from 'path';

export type PageData = {
  slug: string;
  filename: string;
  html: string;
  frontmatter: {
    layout?: string;
    title?: string;
    [key: string]: any;
  };
};
type PageDataList = Array<PageData>;

export const getAllPages = async (): Promise<PageDataList> => {
  const files = await glob('_pages/**/index.md');
  const pages = [];
  for (let filename of files) {
    const slug = path.parse(filename).dir.replace(/^_pages/gi, '');
    const fileContent = await fs.promises.readFile(filename, 'utf8');
    const {
      content: markdownContent,
      excerpt,
      data: frontmatter,
    } = matter(fileContent, { excerpt: true });
    const html = await markdownToHtml(markdownContent);
    const project: PageData = {
      slug,
      filename,
      // pathname,
      // fileContent,
      // markdownContent,
      html,
      // excerpt,
      frontmatter,
    };
    pages.push(project);
  }
  return pages;
};
