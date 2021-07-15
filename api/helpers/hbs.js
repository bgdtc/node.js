module.exports = {
    // On définit notre fonction
    limitArray: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },
    upcase: function (str) {
        if (!str) ''
        return str.toUpperCase()
    },
    lowercase: function (str) {
        if (!str) ''
        return str.toLowerCase()
    },
    ifCond: (v1, v2, options) => {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}