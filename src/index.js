"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var main = function (text, query, options) {
    if (options === void 0) { options = {}; }
    return parse(text, query
        .replace(/\?|\*|\(|\||\[|\^|\.|\+|\)|\]|\$/g, "")
        .split(options.delimiter ? options.delimiter : " "), options);
};
var parse = function (text, queryList, options) {
    if (options === void 0) { options = {}; }
    if (text === "") {
        return [];
    }
    var query = queryList.shift();
    if (query === undefined || query === "") {
        return [{ item: text, highlight: false }];
    }
    var regExpFlag = ["g"];
    if (!options.caseSensitive) {
        regExpFlag.push("i");
    }
    var regExp = new RegExp(query, regExpFlag.join(""));
    var matches = Array.from(text.matchAll(regExp), function (match) { return match[0]; });
    return text
        .split(regExp)
        .map(function (item, index, itemArray) {
        var result = parse(item, __spreadArrays(queryList), options);
        if (index === itemArray.length - 1) {
            return result;
        }
        result.push({ item: matches[index], highlight: true });
        return result;
    })
        .reduce(function (accumulate, current) {
        accumulate.push.apply(accumulate, current);
        return accumulate;
    }, []);
};
exports["default"] = main;
