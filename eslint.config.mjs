import { defineConfig } from 'eslint/config';
import gitignore from 'eslint-config-flat-gitignore';
import js from '@eslint/js';
//import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import tseslint from 'typescript-eslint';

const eslintConfig = defineConfig([
  gitignore(),
  {
    ignores: ['_ignore/**', 'public/**'],
  },
  {
    // TODO: fix these ignores
    ignores: [
      '_build/feeds.js',
      '_build/readmes.js',
      '.prettierrc.js',
      'next.config.js',
    ],
  },
  js.configs.recommended, // Use recommended rules
  tseslint.configs.recommended,
  //...nextCoreWebVitals,
]);

export default eslintConfig;
