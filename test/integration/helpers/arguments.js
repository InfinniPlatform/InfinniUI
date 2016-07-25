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
            var argument = argv[i];
            var value = argv[i + 1];

            if (this.contains(argument) && this.args[argument].indexOf(value) != -1) {
                result[argument.replace(/-/g, '')] = value;
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