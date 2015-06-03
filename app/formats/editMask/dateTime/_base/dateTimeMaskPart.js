var DateTimeMaskPartStrategy = (function () {
    var regExpDay = /^(?:3[0-1]|[012]?[0-9]?)$/;
    var regExpMonth = /^(?:1[0-2]|0?[1-9]?)$/;
    var regExpFullYear = /^\d{1,4}$/;
    var regExpYear = /^\d{1,2}$/;
    var regExpHour24 = /^(?:[12][0-3]|[01]?[1-9]?)$/;
    var regExp60 = /^[0-5]?[0-9]$/;

    return {
        'd': {
            init: function () {
                this.width = 2;
                this.min = 1;
                this.max = 31;
            },
            match: function (value) {
                return regExpDay.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setDate(part);
                return value;
            }
        },
        'dd': {
            init: function () {
                this.width = 2;
                this.min = 1;
                this.max = 31;
            },
            match: function (value) {
                return regExpDay.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setDate(part);
                return value;
            }
        },
        'M': {
            init: function () {
                this.width = 2;
                this.min = 1;
                this.max = 12;
            },
            match: function (value) {
                return regExpMonth.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setMonth(parseInt(part, 10) - 1);
                return value;
            }
        },
        'MM': {
            init: function () {
                this.width = 2;
                this.min = 1;
                this.max = 12;
            },
            match: function (value) {
                return regExpMonth.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setMonth(parseInt(part, 10) - 1);
                return value;
            }
        },
        'y': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 99;
            },
            match: function (value) {
                return regExpYear.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                var year = parseInt(part, 10);
                if (!isNaN(year)) {
                    year = '0000' + year;
                    var date = new Date();
                    value.setFullYear(date.getFullYear().toString().substr(0, 2) + year.slice(-2));
                }
                return value;
            }
        },
        'yy': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 99;
            },
            match: function (value) {
                return regExpYear.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                var year = parseInt(part, 10);
                if (!isNaN(year)) {
                    year = '0000' + year;
                    var date = new Date();
                    value.setFullYear(date.getFullYear().toString().substr(0, 2) + year.slice(-2));
                }
                return value;
            }
        },
        'yyyy': {
            init: function () {
                this.width = 4;
                this.min = 0;
                this.max = 9999;
            },
            match: function (value) {
                return regExpFullYear.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setFullYear(part);
                return value;
            }
        },
        'H': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 23;
            },
            match: function (value) {
                return regExpHour24.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setHours(part);
                return value;
            }
        },
        'HH': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 23;
            },
            match: function (value) {
                return regExpHour24.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setHours(part);
                return value;
            }
        },
        'm': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 59;
            },
            match: function (value) {
                return regExp60.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setMinutes(part);
                return value;
            }
        },
        'mm': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 59;
            },
            match: function (value) {
                return regExp60.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setMinutes(part);
                return value;
            }
        },
        's': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 59;
            },
            match: function (value) {
                return regExp60.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setSeconds(part);
                return value;
            }
        },
        'ss': {
            init: function () {
                this.width = 2;
                this.min = 0;
                this.max = 59;
            },
            match: function (value) {
                return regExp60.test(value);
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevIntValue(value);
            },
            next: function (value) {
                return this.getNextIntValue(value);
            },
            format: function (value) {
                return this.padNumber(value);
            },
            apply: function (value, part) {
                value.setSeconds(part);
                return value;
            }
        },
        'MMM': {
            init: function () {
                this.min = 2;
                this.max = 12;
                this.width = 2;
            },
            match: function () {
                return false;   // Не даем ничего вводить
            },
            validator: function (value) {
                return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevMonthValue('MMM', value);
            },
            next: function (value) {
                return this.getNextMonthValue('MMM', value);
            },
            apply: function (value, part) {
                var index = this.getIndexMonthValue('MMM', part);
                if (index !== -1) {
                    value.setMonth(index);
                }

                return value;
            }
        },
        'MMMM': {
            init: function () {
                this.min = 2;
                this.max = 12;
                this.width = 2;
            },
            match: function () {
                return false;   // Не даем ничего вводить
            },
            validator: function (value) {
                var list = this.getListForMask('MMMM');
                return list.indexOf(value) > -1;
                //return this.rangeValidator(value);
            },
            prev: function (value) {
                return this.getPrevMonthValue('MMMM', value);
            },
            next: function (value) {
                return this.getNextMonthValue('MMMM', value);
            },
            apply: function (value, part) {
                var index = this.getIndexMonthValue('MMMM', part);
                if (index !== -1) {
                    value.setMonth(index);
                }
                return value;
            }
        }

    }

})();

var DateTimeMaskPart = function (mask) {
    _.extend(this, DateTimeMaskPartStrategy[mask]);
    this.init();
};

_.extend(DateTimeMaskPart.prototype, {

    init: function () {

    },

    match: function (value) {
        return true;
    },

    validator: function (value) {
        return true;
    },

    fulfilled: function (value) {
        return this.match(value) && this.validator(value);
    },

    prev: function (value) {
        return value;
    },

    next: function (value) {
        return value;
    },

    format: function (value) {
        return value;
    },

    applyPart: function(value, part) {
        return value;
    },

    padNumber: function (value) {
        var width = (typeof this.width !== 'undefined') ? this.width : null;

        value = parseInt(value, 10);
        var text, ln;
        text = (isNaN(value)) ? text = '': value.toString();
        ln = text.length;
        if (width !== null && ln < width) {
            text = Array(width - ln +1).join('0') + text;
        }

        return text;
    },

    getNextIntValue: function (value) {
        var minValue = (typeof this.min !== 'undefined') ? this.min : null,
            maxValue = (typeof this.max !== 'undefined') ? this.max : null,
            step = (typeof this.step !== 'undefined') ? this.step : 1;

        value = parseInt(value, 10);
        if (isNaN(value)) {
            value = (minValue === null) ? 0 : minValue;
        } else {
            value = value + step;
            if (maxValue !== null && value > maxValue) {
                value = maxValue;
            }
        }
        return value;
    },

    getPrevIntValue: function (value) {
        var minValue = (typeof this.min !== 'undefined') ? this.min : null,
            step = (typeof this.step !== 'undefined') ? this.step : 1;

        value = parseInt(value, 10);
        if (isNaN(value)) {
            value = (minValue === null) ? 0 : minValue;
        } else {
            value = value - step;
            if (minValue !== null && value < minValue) {
                value = minValue;
            }
        }
        return value;
    },

    getListForMask: function (mask) {
        //@TODO Получать культуру из контекста!
        var culture = new Culture(InfinniUI.config.lang);
        var formatInfo = culture.dateTimeFormatInfo;

        var list;

        switch (mask) {
            case 'MMMM':
                list = formatInfo.monthNames;
                break;
            case 'MMM':
                list = formatInfo.abbreviatedMonthNames;
                break;
            case 'dddd':
                list = formatInfo.dayNames;
                break;
            case 'ddd':
                list = formatInfo.abbreviatedDayNames;
                break;
        }

        return list;
    },

    getNextListValueForMask: function (mask, value) {
        var list = this.getListForMask(mask);
        var index = list.indexOf(value);
        if (typeof list === 'undefined') {
            return value;
        } else if (index === -1){
            return list.length ? list[0]: '';
        }
        index = index + 1;
        return (index < list.length) ? list[index] : value;
    },

    getPrevListValueForMask: function (mask, value) {
        var list = this.getListForMask(mask);
        var index = list.indexOf(value);
        if (typeof list === 'undefined') {
            return value;
        } else if (index === -1){
            return list.length ? list[list.length - 1]: '';
        }
        index = index - 1;
        return (index >= 0) ? list[index] : value;
    },

    getIndexListValueForMask: function (mask, value) {
        var list = this.getListForMask(mask);

        if (typeof list === 'undefined') {
            return -1;
        }

        return list.indexOf(value);
    },

    getNextMonthValue: function (mask, value) {
        return this.getNextListValueForMask(mask, value);
    },

    getPrevMonthValue: function (mask, value) {
        return this.getPrevListValueForMask(mask, value);
    },

    getIndexMonthValue: function (mask, value) {
        return this.getIndexListValueForMask(mask, value);
    },

    rangeValidator: function (value) {
        value = parseInt(value, 10);
        return  !(isNaN(value) || value < this.min || value > this.max);
    }

});
