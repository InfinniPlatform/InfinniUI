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
     * @param {Object} options
     * @param {boolean} [options.resetTime = false]
     * @returns {string}
     */
    var toISO8601 = function (date, options) {

        var config = options || {};

        if (typeof date === 'undefined' || date === null) {
            return null;
        }

        if (date.constructor !== Date) {
            return null;
        }

        if (config.resetTime) {
            date.setHours(0, 0, 0, 0);
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
        
        var sssPart = padInt(date.getMilliseconds(), 3) + '0';// '000' + '0'

        if(!Math.sign) { //fix for devices not support ES6
            Math.sign = function (x) {
                return x?x<0?-1:1:0;
            };
        }

        var tz = Math.abs(date.getTimezoneOffset());
        var tzOffsetPart = Math.sign(date.getTimezoneOffset()) > 0 ? '-' : '+';
        var tzPart = [
            padInt(Math.floor(tz / 60), 2),
            padInt(tz % 60, 2)
        ].join(':');

        return datePart + 'T' + timePart + '.' + sssPart + tzOffsetPart + tzPart;
    };

    return {
        dateToTimestamp: dateToTimestamp,
        toISO8601: toISO8601
    };

    /**
     * @description Возвращает заданную дату как количество миллисекунд, прошедших с 01-01-1970T00:00 по UTC
     * @param {String|Date} date ISO8601
     */
    function dateToTimestamp(date) {
        var time, _date, datetime;

        if (date && date.constructor === String) {
            _date = new Date(date);
        } else if (date && date.constructor === Date) {
            _date = date;
        }

        if (_date) {
            _date = new Date(Date.UTC(_date.getFullYear(), _date.getMonth(), _date.getDate()));
            datetime = _date.getTime();
        }

        return datetime;
    }
})();