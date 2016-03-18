window.InfinniUI.DateUtils = (function () {



    return {
        toISO8601: toISO8601,
        changeTimezoneOffset: changeTimezoneOffset,
        restoreTimezoneOffset: restoreTimezoneOffset
    };

    function changeTimezoneOffset(date, timezoneOffset) {
        var newDate = date;

        if (typeof timezoneOffset !== 'undefined' && date instanceof Date) {
            var currentOffset = date.getTimezoneOffset();

            if (timezoneOffset !== currentOffset) {
                newDate = new Date(date.getTime() + (currentOffset - timezoneOffset) * 60 * 1000);
                console.log('timezone changed  [%d to %d] ["%s" to "%s"] [%s to %s] ', currentOffset, timezoneOffset, date.toUTCString(), newDate.toUTCString(), date.toString(), newDate.toString() );
            }
        }

        return newDate;
    }

    function restoreTimezoneOffset(date, timezoneOffset) {
        var newDate = date;

        if (typeof timezoneOffset !== 'undefined' && date instanceof Date) {
            var currentOffset = date.getTimezoneOffset();

            if (timezoneOffset !== currentOffset) {
                newDate = new Date(date.getTime() - (currentOffset - timezoneOffset) * 60 * 1000);
                console.log('timezone restored  [%d to %d] ["%s" to "%s"] [%s to %s]', timezoneOffset, currentOffset, date.toUTCString(), newDate.toUTCString(), date.toString(), newDate.toString() );
            }
        }

        return newDate;
    }

    /**
     * @description Возвращает строковое представление даты в формате YYYY-MM-DDTHH:mm:ss.sss+HH:MM
     * @param {Date} date
     * @param {Object} options
     * @returns {string}
     */
    function toISO8601(date, options) {

        var config = options || {};

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

        var sssPart = padInt(date.getMilliseconds(), 3) + '0';// '000' + '0'

        if (!Math.sign) { //fix for devices not support ES6
            Math.sign = function (x) {
                return x ? x < 0 ? -1 : 1 : 0;
            };
        }

        var tz = Math.abs(date.getTimezoneOffset());
        var tzOffsetPart = Math.sign(date.getTimezoneOffset()) > 0 ? '-' : '+';
        var tzPart = [
            padInt(Math.floor(tz / 60), 2),
            padInt(tz % 60, 2)
        ].join(':');

        return datePart + 'T' + timePart + '.' + sssPart + tzOffsetPart + tzPart;
    }

    function padInt(value, size) {
        var str = '' + value;
        var pad = '';
        if (str.length < size) {
            pad = Array(size - str.length + 1).join('0');
        }
        return pad + str;
    }

})();