/*!
 * domFormat - A simple javascript library to get DOM nodes as strings.
 * 
 * Release Date: April 25, 2014 [2014-04-25 00:36:49]
 *      Version: 1.4
 *  Source Code: https://github.com/skratchdot/domFormat  
 *     Examples: http://projects.skratchdot.com/domFormat/examples/index-html5.html  
 * 
 * Copyright (c) 2014 SKRATCHDOT.COM
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 */
/*jslint plusplus: true */
var domFormat = domFormat || (function () {
	'use strict';

	// Declare config variables and functions
	var config = {}, domFormat = {},
		// Functions
		polyfillIsArray, overrideConfig, getNodeName,
		isVoidElement, isNonIndentedElement, getIndentation, trim,
		fixWhitespace, htmlSpecialCharacters, formatScript, formatStyle,
		getNodeString, getElementNode, getAttributeNode, getTextNode,
		getCdataSectionNode, getEntityReferenceNode, getNodeEntityNode,
		getProcessingInstructionNode, getCommentNode, getDocumentNode,
		getDocumentTypeNode, getDocumentFragmentNode, getNotationNode;

	// Setup default config values
	config = {
		formatScriptTags : true,
		formatStyleTags : true,
		indentString : '\t',
		indentNum : 1,
		nonIndentedElements : ['html', 'head', 'body'],
		/* http://www.w3.org/TR/html-markup/syntax.html#void-element */
		voidElements : [
			'area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img',
			'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'
		]
	};

	domFormat.init = function (settings) {
		overrideConfig(settings, 'indentString', 'string');
		overrideConfig(settings, 'indentNum', 'number');
		overrideConfig(settings, 'nonIndentedElements', 'array');
		overrideConfig(settings, 'voidElements', 'array');
	};

	domFormat.getString = function (node) {
		return getNodeString(node, 0);
	};

	// Polyfill for Array.isArray()
	polyfillIsArray = function () {
		Array.isArray = Array.isArray || function (obj) {
			return {}.toString.call(obj) === '[object Array]';
		};
	};

	overrideConfig = function (settings, prop, type) {
		// Only override if the property exists in settings
		if (settings.hasOwnProperty(prop)) {
			// Array check
			if (type === 'array') {
				polyfillIsArray();
				if (Array.isArray(settings[prop])) {
					config[prop] = settings[prop];
				}
			} else if (typeof settings[prop] === type) {
				config[prop] = settings[prop];
			}
		}
	};

	getNodeName = function (node) {
		var str = '';
		// If the tag has a prefix
		if (typeof node.prefix === 'string') {
			str += node.prefix + ":";
		}
		// Print the name of the tag
		if (typeof node.localName === 'string') {
			str += node.localName;
		} else {
			// We should only get to this line in IE. IE loses namespace info when parsing DOM.
			str += node.nodeName;
		}
		return str;
	};

	isVoidElement = function (nodeName) {
		var i = 0;
		nodeName = nodeName.toLowerCase();

		// We could use Array.indexOf() here, but that is not supported
		// in older browsers, and there aren't *that* many voidElements
		// so no need for micro-performace
		for (i = 0; i < config.voidElements.length; i++) {
			if (config.voidElements[i] === nodeName) {
				return true;
			}
		}
		return false;
	};

	isNonIndentedElement = function (nodeName) {
		var i = 0;
		nodeName = nodeName.toLowerCase();

		// We could use Array.indexOf() here, but that is not supported
		// in older browsers.
		for (i = 0; i < config.nonIndentedElements.length; i++) {
			if (config.nonIndentedElements[i] === nodeName) {
				return true;
			}
		}
		return false;
	};

	getIndentation = function (level) {
		var i = 0, str = '';
		for (i = 0; i < (level * config.indentNum); i++) {
			str += config.indentString;
		}
		return str;
	};

	trim = function (str) {
		return str.replace(/^\s+|\s+$/g, '');
	};

	fixWhitespace = function (str) {
		return trim(str.replace(/\s+/g, ' '));
	};

	htmlSpecialCharacters = function (str, escapeQuotes) {
		str = str.replace(/\&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
		if (escapeQuotes === true) {
			str = str.replace(/\"/g, '&quot;').replace(/\'/g, '&#039;');
		}
		return str;
	};

	formatScript = function (str, level) {
		if (config.formatScriptTags === true) {
			str = domFormat.jsBeautify(trim(str), {
				indent_size : config.indentNum,
				indent_char : config.indentString,
				preserve_newlines : false
			});
			str = '\n' + str;
			str = str.replace(/\n/g, '\n' + getIndentation(level));
		}
		return str;
	};

	formatStyle = function (str, level) {
		if (config.formatStyleTags === true) {
			str = domFormat.cssBeautify(trim(str), {
				indent : config.indentString,
				openbrace : 'end-of-line'
			});
			str = '\n' + str;
			str = str.replace(/\n/g, '\n' + getIndentation(level));
		}
		return str;
	};

	getNodeString = function (node, level) {
		if (typeof node === 'object' && typeof node.nodeType === 'number') {
			if (node.nodeType === 1) {
				// Node.ELEMENT_NODE === 1
				return getElementNode(node, level);
			} else if (node.nodeType === 2) {
				// Node.ATTRIBUTE_NODE === 2
				return getAttributeNode(node, level);
			} else if (node.nodeType === 3) {
				// Node.TEXT_NODE === 3
				return getTextNode(node, level);
			} else if (node.nodeType === 4) {
				// Node.CDATA_SECTION_NODE === 4
				return getCdataSectionNode(node, level);
			} else if (node.nodeType === 5) {
				// Node.ENTITY_REFERENCE_NODE === 5
				return getEntityReferenceNode(node, level);
			} else if (node.nodeType === 6) {
				// Node.ENTITY_NODE === 6
				return getNodeEntityNode(node, level);
			} else if (node.nodeType === 7) {
				// Node.PROCESSING_INSTRUCTION_NODE === 7
				return getProcessingInstructionNode(node, level);
			} else if (node.nodeType === 8) {
				// Node.COMMENT_NODE === 8
				return getCommentNode(node, level);
			} else if (node.nodeType === 9) {
				// Node.DOCUMENT_NODE === 9
				return getDocumentNode(node, level);
			} else if (node.nodeType === 10) {
				// Node.DOCUMENT_TYPE_NODE === 10
				return getDocumentTypeNode(node, level);
			} else if (node.nodeType === 11) {
				// Node.DOCUMENT_FRAGMENT_NODE === 11
				return getDocumentFragmentNode(node, level);
			} else if (node.nodeType === 12) {
				// Node.NOTATION_NODE === 12
				return getNotationNode(node, level);
			}
		}
		return '';
	};

	// Node.ELEMENT_NODE === 1
	getElementNode = function (node, level) {
		var str = '', nodeName, i;
		// store the name of our element
		nodeName = getNodeName(node);
		// Print a newline if we are deeper than level 0
		if (level > 0) {
			str += '\n';
		}
		// If this is a non-indented element, set level to 0
		if (isNonIndentedElement(nodeName)) {
			level = 0;
		}
		// Now print some tabs
		str += getIndentation(level);
		// Start opening the tag
		str += '<' + nodeName;
		// Print the attributes
		for (i = 0; i < node.attributes.length; i++) {
			str += getNodeString(node.attributes[i], level + 1);
		}
		// If there are no children, we can close the tag
		if (node.childNodes.length === 0) {
			// Void elements can use the "self-closing" form.
			if (isVoidElement(nodeName)) {
				str += '/>';
			} else {
				str += '></' + nodeName + '>';
			}
		} else if (node.childNodes.length === 1 &&
				node.childNodes[0].nodeType === 3 &&
				nodeName.toLowerCase() !== 'script' &&
				nodeName.toLowerCase() !== 'style') {
			// If the only child is a text node, then don't use newlines
			str += '>' + trim(getNodeString(node.childNodes[0], level + 1)) + '</' + nodeName + '>';
		} else {
			str += '>';
			for (i = 0; i < node.childNodes.length; i++) {
				str += getNodeString(node.childNodes[i], level + 1);
			}
			str += '\n' + getIndentation(level) + '</' + nodeName + '>';
		}
		return str;
	};

	// Node.ATTRIBUTE_NODE === 2
	getAttributeNode = function (node, level) {
		var str = '';
		// if statement is needed due to IE adding attributes like onresizeend and style
		if (node.specified === true && node.nodeValue !== null) {
			str += ' ' +
				node.nodeName +
				'="' +
				htmlSpecialCharacters(node.nodeValue, true) +
				'"';
		}
		return str;
	};

	// Node.TEXT_NODE === 3
	getTextNode = function (node, level) {
		var str = '', fixedString;
		if (node.parentNode.nodeName.toLowerCase() === 'script') {
			str += formatScript(node.nodeValue, level);
		} else if (node.parentNode.nodeName.toLowerCase() === 'style') {
			str += formatStyle(node.nodeValue, level);
		} else {
			fixedString = fixWhitespace(node.nodeValue);
			if (fixedString.length > 0) {
				str += '\n' + getIndentation(level) + htmlSpecialCharacters(fixedString, false);
			}
		}
		return str;
	};

	// Node.CDATA_SECTION_NODE === 4
	getCdataSectionNode = function (node, level) {
		var str = '', fixedString;
		if (node.parentNode.nodeName.toLowerCase() === 'script') {
			str += '<[CDATA[' + formatScript(node.nodeValue, level) + ']]>';
		} else if (node.parentNode.nodeName.toLowerCase() === 'style') {
			str += '<[CDATA[' + formatStyle(node.nodeValue, level) + ']]>';
		} else {
			fixedString = fixWhitespace(node.nodeValue);
			if (fixedString.length > 0) {
				str += '\n' + getIndentation(level) + '<[CDATA[' + fixedString + ']]>';
			}
		}
		return str;
	};

	// Node.ENTITY_REFERENCE_NODE === 5
	getEntityReferenceNode = function (node, level) {
		return '';
	};

	// Node.ENTITY_NODE === 6
	getNodeEntityNode = function (node, level) {
		return '';
	};

	// Node.PROCESSING_INSTRUCTION_NODE === 7
	getProcessingInstructionNode = function (node, level) {
		return '';
	};

	// Node.COMMENT_NODE === 8
	getCommentNode = function (node, level) {
		var str = '';
		// Fix for IE treating DOCTYPE node as a comment.
		if (level > 0) {
			str += '\n' + getIndentation(level);
		}
		if (node.nodeValue) {
			str += '<!--' + node.nodeValue + '-->';
		}
		if (level === 0) {
			str += '\n';
		}
		return str;
	};

	// Node.DOCUMENT_NODE === 9
	getDocumentNode = function (node, level) {
		var str = '', i;
		if (node.childNodes && node.childNodes.length) {
			for (i = 0; i < node.childNodes.length; i++) {
				str += getNodeString(node.childNodes[i], level);
			}
		}
		return str;
	};

	// Node.DOCUMENT_TYPE_NODE === 10
	getDocumentTypeNode = function (node, level) {
		var str = '';
		str += '<!DOCTYPE';
		if (node.nodeName && node.nodeName.length > 0) {
			str += ' ' + node.nodeName;
		}
		if (node.publicId && node.publicId.length > 0) {
			str += ' PUBLIC "' + node.publicId + '"';
		}
		if (node.systemId && node.systemId.length > 0) {
			str += ' "' + node.systemId + '"';
		}
		str += '>\n';
		return str;
	};

	// Node.DOCUMENT_FRAGMENT_NODE === 11
	getDocumentFragmentNode = function (node, level) {
		var str = '', i;
		if (node.childNodes && node.childNodes.length) {
			for (i = 0; i < node.childNodes.length; i++) {
				str += getNodeString(node.childNodes[i], level);
			}
		}
		return str;
	};

	// Node.NOTATION_NODE === 12
	getNotationNode = function (node, level) {
		return '';
	};

	return domFormat;
}());
/*!
 * Slightly modified version of CSS Beautify:
 *     https://github.com/senchalabs/cssbeautify/
 *     Original Author: Ariya Hidayat
 *     Copyright (C) 2012 Sencha Inc.
 */
/*
Copyright (C) 2012 Sencha Inc.
Copyright (C) 2011 Sencha Inc.

Author: Ariya Hidayat.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*jslint continue: true, indent: 4 */
/*global exports:true, module:true, window:true */

(function () {

   'use strict';

   function cssbeautify(style, opt) {

       var options, index = 0, length = style.length, blocks, formatted = '',
           ch, ch2, str, state, State, depth, quote, comment,
           openbracesuffix = true,
           autosemicolon = false,
           trimRight;

       options = arguments.length > 1 ? opt : {};
       if (typeof options.indent === 'undefined') {
           options.indent = '    ';
       }
       if (typeof options.openbrace === 'string') {
           openbracesuffix = (options.openbrace === 'end-of-line');
       }
       if (typeof options.autosemicolon === 'boolean') {
           autosemicolon = options.autosemicolon;
       }

       function isWhitespace(c) {
           return (c === ' ') || (c === '\n') || (c === '\t') || (c === '\r') || (c === '\f');
       }

       function isQuote(c) {
           return (c === '\'') || (c === '"');
       }

       // FIXME: handle Unicode characters
       function isName(c) {
           return (ch >= 'a' && ch <= 'z') ||
               (ch >= 'A' && ch <= 'Z') ||
               (ch >= '0' && ch <= '9') ||
               '-_*.:#'.indexOf(c) >= 0;
       }

       function appendIndent() {
           var i;
           for (i = depth; i > 0; i -= 1) {
               formatted += options.indent;
           }
       }

       function openBlock() {
           formatted = trimRight(formatted);
           if (openbracesuffix) {
               formatted += ' {';
           } else {
               formatted += '\n';
               appendIndent();
               formatted += '{';
           }
           if (ch2 !== '\n') {
               formatted += '\n';
           }
           depth += 1;
       }

       function closeBlock() {
           depth -= 1;
           formatted = trimRight(formatted);

           if (autosemicolon) {
               if (formatted.charAt(formatted.length - 1) !== ';') {
                   formatted += ';';
               }
           }

           formatted += '\n';
           appendIndent();
           formatted += '}';
           blocks.push(formatted);
           formatted = '';
       }

       if (String.prototype.trimRight) {
           trimRight = function (s) {
               return s.trimRight();
           };
       } else {
           // old Internet Explorer
           trimRight = function (s) {
               return s.replace(/\s+$/, '');
           };
       }

       State = {
           Start: 0,
           AtRule: 1,
           Block: 2,
           Selector: 3,
           Ruleset: 4,
           Property: 5,
           Separator: 6,
           Expression: 7,
           URL: 8
       };

       depth = 0;
       state = State.Start;
       comment = false;
       blocks = [];

       // We want to deal with LF (\n) only
       style = style.replace(/\r\n/g, '\n');

       while (index < length) {
           ch = style.charAt(index);
           ch2 = style.charAt(index + 1);
           index += 1;

           // Inside a string literal?
           if (isQuote(quote)) {
               formatted += ch;
               if (ch === quote) {
                   quote = null;
               }
               if (ch === '\\' && ch2 === quote) {
                   // Don't treat escaped character as the closing quote
                   formatted += ch2;
                   index += 1;
               }
               continue;
           }

           // Starting a string literal?
           if (isQuote(ch)) {
               formatted += ch;
               quote = ch;
               continue;
           }

           // Comment
           if (comment) {
               formatted += ch;
               if (ch === '*' && ch2 === '/') {
                   comment = false;
                   formatted += ch2;
                   index += 1;
               }
               continue;
           } else {
               if (ch === '/' && ch2 === '*') {
                   comment = true;
                   formatted += ch;
                   formatted += ch2;
                   index += 1;
                   continue;
               }
           }

           if (state === State.Start) {

               if (blocks.length === 0) {
                   if (isWhitespace(ch) && formatted.length === 0) {
                       continue;
                   }
               }

               // Copy white spaces and control characters
               if (ch <= ' ' || ch.charCodeAt(0) >= 128) {
                   state = State.Start;
                   formatted += ch;
                   continue;
               }

               // Selector or at-rule
               if (isName(ch) || (ch === '@')) {

                   // Clear trailing whitespaces and linefeeds.
                   str = trimRight(formatted);

                   if (str.length === 0) {
                       // If we have empty string after removing all the trailing
                       // spaces, that means we are right after a block.
                       // Ensure a blank line as the separator.
                       if (blocks.length > 0) {
                           formatted = '\n\n';
                       }
                   } else {
                       // After finishing a ruleset or directive statement,
                       // there should be one blank line.
                       if (str.charAt(str.length - 1) === '}' ||
                               str.charAt(str.length - 1) === ';') {

                           formatted = str + '\n\n';
                       } else {
                           // After block comment, keep all the linefeeds but
                           // start from the first column (remove whitespaces prefix).
                           while (true) {
                               ch2 = formatted.charAt(formatted.length - 1);
                               if (ch2 !== ' ' && ch2.charCodeAt(0) !== 9) {
                                   break;
                               }
                               formatted = formatted.substr(0, formatted.length - 1);
                           }
                       }
                   }
                   formatted += ch;
                   state = (ch === '@') ? State.AtRule : State.Selector;
                   continue;
               }
           }

           if (state === State.AtRule) {

               // ';' terminates a statement.
               if (ch === ';') {
                   formatted += ch;
                   state = State.Start;
                   continue;
               }

               // '{' starts a block
               if (ch === '{') {
                   openBlock();
                   state = State.Block;
                   continue;
               }

               formatted += ch;
               continue;
           }

           if (state === State.Block) {

               // Selector
               if (isName(ch)) {

                   // Clear trailing whitespaces and linefeeds.
                   str = trimRight(formatted);

                   if (str.length === 0) {
                       // If we have empty string after removing all the trailing
                       // spaces, that means we are right after a block.
                       // Ensure a blank line as the separator.
                       if (blocks.length > 0) {
                           formatted = '\n\n';
                       }
                   } else {
                       // Insert blank line if necessary.
                       if (str.charAt(str.length - 1) === '}') {
                           formatted = str + '\n\n';
                       } else {
                           // After block comment, keep all the linefeeds but
                           // start from the first column (remove whitespaces prefix).
                           while (true) {
                               ch2 = formatted.charAt(formatted.length - 1);
                               if (ch2 !== ' ' && ch2.charCodeAt(0) !== 9) {
                                   break;
                               }
                               formatted = formatted.substr(0, formatted.length - 1);
                           }
                       }
                   }

                   appendIndent();
                   formatted += ch;
                   state = State.Selector;
                   continue;
               }

               // '}' resets the state.
               if (ch === '}') {
                   closeBlock();
                   state = State.Start;
                   continue;
               }

               formatted += ch;
               continue;
           }

           if (state === State.Selector) {

               // '{' starts the ruleset.
               if (ch === '{') {
                   openBlock();
                   state = State.Ruleset;
                   continue;
               }

               // '}' resets the state.
               if (ch === '}') {
                   closeBlock();
                   state = State.Start;
                   continue;
               }

               formatted += ch;
               continue;
           }

           if (state === State.Ruleset) {

               // '}' finishes the ruleset.
               if (ch === '}') {
                   closeBlock();
                   state = State.Start;
                   if (depth > 0) {
                       state = State.Block;
                   }
                   continue;
               }

               // Make sure there is no blank line or trailing spaces inbetween
               if (ch === '\n') {
                   formatted = trimRight(formatted);
                   formatted += '\n';
                   continue;
               }

               // property name
               if (!isWhitespace(ch)) {
                   formatted = trimRight(formatted);
                   formatted += '\n';
                   appendIndent();
                   formatted += ch;
                   state = State.Property;
                   continue;
               }
               formatted += ch;
               continue;
           }

           if (state === State.Property) {

               // ':' concludes the property.
               if (ch === ':') {
                   formatted = trimRight(formatted);
                   formatted += ': ';
                   state = State.Expression;
                   if (isWhitespace(ch2)) {
                       state = State.Separator;
                   }
                   continue;
               }

               // '}' finishes the ruleset.
               if (ch === '}') {
                   closeBlock();
                   state = State.Start;
                   if (depth > 0) {
                       state = State.Block;
                   }
                   continue;
               }

               formatted += ch;
               continue;
           }

           if (state === State.Separator) {

               // Non-whitespace starts the expression.
               if (!isWhitespace(ch)) {
                   formatted += ch;
                   state = State.Expression;
                   continue;
               }

               // Anticipate string literal.
               if (isQuote(ch2)) {
                   state = State.Expression;
               }

               continue;
           }

           if (state === State.Expression) {

               // '}' finishes the ruleset.
               if (ch === '}') {
                   closeBlock();
                   state = State.Start;
                   if (depth > 0) {
                       state = State.Block;
                   }
                   continue;
               }

               // ';' completes the declaration.
               if (ch === ';') {
                   formatted = trimRight(formatted);
                   formatted += ';\n';
                   state = State.Ruleset;
                   continue;
               }

               formatted += ch;

               if (ch === '(') {
                   if (formatted.charAt(formatted.length - 2) === 'l' &&
                           formatted.charAt(formatted.length - 3) === 'r' &&
                           formatted.charAt(formatted.length - 4) === 'u') {

                       // URL starts with '(' and closes with ')'.
                       state = State.URL;
                       continue;
                   }
               }

               continue;
           }

           if (state === State.URL) {


               // ')' finishes the URL (only if it is not escaped).
               if (ch === ')' && formatted.charAt(formatted.length - 1 !== '\\')) {
                   formatted += ch;
                   state = State.Expression;
                   continue;
               }
           }

           // The default action is to copy the character (to prevent
           // infinite loop).
           formatted += ch;
       }

       formatted = blocks.join('') + formatted;

       return formatted;
   }

   if (typeof domFormat === 'object') {
       // Browser loading.
	   domFormat.cssBeautify = cssbeautify;
   }

}());/*!
 * Slightly modified version of JS Beautifier:
 *     Originally written by Einar Lielmanis, <einar@jsbeautifier.org>
 *     http://jsbeautifier.org/
 */
/*jslint onevar: false, plusplus: false */
/*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
/*

 JS Beautifier
---------------


  Written by Einar Lielmanis, <einar@jsbeautifier.org>
      http://jsbeautifier.org/

  Originally converted to javascript by Vital, <vital76@gmail.com>
  "End braces on own line" added by Chris J. Shull, <chrisjshull@gmail.com>

  You are free to use this in any way you want, in case you find this useful or working for you.

  Usage:
    js_beautify(js_source_text);
    js_beautify(js_source_text, options);

  The options are:
    indent_size (default 4)          - indentation size,
    indent_char (default space)      - character to indent with,
    preserve_newlines (default true) - whether existing line breaks should be preserved,
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk,

    jslint_happy (default false) - if true, then jslint-stricter mode is enforced.

            jslint_happy   !jslint_happy
            ---------------------------------
             function ()      function()

    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "expand-strict"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line.

            expand-strict: put brace on own line even in such cases:

                var a =
                {
                    a: 5,
                    b: 6
                }
            This mode may break your scripts - e.g "return { a: 1 }" will be broken into two lines, so beware.

    space_before_conditional (default true) - should the space before conditional statement be added, "if(true)" vs "if (true)",

    unescape_strings (default false) - should printable characters in strings encoded in \xNN notation be unescaped, "example" vs "\x65\x78\x61\x6d\x70\x6c\x65"

    e.g

    js_beautify(js_source_text, {
      'indent_size': 1,
      'indent_char': '\t'
    });


*/
domFormat.jsBeautify = function (js_source_text, options) {

    var input, output, token_text, last_type, last_text, last_last_text, last_word, flags, flag_store, indent_string;
    var whitespace, wordchar, punct, parser_pos, line_starters, digits;
    var prefix, token_type, do_block_just_closed;
    var wanted_newline, just_added_newline, n_newlines;
    var preindent_string = '';


    // Some interpreters have unexpected results with foo = baz || bar;
    options = options ? options : {};

    var opt_brace_style;

    // compatibility
    if (options.space_after_anon_function !== undefined && options.jslint_happy === undefined) {
        options.jslint_happy = options.space_after_anon_function;
    }
    if (options.braces_on_own_line !== undefined) { //graceful handling of deprecated option
        opt_brace_style = options.braces_on_own_line ? "expand" : "collapse";
    }
    opt_brace_style = options.brace_style ? options.brace_style : (opt_brace_style ? opt_brace_style : "collapse");


    var opt_indent_size = options.indent_size ? options.indent_size : 4,
        opt_indent_char = options.indent_char ? options.indent_char : ' ',
        opt_preserve_newlines = typeof options.preserve_newlines === 'undefined' ? true : options.preserve_newlines,
        opt_break_chained_methods = typeof options.break_chained_methods === 'undefined' ? false : options.break_chained_methods,
        opt_max_preserve_newlines = typeof options.max_preserve_newlines === 'undefined' ? false : options.max_preserve_newlines,
        opt_jslint_happy = options.jslint_happy === 'undefined' ? false : options.jslint_happy,
        opt_keep_array_indentation = typeof options.keep_array_indentation === 'undefined' ? false : options.keep_array_indentation,
        opt_space_before_conditional = typeof options.space_before_conditional === 'undefined' ? true : options.space_before_conditional,
        opt_unescape_strings = typeof options.unescape_strings === 'undefined' ? false : options.unescape_strings;

    just_added_newline = false;

    // cache the source's length.
    var input_length = js_source_text.length;

    function trim_output(eat_newlines) {
        eat_newlines = typeof eat_newlines === 'undefined' ? false : eat_newlines;
        while (output.length && (output[output.length - 1] === ' '
            || output[output.length - 1] === indent_string
            || output[output.length - 1] === preindent_string
            || (eat_newlines && (output[output.length - 1] === '\n' || output[output.length - 1] === '\r')))) {
            output.pop();
        }
    }

    function trim(s) {
        return s.replace(/^\s\s*|\s\s*$/, '');
    }

    // we could use just string.split, but
    // IE doesn't like returning empty strings
    function split_newlines(s) {
        //return s.split(/\x0d\x0a|\x0a/);

        s = s.replace(/\x0d/g, '');
        var out = [],
            idx = s.indexOf("\n");
        while (idx !== -1) {
            out.push(s.substring(0, idx));
            s = s.substring(idx + 1);
            idx = s.indexOf("\n");
        }
        if (s.length) {
            out.push(s);
        }
        return out;
    }

    function force_newline() {
        var old_keep_array_indentation = opt_keep_array_indentation;
        opt_keep_array_indentation = false;
        print_newline();
        opt_keep_array_indentation = old_keep_array_indentation;
    }

    function print_newline(ignore_repeated, reset_statement_flags) {

        flags.eat_next_space = false;
        if (opt_keep_array_indentation && is_array(flags.mode)) {
            return;
        }

        ignore_repeated = typeof ignore_repeated === 'undefined' ? true : ignore_repeated;
        reset_statement_flags = typeof reset_statement_flags === 'undefined' ? true : reset_statement_flags;

        if (reset_statement_flags) {
            flags.if_line = false;
            flags.chain_extra_indentation = 0;
        }

        trim_output();

        if (!output.length) {
            return; // no newline on start of file
        }

        if (output[output.length - 1] !== "\n" || !ignore_repeated) {
            just_added_newline = true;
            output.push("\n");
        }
        if (preindent_string) {
            output.push(preindent_string);
        }
        for (var i = 0; i < flags.indentation_level + flags.chain_extra_indentation; i += 1) {
            output.push(indent_string);
        }
        if (flags.var_line && flags.var_line_reindented) {
            output.push(indent_string); // skip space-stuffing, if indenting with a tab
        }
    }



    function print_single_space() {

        if (last_type === 'TK_COMMENT') {
            return print_newline();
        }
        if (flags.eat_next_space) {
            flags.eat_next_space = false;
            return;
        }
        var last_output = ' ';
        if (output.length) {
            last_output = output[output.length - 1];
        }
        if (last_output !== ' ' && last_output !== '\n' && last_output !== indent_string) { // prevent occassional duplicate space
            output.push(' ');
        }
    }


    function print_token() {
        just_added_newline = false;
        flags.eat_next_space = false;
        output.push(token_text);
    }

    function indent() {
        flags.indentation_level += 1;
    }


    function remove_indent() {
        if (output.length && output[output.length - 1] === indent_string) {
            output.pop();
        }
    }

    function set_mode(mode) {
        if (flags) {
            flag_store.push(flags);
        }
        flags = {
            previous_mode: flags ? flags.mode : 'BLOCK',
            mode: mode,
            var_line: false,
            var_line_tainted: false,
            var_line_reindented: false,
            in_html_comment: false,
            if_line: false,
            chain_extra_indentation: 0,
            in_case_statement: false, // switch(..){ INSIDE HERE }
            in_case: false, // we're on the exact line with "case 0:"
            case_body: false, // the indented case-action block
            eat_next_space: false,
            indentation_level: (flags ? flags.indentation_level + ((flags.var_line && flags.var_line_reindented) ? 1 : 0) : 0),
            ternary_depth: 0
        };
    }

    function is_array(mode) {
        return mode === '[EXPRESSION]' || mode === '[INDENTED-EXPRESSION]';
    }

    function is_expression(mode) {
        return in_array(mode, ['[EXPRESSION]', '(EXPRESSION)', '(FOR-EXPRESSION)', '(COND-EXPRESSION)']);
    }

    function restore_mode() {
        do_block_just_closed = flags.mode === 'DO_BLOCK';
        if (flag_store.length > 0) {
            var mode = flags.mode;
            flags = flag_store.pop();
            flags.previous_mode = mode;
        }
    }

    function all_lines_start_with(lines, c) {
        for (var i = 0; i < lines.length; i++) {
            var line = trim(lines[i]);
            if (line.charAt(0) !== c) {
                return false;
            }
        }
        return true;
    }

    function is_special_word(word) {
        return in_array(word, ['case', 'return', 'do', 'if', 'throw', 'else']);
    }

    function in_array(what, arr) {
        for (var i = 0; i < arr.length; i += 1) {
            if (arr[i] === what) {
                return true;
            }
        }
        return false;
    }

    function look_up(exclude) {
        var local_pos = parser_pos;
        var c = input.charAt(local_pos);
        while (in_array(c, whitespace) && c !== exclude) {
            local_pos++;
            if (local_pos >= input_length) {
                return 0;
            }
            c = input.charAt(local_pos);
        }
        return c;
    }

    function get_next_token() {
        var i;
        var resulting_string;

        n_newlines = 0;

        if (parser_pos >= input_length) {
            return ['', 'TK_EOF'];
        }

        wanted_newline = false;

        var c = input.charAt(parser_pos);
        parser_pos += 1;


        var keep_whitespace = opt_keep_array_indentation && is_array(flags.mode);

        if (keep_whitespace) {

            var whitespace_count = 0;

            while (in_array(c, whitespace)) {

                if (c === "\n") {
                    trim_output();
                    output.push("\n");
                    just_added_newline = true;
                    whitespace_count = 0;
                } else {
                    if (c === '\t') {
                        whitespace_count += 4;
                    } else if (c === '\r') {
                        // nothing
                    } else {
                        whitespace_count += 1;
                    }
                }

                if (parser_pos >= input_length) {
                    return ['', 'TK_EOF'];
                }

                c = input.charAt(parser_pos);
                parser_pos += 1;

            }

            if (just_added_newline) {
                for (i = 0; i < whitespace_count; i++) {
                    output.push(' ');
                }
            }

        } else {
            while (in_array(c, whitespace)) {

                if (c === "\n") {
                    n_newlines += ((opt_max_preserve_newlines) ? (n_newlines <= opt_max_preserve_newlines) ? 1 : 0 : 1);
                }


                if (parser_pos >= input_length) {
                    return ['', 'TK_EOF'];
                }

                c = input.charAt(parser_pos);
                parser_pos += 1;

            }

            if (opt_preserve_newlines) {
                if (n_newlines > 1) {
                    for (i = 0; i < n_newlines; i += 1) {
                        print_newline(i === 0);
                        just_added_newline = true;
                    }
                }
            }
            wanted_newline = n_newlines > 0;
        }


        if (in_array(c, wordchar)) {
            if (parser_pos < input_length) {
                while (in_array(input.charAt(parser_pos), wordchar)) {
                    c += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos === input_length) {
                        break;
                    }
                }
            }

            // small and surprisingly unugly hack for 1E-10 representation
            if (parser_pos !== input_length && c.match(/^[0-9]+[Ee]$/) && (input.charAt(parser_pos) === '-' || input.charAt(parser_pos) === '+')) {

                var sign = input.charAt(parser_pos);
                parser_pos += 1;

                var t = get_next_token();
                c += sign + t[0];
                return [c, 'TK_WORD'];
            }

            if (c === 'in') { // hack for 'in' operator
                return [c, 'TK_OPERATOR'];
            }
            if (wanted_newline && last_type !== 'TK_OPERATOR'
                && last_type !== 'TK_EQUALS'
                && !flags.if_line && (opt_preserve_newlines || last_text !== 'var')) {
                print_newline();
            }
            return [c, 'TK_WORD'];
        }

        if (c === '(' || c === '[') {
            return [c, 'TK_START_EXPR'];
        }

        if (c === ')' || c === ']') {
            return [c, 'TK_END_EXPR'];
        }

        if (c === '{') {
            return [c, 'TK_START_BLOCK'];
        }

        if (c === '}') {
            return [c, 'TK_END_BLOCK'];
        }

        if (c === ';') {
            return [c, 'TK_SEMICOLON'];
        }

        if (c === '/') {
            var comment = '';
            // peek for comment /* ... */
            var inline_comment = true;
            if (input.charAt(parser_pos) === '*') {
                parser_pos += 1;
                if (parser_pos < input_length) {
                    while (parser_pos < input_length &&
                        ! (input.charAt(parser_pos) === '*' && input.charAt(parser_pos + 1) && input.charAt(parser_pos + 1) === '/')) {
                        c = input.charAt(parser_pos);
                        comment += c;
                        if (c === "\n" || c === "\r") {
                            inline_comment = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            break;
                        }
                    }
                }
                parser_pos += 2;
                if (inline_comment && n_newlines === 0) {
                    return ['/*' + comment + '*/', 'TK_INLINE_COMMENT'];
                } else {
                    return ['/*' + comment + '*/', 'TK_BLOCK_COMMENT'];
                }
            }
            // peek for comment // ...
            if (input.charAt(parser_pos) === '/') {
                comment = c;
                while (input.charAt(parser_pos) !== '\r' && input.charAt(parser_pos) !== '\n') {
                    comment += input.charAt(parser_pos);
                    parser_pos += 1;
                    if (parser_pos >= input_length) {
                        break;
                    }
                }
                if (wanted_newline) {
                    print_newline();
                }
                return [comment, 'TK_COMMENT'];
            }

        }

        if (c === "'" || // string
        c === '"' || // string
        (c === '/' &&
            ((last_type === 'TK_WORD' && is_special_word(last_text)) ||
                (last_text === ')' && in_array(flags.previous_mode, ['(COND-EXPRESSION)', '(FOR-EXPRESSION)'])) ||
                (last_type === 'TK_COMMA' || last_type === 'TK_COMMENT' || last_type === 'TK_START_EXPR' || last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_OPERATOR' || last_type === 'TK_EQUALS' || last_type === 'TK_EOF' || last_type === 'TK_SEMICOLON')))) { // regexp
            var sep = c;
            var esc = false;
            var esc1 = 0;
            var esc2 = 0;
            resulting_string = c;

            if (parser_pos < input_length) {
                if (sep === '/') {
                    //
                    // handle regexp separately...
                    //
                    var in_char_class = false;
                    while (esc || in_char_class || input.charAt(parser_pos) !== sep) {
                        resulting_string += input.charAt(parser_pos);
                        if (!esc) {
                            esc = input.charAt(parser_pos) === '\\';
                            if (input.charAt(parser_pos) === '[') {
                                in_char_class = true;
                            } else if (input.charAt(parser_pos) === ']') {
                                in_char_class = false;
                            }
                        } else {
                            esc = false;
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_STRING'];
                        }
                    }

                } else {
                    //
                    // and handle string also separately
                    //
                    while (esc || input.charAt(parser_pos) !== sep) {
                        resulting_string += input.charAt(parser_pos);
                        if (esc1 && esc1 >= esc2) {
                            esc1 = parseInt(resulting_string.substr(-esc2), 16);
                            if (esc1 && esc1 >= 0x20 && esc1 <= 0x7e) {
                                esc1 = String.fromCharCode(esc1);
                                resulting_string = resulting_string.substr(0, resulting_string.length - esc2 - 2) + (((esc1 === sep) || (esc1 === '\\')) ? '\\' : '') + esc1;
                            }
                            esc1 = 0;
                        }
                        if (esc1) {
                            esc1++;
                        } else if (!esc) {
                            esc = input.charAt(parser_pos) === '\\';
                        } else {
                            esc = false;
                            if (opt_unescape_strings) {
                                if (input.charAt(parser_pos) === 'x') {
                                    esc1++;
                                    esc2 = 2;
                                } else if (input.charAt(parser_pos) === 'u') {
                                    esc1++;
                                    esc2 = 4;
                                }
                            }
                        }
                        parser_pos += 1;
                        if (parser_pos >= input_length) {
                            // incomplete string/rexp when end-of-file reached.
                            // bail out with what had been received so far.
                            return [resulting_string, 'TK_STRING'];
                        }
                    }
                }



            }

            parser_pos += 1;

            resulting_string += sep;

            if (sep === '/') {
                // regexps may have modifiers /regexp/MOD , so fetch those, too
                while (parser_pos < input_length && in_array(input.charAt(parser_pos), wordchar)) {
                    resulting_string += input.charAt(parser_pos);
                    parser_pos += 1;
                }
            }
            return [resulting_string, 'TK_STRING'];
        }

        if (c === '#') {


            if (output.length === 0 && input.charAt(parser_pos) === '!') {
                // shebang
                resulting_string = c;
                while (parser_pos < input_length && c !== '\n') {
                    c = input.charAt(parser_pos);
                    resulting_string += c;
                    parser_pos += 1;
                }
                output.push(trim(resulting_string) + '\n');
                print_newline();
                return get_next_token();
            }



            // Spidermonkey-specific sharp variables for circular references
            // https://developer.mozilla.org/En/Sharp_variables_in_JavaScript
            // http://mxr.mozilla.org/mozilla-central/source/js/src/jsscan.cpp around line 1935
            var sharp = '#';
            if (parser_pos < input_length && in_array(input.charAt(parser_pos), digits)) {
                do {
                    c = input.charAt(parser_pos);
                    sharp += c;
                    parser_pos += 1;
                } while (parser_pos < input_length && c !== '#' && c !== '=');
                if (c === '#') {
                    //
                } else if (input.charAt(parser_pos) === '[' && input.charAt(parser_pos + 1) === ']') {
                    sharp += '[]';
                    parser_pos += 2;
                } else if (input.charAt(parser_pos) === '{' && input.charAt(parser_pos + 1) === '}') {
                    sharp += '{}';
                    parser_pos += 2;
                }
                return [sharp, 'TK_WORD'];
            }
        }

        if (c === '<' && input.substring(parser_pos - 1, parser_pos + 3) === '<!--') {
            parser_pos += 3;
            c = '<!--';
            while (input.charAt(parser_pos) !== '\n' && parser_pos < input_length) {
                c += input.charAt(parser_pos);
                parser_pos++;
            }
            flags.in_html_comment = true;
            return [c, 'TK_COMMENT'];
        }

        if (c === '-' && flags.in_html_comment && input.substring(parser_pos - 1, parser_pos + 2) === '-->') {
            flags.in_html_comment = false;
            parser_pos += 2;
            if (wanted_newline) {
                print_newline();
            }
            return ['-->', 'TK_COMMENT'];
        }

        if (c === '.') {
            return [c, 'TK_DOT'];
        }

        if (in_array(c, punct)) {
            while (parser_pos < input_length && in_array(c + input.charAt(parser_pos), punct)) {
                c += input.charAt(parser_pos);
                parser_pos += 1;
                if (parser_pos >= input_length) {
                    break;
                }
            }

            if (c === ',') {
                return [c, 'TK_COMMA'];
            } else if (c === '=') {
                return [c, 'TK_EQUALS'];
            } else {
                return [c, 'TK_OPERATOR'];
            }
        }

        return [c, 'TK_UNKNOWN'];
    }

    //----------------------------------
    indent_string = '';
    while (opt_indent_size > 0) {
        indent_string += opt_indent_char;
        opt_indent_size -= 1;
    }

    while (js_source_text && (js_source_text.charAt(0) === ' ' || js_source_text.charAt(0) === '\t')) {
        preindent_string += js_source_text.charAt(0);
        js_source_text = js_source_text.substring(1);
    }
    input = js_source_text;

    last_word = ''; // last 'TK_WORD' passed
    last_type = 'TK_START_EXPR'; // last token type
    last_text = ''; // last token text
    last_last_text = ''; // pre-last token text
    output = [];

    do_block_just_closed = false;

    whitespace = "\n\r\t ".split('');
    wordchar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$'.split('');
    digits = '0123456789'.split('');

    punct = '+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::';
    punct += ' <%= <% %> <?= <? ?>'; // try to be a good boy and try not to break the markup language identifiers
    punct = punct.split(' ');

    // words which should always start on new line.
    line_starters = 'continue,try,throw,return,var,if,switch,case,default,for,while,break,function'.split(',');

    // states showing if we are currently in expression (i.e. "if" case) - 'EXPRESSION', or in usual block (like, procedure), 'BLOCK'.
    // some formatting depends on that.
    flag_store = [];
    set_mode('BLOCK');

    parser_pos = 0;
    while (true) {
        var t = get_next_token();
        token_text = t[0];
        token_type = t[1];
        if (token_type === 'TK_EOF') {
            break;
        }

        switch (token_type) {

        case 'TK_START_EXPR':

            if (token_text === '[') {

                if (last_type === 'TK_WORD' || last_text === ')') {
                    // this is array index specifier, break immediately
                    // a[x], fn()[x]
                    if (in_array(last_text, line_starters)) {
                        print_single_space();
                    }
                    set_mode('(EXPRESSION)');
                    print_token();
                    break;
                }

                if (flags.mode === '[EXPRESSION]' || flags.mode === '[INDENTED-EXPRESSION]') {
                    if (last_last_text === ']' && last_text === ',') {
                        // ], [ goes to new line
                        if (flags.mode === '[EXPRESSION]') {
                            flags.mode = '[INDENTED-EXPRESSION]';
                            if (!opt_keep_array_indentation) {
                                indent();
                            }
                        }
                        set_mode('[EXPRESSION]');
                        if (!opt_keep_array_indentation) {
                            print_newline();
                        }
                    } else if (last_text === '[') {
                        if (flags.mode === '[EXPRESSION]') {
                            flags.mode = '[INDENTED-EXPRESSION]';
                            if (!opt_keep_array_indentation) {
                                indent();
                            }
                        }
                        set_mode('[EXPRESSION]');

                        if (!opt_keep_array_indentation) {
                            print_newline();
                        }
                    } else {
                        set_mode('[EXPRESSION]');
                    }
                } else {
                    set_mode('[EXPRESSION]');
                }



            } else {
                if (last_word === 'for') {
                    set_mode('(FOR-EXPRESSION)');
                } else if (in_array(last_word, ['if', 'while'])) {
                    set_mode('(COND-EXPRESSION)');
                } else {
                    set_mode('(EXPRESSION)');
                }
            }

            if (last_text === ';' || last_type === 'TK_START_BLOCK') {
                print_newline();
            } else if (last_type === 'TK_END_EXPR' || last_type === 'TK_START_EXPR' || last_type === 'TK_END_BLOCK' || last_text === '.') {
                if (wanted_newline) {
                    print_newline();
                }
                // do nothing on (( and )( and ][ and ]( and .(
            } else if (last_type !== 'TK_WORD' && last_type !== 'TK_OPERATOR') {
                print_single_space();
            } else if (last_word === 'function' || last_word === 'typeof') {
                // function() vs function ()
                if (opt_jslint_happy) {
                    print_single_space();
                }
            } else if (in_array(last_text, line_starters) || last_text === 'catch') {
                if (opt_space_before_conditional) {
                    print_single_space();
                }
            }
            print_token();

            break;

        case 'TK_DOT':

            if (is_special_word(last_text)) {
                print_single_space();
            } else if (last_text === ')') {
                if (opt_break_chained_methods || wanted_newline) {
                    flags.chain_extra_indentation = 1;
                    print_newline(true /* ignore_repeated */, false /* reset_statement_flags */);
                }
            }

            print_token();
            break;

        case 'TK_END_EXPR':
            if (token_text === ']') {
                if (opt_keep_array_indentation) {
                    if (last_text === '}') {
                        // trim_output();
                        // print_newline(true);
                        remove_indent();
                        print_token();
                        restore_mode();
                        break;
                    }
                } else {
                    if (flags.mode === '[INDENTED-EXPRESSION]') {
                        if (last_text === ']') {
                            restore_mode();
                            print_newline();
                            print_token();
                            break;
                        }
                    }
                }
            }
            restore_mode();
            print_token();
            break;

        case 'TK_START_BLOCK':

            if (last_word === 'do') {
                set_mode('DO_BLOCK');
            } else {
                set_mode('BLOCK');
            }
            if (opt_brace_style === "expand" || opt_brace_style === "expand-strict") {
                var empty_braces = false;
                if (opt_brace_style === "expand-strict") {
                    empty_braces = (look_up() === '}');
                    if (!empty_braces) {
                        print_newline(true);
                    }
                } else {
                    if (last_type !== 'TK_OPERATOR') {
                        if (last_text === '=' || (is_special_word(last_text) && last_text !== 'else')) {
                            print_single_space();
                        } else {
                            print_newline(true);
                        }
                    }
                }
                print_token();
                if (!empty_braces) {
                    indent();
                }
            } else {
                if (last_type !== 'TK_OPERATOR' && last_type !== 'TK_START_EXPR') {
                    if (last_type === 'TK_START_BLOCK') {
                        print_newline();
                    } else {
                        print_single_space();
                    }
                } else {
                    // if TK_OPERATOR or TK_START_EXPR
                    if (is_array(flags.previous_mode) && last_text === ',') {
                        if (last_last_text === '}') {
                            // }, { in array context
                            print_single_space();
                        } else {
                            print_newline(); // [a, b, c, {
                        }
                    }
                }
                indent();
                print_token();
            }

            break;

        case 'TK_END_BLOCK':
            restore_mode();
            if (opt_brace_style === "expand" || opt_brace_style === "expand-strict") {
                if (last_text !== '{') {
                    print_newline();
                }
                print_token();
            } else {
                if (last_type === 'TK_START_BLOCK') {
                    // nothing
                    if (just_added_newline) {
                        remove_indent();
                    } else {
                        // {}
                        trim_output();
                    }
                } else {
                    if (is_array(flags.mode) && opt_keep_array_indentation) {
                        // we REALLY need a newline here, but newliner would skip that
                        opt_keep_array_indentation = false;
                        print_newline();
                        opt_keep_array_indentation = true;

                    } else {
                        print_newline();
                    }
                }
                print_token();
            }
            break;

        case 'TK_WORD':

            // no, it's not you. even I have problems understanding how this works
            // and what does what.
            if (do_block_just_closed) {
                // do {} ## while ()
                print_single_space();
                print_token();
                print_single_space();
                do_block_just_closed = false;
                break;
            }

            prefix = 'NONE';

            if (token_text === 'function') {
                if (flags.var_line && last_type !== 'TK_EQUALS' ) {
                    flags.var_line_reindented = true;
                }
                if ((just_added_newline || last_text === ';') && last_text !== '{'
                && last_type !== 'TK_BLOCK_COMMENT' && last_type !== 'TK_COMMENT') {
                    // make sure there is a nice clean space of at least one blank line
                    // before a new function definition
                    n_newlines = just_added_newline ? n_newlines : 0;
                    if (!opt_preserve_newlines) {
                        n_newlines = 1;
                    }

                    for (var i = 0; i < 2 - n_newlines; i++) {
                        print_newline(false);
                    }
                }
                if (last_type === 'TK_WORD') {
                    if (last_text === 'get' || last_text === 'set' || last_text === 'new' || last_text === 'return') {
                        print_single_space();
                    } else {
                        print_newline();
                    }
                } else if (last_type === 'TK_OPERATOR' || last_text === '=') {
                    // foo = function
                    print_single_space();
                } else if (is_expression(flags.mode)) {
                    // print nothing
                } else {
                    print_newline();
                }

                print_token();
                last_word = token_text;
                break;
            }

            if (token_text === 'case' || (token_text === 'default' && flags.in_case_statement)) {
                print_newline();
                if (flags.case_body) {
                    // switch cases following one another
                    flags.indentation_level--;
                    flags.case_body = false;
                    remove_indent();
                }
                print_token();
                flags.in_case = true;
                flags.in_case_statement = true;
                break;
            }

            if (last_type === 'TK_END_BLOCK') {

                if (!in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                    prefix = 'NEWLINE';
                } else {
                    if (opt_brace_style === "expand" || opt_brace_style === "end-expand" || opt_brace_style === "expand-strict") {
                        prefix = 'NEWLINE';
                    } else {
                        prefix = 'SPACE';
                        print_single_space();
                    }
                }
            } else if (last_type === 'TK_SEMICOLON' && (flags.mode === 'BLOCK' || flags.mode === 'DO_BLOCK')) {
                prefix = 'NEWLINE';
            } else if (last_type === 'TK_SEMICOLON' && is_expression(flags.mode)) {
                prefix = 'SPACE';
            } else if (last_type === 'TK_STRING') {
                prefix = 'NEWLINE';
            } else if (last_type === 'TK_WORD') {
                if (last_text === 'else') {
                    // eat newlines between ...else *** some_op...
                    // won't preserve extra newlines in this place (if any), but don't care that much
                    trim_output(true);
                }
                prefix = 'SPACE';
            } else if (last_type === 'TK_START_BLOCK') {
                prefix = 'NEWLINE';
            } else if (last_type === 'TK_END_EXPR') {
                print_single_space();
                prefix = 'NEWLINE';
            }

            if (in_array(token_text, line_starters) && last_text !== ')') {
                if (last_text === 'else') {
                    prefix = 'SPACE';
                } else {
                    prefix = 'NEWLINE';
                }

            }

            if (flags.if_line && last_type === 'TK_END_EXPR') {
                flags.if_line = false;
            }
            if (in_array(token_text.toLowerCase(), ['else', 'catch', 'finally'])) {
                if (last_type !== 'TK_END_BLOCK' || opt_brace_style === "expand" || opt_brace_style === "end-expand" || opt_brace_style === "expand-strict") {
                    print_newline();
                } else {
                    trim_output(true);
                    print_single_space();
                }
            } else if (prefix === 'NEWLINE') {
                if (is_special_word(last_text)) {
                    // no newline between 'return nnn'
                    print_single_space();
                } else if (last_type !== 'TK_END_EXPR') {
                    if ((last_type !== 'TK_START_EXPR' || token_text !== 'var') && last_text !== ':') {
                        // no need to force newline on 'var': for (var x = 0...)
                        if (token_text === 'if' && last_word === 'else' && last_text !== '{') {
                            // no newline for } else if {
                            print_single_space();
                        } else {
                            flags.var_line = false;
                            flags.var_line_reindented = false;
                            print_newline();
                        }
                    }
                } else if (in_array(token_text, line_starters) && last_text !== ')') {
                    flags.var_line = false;
                    flags.var_line_reindented = false;
                    print_newline();
                }
            } else if (is_array(flags.mode) && last_text === ',' && last_last_text === '}') {
                print_newline(); // }, in lists get a newline treatment
            } else if (prefix === 'SPACE') {
                print_single_space();
            }
            print_token();
            last_word = token_text;

            if (token_text === 'var') {
                flags.var_line = true;
                flags.var_line_reindented = false;
                flags.var_line_tainted = false;
            }

            if (token_text === 'if') {
                flags.if_line = true;
            }
            if (token_text === 'else') {
                flags.if_line = false;
            }

            break;

        case 'TK_SEMICOLON':

            print_token();
            flags.var_line = false;
            flags.var_line_reindented = false;
            if (flags.mode === 'OBJECT') {
                // OBJECT mode is weird and doesn't get reset too well.
                flags.mode = 'BLOCK';
            }
            break;

        case 'TK_STRING':

            if (last_type === 'TK_END_EXPR' && in_array(flags.previous_mode, ['(COND-EXPRESSION)', '(FOR-EXPRESSION)'])) {
                print_single_space();
            } else if (last_type === 'TK_COMMENT' || last_type === 'TK_STRING' || last_type === 'TK_START_BLOCK' || last_type === 'TK_END_BLOCK' || last_type === 'TK_SEMICOLON') {
                print_newline();
            } else if (last_type === 'TK_WORD') {
                print_single_space();
            } else {
                if (opt_preserve_newlines && wanted_newline) {
                    print_newline();
                    output.push(indent_string);
                }
            }
            print_token();
            break;

        case 'TK_EQUALS':
            if (flags.var_line) {
                // just got an '=' in a var-line, different formatting/line-breaking, etc will now be done
                flags.var_line_tainted = true;
            }
            print_single_space();
            print_token();
            print_single_space();
            break;

        case 'TK_COMMA':
            if (flags.var_line) {
                if (is_expression(flags.mode) || last_type === 'TK_END_BLOCK' ) {
                    // do not break on comma, for(var a = 1, b = 2)
                    flags.var_line_tainted = false;
                }
                if (flags.var_line_tainted) {
                    print_token();
                    flags.var_line_reindented = true;
                    flags.var_line_tainted = false;
                    print_newline();
                    break;
                } else {
                    flags.var_line_tainted = false;
                }

                print_token();
                print_single_space();
                break;
            }

            if (last_type === 'TK_COMMENT') {
                print_newline();
            }

            if (last_type === 'TK_END_BLOCK' && flags.mode !== "(EXPRESSION)") {
                print_token();
                if (flags.mode === 'OBJECT' && last_text === '}') {
                    print_newline();
                } else {
                    print_single_space();
                }
            } else {
                if (flags.mode === 'OBJECT') {
                    print_token();
                    print_newline();
                } else {
                    // EXPR or DO_BLOCK
                    print_token();
                    print_single_space();
                }
            }
            break;


        case 'TK_OPERATOR':

            var space_before = true;
            var space_after = true;
            if (is_special_word(last_text)) {
                // "return" had a special handling in TK_WORD. Now we need to return the favor
                print_single_space();
                print_token();
                break;
            }

            // hack for actionscript's import .*;
            if (token_text === '*' && last_type === 'TK_DOT' && !last_last_text.match(/^\d+$/)) {
                print_token();
                break;
            }

            if (token_text === ':' && flags.in_case) {
                flags.case_body = true;
                indent();
                print_token();
                print_newline();
                flags.in_case = false;
                break;
            }

            if (token_text === '::') {
                // no spaces around exotic namespacing syntax operator
                print_token();
                break;
            }

            if (in_array(token_text, ['--', '++', '!']) || (in_array(token_text, ['-', '+']) && (in_array(last_type, ['TK_START_BLOCK', 'TK_START_EXPR', 'TK_EQUALS', 'TK_OPERATOR']) || in_array(last_text, line_starters) || last_text == ','))) {
                // unary operators (and binary +/- pretending to be unary) special cases

                space_before = false;
                space_after = false;

                if (last_text === ';' && is_expression(flags.mode)) {
                    // for (;; ++i)
                    //        ^^^
                    space_before = true;
                }
                if (last_type === 'TK_WORD' && in_array(last_text, line_starters)) {
                    space_before = true;
                }

                if (flags.mode === 'BLOCK' && (last_text === '{' || last_text === ';')) {
                    // { foo; --i }
                    // foo(); --bar;
                    print_newline();
                }
            } else if (token_text === ':') {
                if (flags.ternary_depth === 0) {
                    if (flags.mode === 'BLOCK') {
                        flags.mode = 'OBJECT';
                    }
                    space_before = false;
                } else {
                    flags.ternary_depth -= 1;
                }
            } else if (token_text === '?') {
                flags.ternary_depth += 1;
            }
            if (space_before) {
                print_single_space();
            }

            print_token();

            if (space_after) {
                print_single_space();
            }

            break;

        case 'TK_BLOCK_COMMENT':

            var lines = split_newlines(token_text);
            var j; // iterator for this case

            if (all_lines_start_with(lines.slice(1), '*')) {
                // javadoc: reformat and reindent
                print_newline();
                output.push(lines[0]);
                for (j = 1; j < lines.length; j++) {
                    print_newline();
                    output.push(' ');
                    output.push(trim(lines[j]));
                }

            } else {

                // simple block comment: leave intact
                if (lines.length > 1) {
                    // multiline comment block starts with a new line
                    print_newline();
                } else {
                    // single-line /* comment */ stays where it is
                    if (last_type === 'TK_END_BLOCK') {
                        print_newline();
                    } else {
                        print_single_space();
                    }

                }

                for (j = 0; j < lines.length; j++) {
                    output.push(lines[j]);
                    output.push("\n");
                }

            }
            if (look_up('\n') !== '\n') {
                print_newline();
            }
            break;

        case 'TK_INLINE_COMMENT':
            print_single_space();
            print_token();
            if (is_expression(flags.mode)) {
                print_single_space();
            } else {
                force_newline();
            }
            break;

        case 'TK_COMMENT':

            if (last_text === ',' && !wanted_newline) {
                trim_output(true);
            }
            if (last_type !== 'TK_COMMENT') {
                if (wanted_newline) {
                    print_newline();
                } else {
                    print_single_space();
                }
            }
            print_token();
            print_newline();
            break;

        case 'TK_UNKNOWN':
            print_token();
            break;
        }

        last_last_text = last_text;
        last_type = token_type;
        last_text = token_text;
    }

    var sweet_code = preindent_string + output.join('').replace(/[\r\n ]+$/, '');
    return sweet_code;

}