'use strict';

module.exports = {
    parseElement: function (element) {
        var expr = element.match(/([а-я]*[\s\S]*)\[(\d+)\]/i);

        if(!expr) {
            return {
                name: element,
                index: 0
            };
        }

        return {
            name: expr[1],
            index: parseInt(expr[2])
        }
    }
};