import MagicString from 'magic-string';
import { parse } from '@babel/parser';

const PHRASE_REPLACEMENTS = [
  {
    source: ['йопта', 'импорт'],
    target: 'import',
    token: { type: 'keyword', value: 'import' },
  },
  {
    source: ['йопта', 'экспорт', 'по-братски'],
    target: 'export default',
    token: { type: 'keyword', value: 'default' },
  },
  {
    source: ['внатуре', 'отвечаю'],
    target: 'return',
    token: { type: 'keyword', value: 'return' },
  },
];

const TOKEN_REPLACEMENTS = new Map([
  ['базарю', { target: 'function', token: { type: 'keyword', value: 'function' } }],
  ['ёпта', { target: 'const', token: { type: 'keyword', value: 'const' } }],
  ['отвечаю', { target: 'return', token: { type: 'keyword', value: 'return' } }],
  ['из', { target: 'from', token: { type: 'keyword', value: 'from' } }],
]);

const WORD_RE = /[\p{L}\p{N}_$-]/u;
const WORD_START_RE = /[\p{L}_$]/u;
const JSX_TAG_RE = /[A-Za-z]/;
const NUMBER_RE = /[0-9A-Fa-f_xobn.]/;

function isWordChar(char) {
  return Boolean(char) && WORD_RE.test(char);
}

function isWordStart(char) {
  return Boolean(char) && WORD_START_RE.test(char);
}

function isWhitespace(char) {
  return char === ' ' || char === '\t' || char === '\n' || char === '\r' || char === '\f';
}

function isJsxTagStart(char) {
  return char === '>' || JSX_TAG_RE.test(char);
}

function isNumberStart(char) {
  return Boolean(char) && /[0-9]/.test(char);
}

function getLineColumn(code, index) {
  let line = 1;
  let column = 0;

  for (let cursor = 0; cursor < index; cursor += 1) {
    if (code[cursor] === '\n') {
      line += 1;
      column = 0;
    } else {
      column += 1;
    }
  }

  return { line, column: column + 1 };
}

function formatTransformError({ filename, code, pos, message }) {
  const { line, column } = getLineColumn(code, pos);
  const error = new Error(`${filename}:${line}:${column} ${message}`);
  error.loc = { line, column };
  error.pos = pos;
  return error;
}

class YoptaScanner {
  constructor(code, filename) {
    this.code = code;
    this.filename = filename;
    this.magic = new MagicString(code);
    this.index = 0;
    this.lastToken = { type: 'start', value: '' };
    this.replacements = [];
  }

  transform() {
    this.scanJS();

    const output = this.magic.toString();

    try {
      parse(output, {
        sourceType: 'module',
        plugins: ['jsx'],
        allowReturnOutsideFunction: false,
      });
    } catch (error) {
      const originalPos = this.mapGeneratedIndexToOriginal(error.pos ?? 0);
      throw formatTransformError({
        filename: this.filename,
        code: this.code,
        pos: originalPos,
        message: error.message,
      });
    }

    return {
      code: output,
      map: this.magic.generateMap({
        hires: true,
        includeContent: true,
        source: this.filename,
      }),
    };
  }

  mapGeneratedIndexToOriginal(generatedIndex) {
    let delta = 0;

    for (const replacement of this.replacements) {
      const originalLength = replacement.end - replacement.start;
      const generatedStart = replacement.start + delta;
      const generatedEnd = generatedStart + replacement.target.length;

      if (generatedIndex < generatedStart) {
        break;
      }

      if (generatedIndex <= generatedEnd) {
        return replacement.start;
      }

      delta += replacement.target.length - originalLength;
    }

    return generatedIndex - delta;
  }

  overwrite(start, end, target) {
    this.magic.overwrite(start, end, target);
    this.replacements.push({ start, end, target });
  }

  scanJS(stopChar = null) {
    const previousToken = this.lastToken;
    this.lastToken = { type: 'start', value: '' };
    let braceDepth = 0;

    while (this.index < this.code.length) {
      const char = this.code[this.index];
      const next = this.code[this.index + 1];

      if (stopChar === '}' && char === '}') {
        if (braceDepth === 0) {
          this.lastToken = previousToken;
          return;
        }

        braceDepth -= 1;
        this.lastToken = { type: 'punctuation', value: '}' };
        this.index += 1;
        continue;
      }

      if (isWhitespace(char)) {
        this.index += 1;
        continue;
      }

      if (char === '/' && next === '/') {
        this.scanLineComment();
        continue;
      }

      if (char === '/' && next === '*') {
        this.scanBlockComment();
        continue;
      }

      if (char === '\'' || char === '"') {
        this.scanQuotedString(char);
        this.lastToken = { type: 'literal', value: 'string' };
        continue;
      }

      if (char === '`') {
        this.scanTemplateString();
        this.lastToken = { type: 'literal', value: 'template' };
        continue;
      }

      if (char === '{') {
        braceDepth += 1;
        this.lastToken = { type: 'punctuation', value: '{' };
        this.index += 1;
        continue;
      }

      if (this.startsJsxElement()) {
        this.scanJSXElement();
        this.lastToken = { type: 'literal', value: 'jsx' };
        continue;
      }

      const phraseMatch = this.matchPhrase(this.index);
      if (phraseMatch) {
        this.overwrite(phraseMatch.start, phraseMatch.end, phraseMatch.target);
        this.lastToken = phraseMatch.token;
        this.index = phraseMatch.end;
        continue;
      }

      if (isWordStart(char)) {
        const start = this.index;
        const word = this.readWord();
        const replacement = TOKEN_REPLACEMENTS.get(word);

        if (replacement) {
          this.overwrite(start, this.index, replacement.target);
          this.lastToken = replacement.token;
        } else {
          this.lastToken = { type: 'identifier', value: word };
        }

        continue;
      }

      if (isNumberStart(char)) {
        this.scanNumber();
        this.lastToken = { type: 'literal', value: 'number' };
        continue;
      }

      if (char === '=' && next === '>') {
        this.lastToken = { type: 'operator', value: '=>' };
        this.index += 2;
        continue;
      }

      if ((char === '&' && next === '&') || (char === '|' && next === '|')) {
        this.lastToken = { type: 'operator', value: char + next };
        this.index += 2;
        continue;
      }

      this.lastToken = { type: 'punctuation', value: char };
      this.index += 1;
    }

    this.lastToken = previousToken;
  }

  startsJsxElement() {
    if (this.code[this.index] !== '<' || !isJsxTagStart(this.code[this.index + 1])) {
      return false;
    }

    if (this.code[this.index + 1] === '/') {
      return false;
    }

    if (this.lastToken.type === 'start') {
      return true;
    }

    if (this.lastToken.type === 'keyword' && this.lastToken.value === 'return') {
      return true;
    }

    if (this.lastToken.type === 'operator' && ['=>', '&&', '||'].includes(this.lastToken.value)) {
      return true;
    }

    if (this.lastToken.type === 'punctuation') {
      return '([{=,:;!?'.includes(this.lastToken.value);
    }

    return false;
  }

  matchPhrase(start) {
    for (const phrase of PHRASE_REPLACEMENTS) {
      let cursor = start;
      let matched = true;

      for (let tokenIndex = 0; tokenIndex < phrase.source.length; tokenIndex += 1) {
        if (tokenIndex > 0) {
          const whitespaceStart = cursor;

          while (isWhitespace(this.code[cursor])) {
            cursor += 1;
          }

          if (cursor === whitespaceStart) {
            matched = false;
            break;
          }
        }

        const tokenStart = cursor;
        while (isWordChar(this.code[cursor])) {
          cursor += 1;
        }

        if (tokenStart === cursor || this.code.slice(tokenStart, cursor) !== phrase.source[tokenIndex]) {
          matched = false;
          break;
        }
      }

      if (matched && !isWordChar(this.code[cursor])) {
        return { start, end: cursor, target: phrase.target, token: phrase.token };
      }
    }

    return null;
  }

  readWord() {
    const start = this.index;

    while (isWordChar(this.code[this.index])) {
      this.index += 1;
    }

    return this.code.slice(start, this.index);
  }

  scanNumber() {
    while (NUMBER_RE.test(this.code[this.index] ?? '')) {
      this.index += 1;
    }
  }

  scanQuotedString(quote) {
    this.index += 1;

    while (this.index < this.code.length) {
      const char = this.code[this.index];

      if (char === '\\') {
        this.index += 2;
        continue;
      }

      this.index += 1;

      if (char === quote) {
        return;
      }
    }
  }

  scanTemplateString() {
    this.index += 1;

    while (this.index < this.code.length) {
      const char = this.code[this.index];
      const next = this.code[this.index + 1];

      if (char === '\\') {
        this.index += 2;
        continue;
      }

      if (char === '`') {
        this.index += 1;
        return;
      }

      if (char === '$' && next === '{') {
        this.index += 2;
        this.scanJS('}');

        if (this.code[this.index] === '}') {
          this.index += 1;
        }

        continue;
      }

      this.index += 1;
    }
  }

  scanLineComment() {
    this.index += 2;

    while (this.index < this.code.length && this.code[this.index] !== '\n') {
      this.index += 1;
    }
  }

  scanBlockComment() {
    this.index += 2;

    while (this.index < this.code.length) {
      if (this.code[this.index] === '*' && this.code[this.index + 1] === '/') {
        this.index += 2;
        return;
      }

      this.index += 1;
    }
  }

  scanJSXElement() {
    this.index += 1;

    if (this.code[this.index] === '>') {
      this.index += 1;
      this.scanJSXChildren(true);
      return;
    }

    while (this.index < this.code.length) {
      const char = this.code[this.index];
      const next = this.code[this.index + 1];

      if (char === '\'' || char === '"') {
        this.scanQuotedString(char);
        continue;
      }

      if (char === '{') {
        this.index += 1;
        this.scanJS('}');

        if (this.code[this.index] === '}') {
          this.index += 1;
        }

        continue;
      }

      if (char === '/' && next === '>') {
        this.index += 2;
        return;
      }

      if (char === '>') {
        this.index += 1;
        this.scanJSXChildren(false);
        return;
      }

      this.index += 1;
    }
  }

  scanJSXChildren(fragment) {
    while (this.index < this.code.length) {
      const char = this.code[this.index];
      const next = this.code[this.index + 1];

      if (char === '{') {
        this.index += 1;
        this.scanJS('}');

        if (this.code[this.index] === '}') {
          this.index += 1;
        }

        continue;
      }

      if (char === '<' && next === '/') {
        this.scanJSXClosingTag(fragment);
        return;
      }

      if (char === '<' && isJsxTagStart(next)) {
        this.scanJSXElement();
        continue;
      }

      this.index += 1;
    }
  }

  scanJSXClosingTag(fragment) {
    this.index += 2;

    if (fragment && this.code[this.index] === '>') {
      this.index += 1;
      return;
    }

    while (this.index < this.code.length && this.code[this.index] !== '>') {
      this.index += 1;
    }

    if (this.code[this.index] === '>') {
      this.index += 1;
    }
  }
}

export function transformYoptaReact(code, { filename = 'anonymous.yopta.jsx' } = {}) {
  const scanner = new YoptaScanner(code, filename);
  return scanner.transform();
}
