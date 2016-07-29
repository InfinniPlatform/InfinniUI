'use strict';

var args = require('../../helpers/arguments.js')(process.argv.slice(2));
var teamcity = require('../../helpers/teamcityFormatter.js');

module.exports = function () {
    if(args.teamcity) {
        teamcity.call(this);
    }
};