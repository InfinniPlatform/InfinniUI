'use strict';

module.exports = function (argv) {
    var result = {};

    for (var i = 0, ii = argv.length; i < ii; i++) {
        var regex = argv[i].replace(/"/g, '').match(/^--(\w+):(\w+)$/);

        if(!regex || regex.length != 3) {
            continue;
        }

        var argument = regex[1];
        var value = regex[2];

        result[argument] = value;
    }

    return result;
};