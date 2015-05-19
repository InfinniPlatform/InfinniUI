window.InfinniUI.DateUtils = (function () {

    var padInt = function (value, size) {
        var str = '' + value;
        var pad = '';
        if (str.length < size) {
            pad = Array(size - str.length + 1).join('0');
        }
        return pad + str;
    };

    /**
     * @description Возвращает строковое представление даты в формате YYYY-MM-DDTHH:mm:ss.sss+HH:MM
     * @param {Date} date
     * @returns {string}
     */
    var toISO8601 = function (date) {

        if (typeof date === 'undefined' || date === null) {
            return null;
        }

        if (date.constructor !== Date) {
            return null;
        }

        var datePart = [
            padInt(date.getFullYear(), 4),
            padInt(date.getMonth() + 1, 2),
            padInt(date.getDate(), 2)
        ].join('-');

        var timePart = [
            padInt(date.getHours(), 2),
            padInt(date.getMinutes(), 2),
            padInt(date.getSeconds(), 2)
        ].join(':');

        var sssPart = padInt(date.getMilliseconds(), 4);

        var tz = Math.abs(date.getTimezoneOffset());
        var tzOffsetPart = Math.sign(date.getTimezoneOffset()) > 0 ? '-' : '+';
        var tzPart = [
            padInt(Math.floor(tz / 60), 2),
            padInt(tz % 60, 2)
        ].join(':');

        return datePart + 'T' + timePart + '.' + sssPart + tzOffsetPart + tzPart;
    };

    return {
        toISO8601: toISO8601
    };
})();