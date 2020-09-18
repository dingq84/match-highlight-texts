export type Result = {
  item: string;
  highlight: Boolean;
};

export type mainProps = (
  text: string,
  query: string,
  options?: { delimiter?: string; caseSensitive?: boolean }
) => Result[];

export type parseProps = (
  text: string,
  queryList: string[],
  options?: { delimiter?: string; caseSensitive?: boolean }
) => Result[];
