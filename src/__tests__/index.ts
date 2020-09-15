import matchHighLight from "../index";

describe("MatchHighLight testing", () => {
  it("Match one word ", () => {
    const text = "asdret2rgrg";
    const query = "re";
    expect(matchHighLight(text, query)).toEqual([
      { item: "asd", highlight: false },
      { item: "re", highlight: true },
      { item: "t2rgrg", highlight: false },
    ]);
  });

  it("The last word is matched", () => {
    const text = "HelloIamTestCase";
    const query = "lo se";
    expect(matchHighLight(text, query)).toEqual([
      { item: "Hel", highlight: false },
      { item: "lo", highlight: true },
      { item: "IamTestCa", highlight: false },
      { item: "se", highlight: true },
    ]);
  });

  it("The delimiter is comma", () => {
    const text = "Hello world, I am match highligh words";
    const query = "hello,li";
    expect(matchHighLight(text, query, ",")).toEqual([
      { item: "Hello", highlight: true },
      { item: " world, I am match high", highlight: false },
      { item: "li", highlight: true },
      { item: "gh words", highlight: false },
    ]);
  });
});
