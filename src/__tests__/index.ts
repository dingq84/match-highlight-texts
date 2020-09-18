import { matcher } from "../index";

describe("matcher testing", () => {
  it("Match one word ", () => {
    const text = "asdret2rgrg";
    const query = "re";
    expect(matcher(text, query)).toEqual([
      { item: "asd", highlight: false },
      { item: "re", highlight: true },
      { item: "t2rgrg", highlight: false },
    ]);
  });

  it("The last word is matched", () => {
    const text = "HelloIamTestCase";
    const query = "lo se";
    expect(matcher(text, query)).toEqual([
      { item: "Hel", highlight: false },
      { item: "lo", highlight: true },
      { item: "IamTestCa", highlight: false },
      { item: "se", highlight: true },
    ]);
  });

  it("The delimiter is comma", () => {
    const text = "Hello world, I am match highligh words";
    const query = "hello,li";
    expect(matcher(text, query, { delimiter: "," })).toEqual([
      { item: "Hello", highlight: true },
      { item: " world, I am match high", highlight: false },
      { item: "li", highlight: true },
      { item: "gh words", highlight: false },
    ]);
  });

  it("No any word is matched", () => {
    const text = "Hello world, I am match highligh words";
    const query = "you";
    expect(matcher(text, query)).toEqual([
      { item: "Hello world, I am match highligh words", highlight: false },
    ]);
  });

  it("There are special characters in query, it will be removed", () => {
    const text = "Hello world, I am match highligh words";
    const query = "?*(world(";
    expect(matcher(text, query)).toEqual([
      { item: "Hello ", highlight: false },
      { item: "world", highlight: true },
      { item: ", I am match highligh words", highlight: false },
    ]);
  });

  it("If the caseSensitive is true, it will exactly match the word", () => {
    const text = "Hello world, I am match highligh words";
    const query = "HELLO WORLD";
    expect(matcher(text, query, { caseSensitive: true })).toEqual([
      { item: "Hello world, I am match highligh words", highlight: false },
    ]);
  });

  it("The text is empty", () => {
    expect(matcher("", "something")).toEqual([]);
  });

  it("The query is empty", () => {
    expect(matcher("something", "")).toEqual([
      { item: "something", highlight: false },
    ]);
  });
});
