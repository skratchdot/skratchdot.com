import { load } from 'cheerio';

export const fixImages = (html: string) => {
  const $ = load(html, null, false);
  $('a:has(img)').addClass('noBackground noBorder');
  return $.html();
};
