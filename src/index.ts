type Result = {
  item: string;
  highlight: Boolean;
};

type mainProps = (text: string, query: string, delimiter?: string) => Result[];
type parseProps = (text: string, queryList: string[]) => Result[];

const main: mainProps = (text, query, delimiter = " ") =>
  parse(text, query.split(delimiter));

const parse: parseProps = (text, queryList) => {
  if (text === "") {
    return [];
  }

  const query = queryList.shift();
  if (query === undefined || query === "") {
    return [{ item: text, highlight: false }];
  }

  const regExp = new RegExp(query, "ig");
  const matches = Array.from(text.matchAll(regExp), (match) => match[0]);
  return text
    .split(regExp)
    .map((item, index, itemArray) => {
      const result = parse(item, [...queryList]);
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
