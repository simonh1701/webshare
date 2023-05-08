import wordList from "./wordlist";

declare type GenerateOptions = {
  min: number;
  max: number;
  minLength?: number;
  maxLength?: number;
  wordsPerString?: number;
  separator?: string;
  formatter?: (word: String, index: number) => String;
};

declare type JoinedWordsOptions = GenerateOptions & { join: String };

const shortestWordSize = wordList.reduce(
  (shortestWord: String, currentWord: String) =>
    currentWord.length < shortestWord.length ? currentWord : shortestWord
).length;

const longestWordSize = wordList.reduce(
  (longestWord: String, currentWord: String) =>
    currentWord.length > longestWord.length ? currentWord : longestWord
).length;

export function generate(options: GenerateOptions | JoinedWordsOptions) {
  const { minLength, maxLength, ...rest } = options || {};

  function word(): String {
    let min =
      typeof minLength !== "number"
        ? shortestWordSize
        : limitWordSize(minLength);

    const max =
      typeof maxLength !== "number"
        ? longestWordSize
        : limitWordSize(maxLength);

    if (min > max) min = max;

    let rightSize = false;
    let wordUsed;

    do {
      wordUsed = generateRandomWord();
      rightSize = wordUsed.length <= max && wordUsed.length >= min;
    } while (!rightSize);

    return wordUsed;
  }

  function generateRandomWord() {
    return wordList[randInt(wordList.length)];
  }

  function limitWordSize(wordSize: number) {
    if (wordSize < shortestWordSize) wordSize = shortestWordSize;
    if (wordSize > longestWordSize) wordSize = longestWordSize;
    return wordSize;
  }

  function randInt(lessThan: number) {
    return Math.floor(Math.random() * lessThan);
  }

  options.wordsPerString = options.wordsPerString || 1;

  const defaultFormatter = (word: String) => word;

  options.formatter = options.formatter || defaultFormatter;

  options.separator = options.separator || " ";

  const total = options.min + randInt(options.max + 1 - options.min);
  let results = [];
  let token = "";
  let relativeIndex = 0;

  for (let i = 0; i < total * options.wordsPerString; i++) {
    if (relativeIndex === options.wordsPerString - 1) {
      token += options.formatter(word(), relativeIndex);
    } else {
      token += options
        .formatter(word(), relativeIndex)
        .concat(options.separator);
    }

    relativeIndex++;

    if ((i + 1) % options.wordsPerString === 0) {
      results.push(token);
      token = "";
      relativeIndex = 0;
    }
  }

  return results;
}
