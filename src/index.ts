type Result = {
  item: string;
  highlight: Boolean;
};

type mainProps = (
  text: string,
  query: string,
  options?: { delimiter?: string; caseSensitive?: boolean }
) => Result[];
type parseProps = (
  text: string,
  queryList: string[],
  options?: { delimiter?: string; caseSensitive?: boolean }
) => Result[];

const main: mainProps = (text, query, options = {}) =>
  parse(
    text,
    query
      .replace(/\?|\*|\(|\||\[|\^|\.|\+|\)|\]|\$/g, "")
      .split(options.delimiter ?? " "),
    options
  );

const parse: parseProps = (text, queryList, options = {}) => {
  if (text === "") {
    return [];
  }

  const query = queryList.shift();
  if (query === undefined || query === "") {
    return [{ item: text, highlight: false }];
  }

  const regExpFlag = [];

  if (!options?.caseSensitive) {
    regExpFlag.push("i");
  }

  const regExp = new RegExp(query, regExpFlag.join("g"));
  const matches = Array.from(text.matchAll(regExp), (match) => match[0]);
  return text
    .split(regExp)
    .map((item, index, itemArray) => {
      const result = parse(item, [...queryList], options);
      if (index === itemArray.length - 1) {
        return result;
      }

      result.push({ item: matches[index], highlight: true });
      return result;
    })
    .reduce((accumulate, current) => {
      accumulate.push(...current);
      return accumulate;
    }, []);
};

export default main;
