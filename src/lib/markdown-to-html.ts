import { fixImages } from './fix-images';
import hljs from 'highlight.js';
import { marked } from 'marked';

class SkratchdotRenderer extends marked.Renderer {
  code(code: string, infostring: string | undefined, escaped: boolean): string {
    if (infostring === '' || !infostring) {
      infostring = 'plaintext';
    }
    // @ts-ignore
    return super.code(code, infostring, escaped);
  }
}

export const markdownToHtml = (markdownContent: string): string => {
  const html = marked.parse(markdownContent, {
    renderer: new SkratchdotRenderer(), // new marked.Renderer(),
    highlight: (code, lang) => {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      const html = hljs.highlight(code, { language }).value;
      return html;
    },
    langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    xhtml: false,
  });
  return fixImages(html);
};
