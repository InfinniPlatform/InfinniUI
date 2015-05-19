/**
 * @description Формат отображения даты/времени.
 * @param format
 * @class DateTimeFormat
 * @mixes formatMixin
 */
function DateTimeFormat(format){

    this.setFormat(format);
}

_.extend(DateTimeFormat.prototype, {

    /**
     * @description Строка форматирования даты/времени по умолчанию
     * @memberOf DateTimeFormat.prototype
     */
    defaultFormat: 'G',

    /**
     * @description Форматирует дату
     * @memberOf DateTimeFormat.prototype
     * @param {Date} originalDate
     * @param {Culture} [culture]
     * @param {String} [format]
     * @returns {String}
     */
    formatValue: function(originalDate, culture, format){

        if (typeof originalDate === 'undefined' || originalDate === null) {
            return '';
        }
        var self = this;

        culture = culture || new Culture(InfinniUI.config.lang);
        
        var date = (originalDate instanceof Date)? originalDate : timezoneDate(originalDate);

        format = format||this.getFormat();

        //if(format.length == 1){
        if(typeof InfinniUI.localizations[culture.name].patternDateFormats[format] !== 'undefined'){
            format = InfinniUI.localizations[culture.name].patternDateFormats[format];
        }

        return format.replace(this.rg, function(s){
            if(s[0] == '"' || s[0] == "'"){
                var len = s.length;
                return s.substring(1, len - 1);
            }else{
                return self.rules[s](date, culture);
            }
        });
    },


    rg: new RegExp(
        '"[\\s\\S]*"|' + "'[\\s\\S]*'"+

        '|yyyy|yy|%y|y' +
        '|MMMM|MMM|MM|%M|M' +
        '|dddd|ddd|dd|%d|d' +
        '|HH|%H|H|hh|%h|h' +
        '|mm|%m|m' +
        '|ss|%s|s' +
        '|tt|%t|t' +
        '|zzz|zz|%z|z' +
        '|:|/',

        'g'),

    rules: {
        'yyyy': function(date){
            return date.getFullYear().toString();
        },
        'yy': function(date){
            var year = date.getFullYear().toString();
            return year.substring(2);
        },
        '%y': function(date){
            var year = date.getFullYear().toString();
            year = year.substring(2);
            year = parseInt(year);
            return year.toString();
        },
        'y': function(date){
            var year = date.getFullYear().toString();
            year = year.substring(2);
            year = parseInt(year);
            return year.toString();
        },

        'MMMM': function(date, culture){
            var monthIndex = date.getMonth(),
                month = culture.dateTimeFormatInfo.monthNames[monthIndex];
            return month;
        },
        'MMM': function(date, culture){
            var monthIndex = date.getMonth(),
                month = culture.dateTimeFormatInfo.abbreviatedMonthNames[monthIndex];
            return month;
        },
        'MM': function(date){
            var monthIndex = date.getMonth() + 1;
            if(monthIndex < 10){
                return '0' + monthIndex.toString();
            }else{
                return monthIndex.toString();
            }
        },
        '%M': function(date){
            var monthIndex = date.getMonth() + 1;
            return monthIndex.toString();
        },
        'M': function(date){
            var monthIndex = date.getMonth() + 1;
            return monthIndex.toString();
        },

        'dddd': function(date, culture){
            var dayIndex = date.getDay(),
                day;

            dayIndex = (dayIndex == 0) ? 6 : dayIndex - 1;
            day = culture.dateTimeFormatInfo.dayNames[dayIndex];
            return day;
        },
        'ddd': function(date, culture){
            var dayIndex = date.getDay(),
                day;

            dayIndex = (dayIndex == 0) ? 6 : dayIndex - 1;
            day = culture.dateTimeFormatInfo.abbreviatedDayNames[dayIndex];
            return day;
        },
        'dd': function(date){
            var dayIndex = date.getDate();

            if(dayIndex < 10){
                return '0' + dayIndex.toString();
            }else{
                return dayIndex.toString();
            }
        },
        '%d': function(date){
            var dayIndex = date.getDate();
            return dayIndex.toString();
        },
        'd': function(date){
            var dayIndex = date.getDate();
            return dayIndex.toString();
        },

        'HH': function(date){
            var hoursIndex = date.getHours();

            if(hoursIndex < 10){
                return '0' + hoursIndex.toString();
            }else{
                return hoursIndex.toString();
            }
        },
        '%H': function(date){
            var hoursIndex = date.getHours();
            return hoursIndex.toString();
        },
        'H': function(date){
            var hoursIndex = date.getHours();
            return hoursIndex.toString();
        },
        'hh': function(date){
            var hoursIndex = date.getHours();

            if(hoursIndex > 12){
                hoursIndex -= 12;
            }

            if(hoursIndex < 10){
                return '0' + hoursIndex.toString();
            }else{
                return hoursIndex.toString();
            }
        },
        '%h': function(date){
            var hoursIndex = date.getHours();
            if(hoursIndex > 12){
                hoursIndex -= 12;
            }
            return hoursIndex.toString();
        },
        'h': function(date){
            var hoursIndex = date.getHours();
            if(hoursIndex > 12){
                hoursIndex -= 12;
            }
            return hoursIndex.toString();
        },

        'mm': function(date){
            var minuteIndex = date.getMinutes();

            if(minuteIndex < 10){
                return '0' + minuteIndex.toString();
            }else{
                return minuteIndex.toString();
            }
        },
        '%m': function(date){
            var minuteIndex = date.getMinutes();
            return minuteIndex.toString();
        },
        'm': function(date){
            var minuteIndex = date.getMinutes();
            return minuteIndex.toString();
        },

        'ss': function(date){
            var secondsIndex = date.getSeconds();

            if(secondsIndex < 10){
                return '0' + secondsIndex.toString();
            }else{
                return secondsIndex.toString();
            }
        },
        '%s': function(date){
            var secondsIndex = date.getSeconds();
            return secondsIndex.toString();
        },
        's': function(date){
            var secondsIndex = date.getSeconds();
            return secondsIndex.toString();
        },

        'tt': function(date, culture){
            var hoursIndex = date.getHours();

            if(hoursIndex < 12){
                return culture.dateTimeFormatInfo.amDesignator;
            }else{
                return culture.dateTimeFormatInfo.pmDesignator;
            }
        },
        '%t': function(date, culture){
            var hoursIndex = date.getHours();

            if(hoursIndex < 12){
                return culture.dateTimeFormatInfo.amDesignator.substr(0, 1);
            }else{
                return culture.dateTimeFormatInfo.pmDesignator.substr(0, 1);
            }
        },
        't': function(date, culture){
            var hoursIndex = date.getHours();

            if(hoursIndex < 12){
                return culture.dateTimeFormatInfo.amDesignator.substr(0, 1);
            }else{
                return culture.dateTimeFormatInfo.pmDesignator.substr(0, 1);
            }
        },

        'zzz': function(date){
            var offset = -date.getTimezoneOffset()/60,
                minutes,
                sign;

            minutes = (offset - Math.floor(offset)) * 100;
            offset = Math.floor(offset);

            if(offset < 0){
                sign = '-';
                offset = -offset;
            }else{
                sign = '+';
            }

            if(minutes < 10){
                minutes = '0' + minutes.toString();
            }else{
                minutes = minutes.toString();
            }

            if(offset < 10){
                return sign + '0' + offset.toString() + ':' + minutes;
            }else{
                return sign + offset.toString() + ':' + minutes;
            }
        },
        'zz': function(date){
            var offset = -date.getTimezoneOffset()/60,
                sign;

            offset = Math.floor(offset);

            if(offset < 0){
                sign = '-';
                offset = -offset;
            }else{
                sign = '+';
            }

            if(offset < 10){
                return sign + '0' + offset.toString();
            }else{
                return sign + offset.toString();
            }
        },
        'z': function(date, culture){
            var offset = -date.getTimezoneOffset()/60,
                sign;

            offset = Math.floor(offset);

            if(offset < 0){
                sign = '-';
                offset = -offset;
            }else{
                sign = '+';
            }

            return sign + offset.toString();
        },
        '%z': function(date, culture){
            var offset = -date.getTimezoneOffset()/60,
                sign;

            offset = Math.floor(offset);

            if(offset < 0){
                sign = '-';
                offset = -offset;
            }else{
                sign = '+';
            }

            return sign + offset.toString();
        },

        ':': function(date, culture){
            return culture.dateTimeFormatInfo.timeSeparator;
        },
        '/': function(date, culture){
            return culture.dateTimeFormatInfo.dateSeparator;
        }
    }
}, formatMixin);