import { describe, expect, it } from "@jest/globals";

import { generate } from "./randomwords";

describe("random word generation", () => {
  describe.each([
    [2, 3],
    [5, 10],
    [4, 4],
  ])("generate between %i and &i random words", (min, max) => {
    it(`should generate between ${min} and ${min} words when called with min: ${min} and max: ${max}`, function () {
      const words = generate({ min, max });

      expect(words.length).toBeGreaterThanOrEqual(min);
      expect(words.length).toBeLessThanOrEqual(max);
    });
  });

  it("should generate one word with a minimum of 8 letters", function () {
    const minWordSize = 8;
    const words = generate({ min: 1, max: 1, minLength: minWordSize });

    expect(words.length === 1).toBe(true);
    words.forEach((word) => {
      expect(word.length >= minWordSize).toBe(true);
    });
  });

  it("should generate one word with a maximum of 5 letters", function () {
    const maxWordSize = 5;
    const words = generate({ min: 1, max: 1, maxLength: maxWordSize });

    expect(words.length === 1).toBe(true);
    words.forEach((word) => {
      expect(word.length <= maxWordSize).toBe(true);
    });
  });

  it("should generate one word with a length between 3 and 5 ", function () {
    const minLengthSize = 3;
    const maxLengthSize = 5;
    const words = generate({
      min: 1,
      max: 1,
      minLength: minLengthSize,
      maxLength: maxLengthSize,
    });

    expect(words.length === 1).toBe(true);
    words.forEach((word) => {
      expect(word.length >= minLengthSize && word.length <= maxLengthSize).toBe(
        true
      );
    });
  });

  it("should only generate words with a minimum of 8 letters", function () {
    const minWordSize = 8;
    const words = generate({ min: 1000, max: 1000, minLength: minWordSize });

    expect(words.length === 1000).toBe(true);
    words.forEach((word) => {
      expect(word.length >= minWordSize).toBe(true);
    });
  });

  it("should only generate words with a maximum of 5 letters", function () {
    const maxWordSize = 5;
    const words = generate({ min: 1000, max: 1000, maxLength: maxWordSize });

    expect(words.length === 1000).toBe(true);
    words.forEach((word) => {
      expect(word.length <= maxWordSize).toBe(true);
    });
  });

  it("should only generate words with a length between 3 and 5", function () {
    const minLengthSize = 3;
    const maxLengthSize = 5;
    const words = generate({
      min: 1000,
      max: 1000,
      minLength: minLengthSize,
      maxLength: maxLengthSize,
    });

    expect(words.length === 1000).toBe(true);
    words.forEach((word) => {
      expect(word.length >= minLengthSize && word.length <= maxLengthSize).toBe(
        true
      );
    });
  });

  it("should only generate words with a length equal to 5", function () {
    const wordSize = 5;
    const words = generate({
      min: 1000,
      max: 1000,
      minLength: wordSize,
      maxLength: wordSize,
    });

    expect(words.length === 1000).toBe(true);
    words.forEach((word) => {
      expect(word.length === wordSize).toBe(true);
    });
  });

  it("should generate 10 space separated strings of 5 words", function () {
    const words = generate({ min: 10, max: 10, wordsPerString: 5 });

    expect(words.length === 10).toBe(true);
    words.forEach((string) => {
      const stringSplitted = string.split(" ");
      expect(stringSplitted.length === 5).toBe(true);
    });
  });

  it("should generate 5 space separated strings of 3 words", function () {
    const separator = "-";
    const words = generate({ min: 2, max: 7, wordsPerString: 3, separator });

    expect(words.length >= 2 && words.length <= 7).toBe(true);
    words.forEach((string) => {
      const stringSplitted = string.split(separator);
      expect(typeof separator === "string").toBe(true);
      expect(stringSplitted.length === 3).toBe(true);
    });
  });

  it("should generate styled strings according to formatter", function () {
    const formatter = (word: String) => word.toUpperCase();
    expect(typeof formatter === "function").toBe(true);
    expect(typeof formatter("test") === "string").toBe(true);

    const words = generate({ min: 10, max: 10, formatter });

    expect(words.length === 10).toBe(true);
    words.forEach((word) => {
      expect(word === word.toUpperCase()).toBe(true);
    });
  });
});
