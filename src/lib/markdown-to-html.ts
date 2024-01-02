import { fixImages } from './fix-images';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import hljs from 'highlight.js';
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';

class SkratchdotRenderer extends marked.Renderer {
  code(code: string, infostring: string | undefined, escaped: boolean): string {
    if (infostring === '' || !infostring) {
      infostring = 'plaintext';
    }
    return super.code(code, infostring, escaped);
  }
}

marked.use({ async: false, renderer: new SkratchdotRenderer() });
marked.use(gfmHeadingId());
marked.use(
  markedHighlight({
    async: false,
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      const html = hljs.highlight(code, { language }).value;
      return html;
    },
  }),
);

export const markdownToHtml = async (markdownContent: string) => {
  const html = await marked.parse(markdownContent, {
    async: false,
    pedantic: false,
    gfm: true,
    breaks: false,
  });
  return fixImages(html);
};
