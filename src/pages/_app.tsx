/**
 *
 *  	_                 _              _       _         _       _                 _
 * 	 | |               | |            | |     | |       | |     | |               | |
 * 	/ __)           ___| | ___ __ __ _| |_ ___| |__   __| | ___ | |_             / __)
 * 	\__ \          / __| |/ / '__/ _` | __/ __| '_ \ / _` |/ _ \| __|            \__ \
 * 	(   /          \__ \   <| | | (_| | || (__| | | | (_| | (_) | |_ _           (   /
 * 	 |_|           |___/_|\_\_|  \__,_|\__\___|_| |_|\__,_|\___/ \__(_)           |_|
 *
 * 	                   wasting bytes with ascii art since [random date]
 *
 */
import '../styles/html5reset-1.6.1.css';
import '../styles/style.css';
import 'highlight.js/styles/github-dark.css';

import type { AppProps } from 'next/app';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default App;
