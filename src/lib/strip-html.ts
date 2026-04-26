import type { PostList } from './posts';

/**
 * Strip the `html` property from all the PostData to decrease data size.
 * see: https://nextjs.org/docs/messages/large-page-data
 *
 * @param postList
 * @returns
 */
export const stripHtml = (postList: PostList) => {
  return postList.map((post) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { html, ...other } = post;
    return { ...other };
  });
};
