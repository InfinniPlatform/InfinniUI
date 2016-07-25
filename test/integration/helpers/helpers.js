'use strict';

module.exports = {
    parseElement: function (element) {
        var expr = element.match(/([а-я]*[\s\S]*)\[(\d+)\]/i);

        if (!expr) {
            return {
                name: element,
                index: 0
            };
        }

        return {
            name: expr[1].trim(),
            index: parseInt(expr[2])
        }
    },

    parseDate: function (date) {
        var expr = date.match(/^\d{2}.\d{2}.\d{4}$/);

        if (expr) {
            return date;
        }

        expr = date.match(/Сегодня/);

        if (expr) {
            var currentDate = Date.now();
            expr = date.match(/([\+,\-])(\d+)/);

            if (expr) {
                var sign = expr[1];
                var iterator = expr[2];
                iterator = parseInt(iterator) * 24 * 60 * 60 * 1000;
                currentDate = currentDate + (sign == '+' ? iterator : iterator * -1);
            }

            date = new Date(currentDate)
                .toLocaleDateString()
                .split('-');

            if(date.length == 3) {
                if(date[0].length == 4) {
                    date.reverse();
                }
                date = date.join('.');
            } else {
                date = date[0];
            }

            return date;
        }

        throw new Error('Некорректная дата');
    }
};