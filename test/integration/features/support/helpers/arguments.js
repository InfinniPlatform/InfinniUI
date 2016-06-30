'use strict';

module.exports = {
    args: {
        '--platform': [
            'chrome',
            'firefox',
            'phantomjs'
        ]
    },

    parse: function (argv) {
        var result = {};

        for (var i = 0, ii = argv.length; i < ii; i++) {
            if (this.contains(argv[i]) && this.args[argv[i]].indexOf(argv[i + 1]) != -1) {
                result[argv[i].replace(/-/g, '')] = argv[i + 1];
            }
        }

        return result;
    },

    contains: function (value) {
        for (var k in this.args) {
            if (k == value) {
                return true;
            }
        }

        return false;
    }
};