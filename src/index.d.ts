declare type Result = {
    item: string;
    highlight: Boolean;
};
declare type mainProps = (text: string, query: string, options?: {
    delimiter?: string;
    caseSensitive?: boolean;
}) => Result[];
declare const main: mainProps;
export default main;
