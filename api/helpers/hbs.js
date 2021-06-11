module.exports = {
    // On définit notre fonction
    limitArray: function (arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },
    upcase: function (str) {
        return str.toUpperCase()
    },
    lowercase: function (str) {
        return str.toLowerCase()
    }
}