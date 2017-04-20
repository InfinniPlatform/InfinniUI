window.InfinniUI.DateUtils = ( function() {
    init();

    var _defaultTimeZone;

    return {
        toISO8601: toISO8601,
        dateToTimestamp: dateToTimestamp,
        dateToTimestampTime: dateToTimestampTime,
        changeTimezoneOffset: changeTimezoneOffset,
        restoreTimezoneOffset: restoreTimezoneOffset,
        toDate: toDate,
        createDate: createDate,
        parseTimeISO8601toDate: parseTimeISO8601toDate,
        parseISO8601toDate: parseISO8601toDate,
        checkRangeDate: checkRangeDate,
        getNearestDate: getNearestDate,
        cloneDate: cloneDate,
        getDefaultTimeZone: getDefaultTimezone
    };

    function parseISO8601toDate( value ) {
        if( value === null || typeof value === 'undefined' ) {
            return value;
        }
        return moment( value ).toDate();
    }

    function cloneDate( date ) {
        if( date instanceof Date ) {
            return new Date( date.getTime() );
        }
        return date;
    }

    /**
     * @description Возвращает ближаешее к исходному значению из диапазона
     * @param date
     * @param min
     * @param max
     * @returns {Date}
     */
    function getNearestDate( date, min, max ) {
        var nearest;
        var mMin = moment( min || null );
        var mMax = moment( max || null );
        var mVal = moment( date );


        if( mMin.isValid() && mVal.isBefore( mMin ) ) {
            nearest = mMin.toDate();
        } else if( mMax.isValid() && mVal.isAfter( mMax ) ) {
            nearest = mMax.toDate();
        } else {
            nearest = date;
        }

        return nearest;
    }

    /**
     * @description Проверяет, что дата находится в заданном диапазоне
     * @param date
     * @param minDate
     * @param maxDate
     * @param {String} precision
     * @returns {boolean}
     */
    function checkRangeDate( date, minDate, maxDate, precision ) {
        var success = true;
        var mMin = moment( minDate || null );
        var mMax = moment( maxDate || null );
        var mVal = moment( date );


        if( mMin.isValid() && mMax.isValid() ) {
            success = mVal.isSameOrBefore( mMax, precision ) && mVal.isSameOrAfter( mMin, precision );
        } else if( mMin.isValid() ) {
            success = mVal.isSameOrAfter( mMin, precision );
        } else if( mMax.isValid() ) {
            success = mVal.isSameOrBefore( mMax, precision );
        }

        return success;
    }

    function parseTimeISO8601toDate( value ) {
        var date;
        var formats = [ 'HH:mm', 'HH:mm:ss', 'HH:mm:ss.SSS', 'HHmm', 'HHmmss', 'HHmmss.SSS' ];
        var m = moment( value, formats );

        if( m.isValid() ) {
            date = new Date( 0 );
            date.setHours( m.hours(), m.minute(), m.second(), m.millisecond() );
        }

        return date;
    }

    function toDate( value ) {
        var m = moment( value );
        var date = null;

        if( m.isValid() ) {
            date = m.toDate();
        }

        return date;
    }

    function changeTimezoneOffset( date, timezoneOffset ) {
        var newDate = date;

        if( typeof timezoneOffset !== 'undefined' && date instanceof Date ) {
            var currentOffset = date.getTimezoneOffset();

            if( timezoneOffset !== currentOffset ) {
                newDate = new Date( date.getTime() + ( currentOffset - timezoneOffset ) * 60 * 1000 );
            }
        }

        return newDate;
    }

    function restoreTimezoneOffset( date, timezoneOffset ) {
        var newDate = date;

        if( typeof timezoneOffset !== 'undefined' && date instanceof Date ) {
            var currentOffset = date.getTimezoneOffset();

            if( timezoneOffset !== currentOffset ) {
                newDate = new Date( date.getTime() - ( currentOffset - timezoneOffset ) * 60 * 1000 );
            }
        }

        return newDate;
    }

    /**
     * @description Возвращает строковое представление даты в формате YYYY-MM-DDTHH:mm:ss.sss+HH:MM
     * @param {Date} date
     * @param {Object} options
     * @param {Number} options.timezoneOffset Смещение часового пояса относительно часового пояса UTC в минутах
     * @returns {string|null}
     */
    function toISO8601( date, options ) {
        var config = options || {};

        if( typeof date === 'undefined' || date === null ) {
            return null;
        }

        if( date.constructor !== Date ) {
            return null;
        }

        var _date = changeTimezoneOffset( date, config.timezoneOffset );

        var datePart = [
            padInt( _date.getFullYear(), 4 ),
            padInt( _date.getMonth() + 1, 2 ),
            padInt( _date.getDate(), 2 )
        ].join( '-' );

        var timePart = [
            padInt( _date.getHours(), 2 ),
            padInt( _date.getMinutes(), 2 ),
            padInt( _date.getSeconds(), 2 )
        ].join( ':' );

        var sssPart = padInt( _date.getMilliseconds(), 3 ) + '0';// '000' + '0'


        var timezoneOffset = config.timezoneOffset;
        if( typeof timezoneOffset === 'undefined' || timezoneOffset === null ) {
            timezoneOffset = date.getTimezoneOffset();
        }

        var tz = Math.abs( timezoneOffset );
        var tzOffsetPart = Math.sign( timezoneOffset ) > 0 ? '-' : '+';
        var tzPart = [
            padInt( Math.floor( tz / 60 ), 2 ),
            padInt( tz % 60, 2 )
        ].join( ':' );

        return datePart + 'T' + timePart + '.' + sssPart + tzOffsetPart + tzPart;
    }

    /**
     * @description Возвращает заданную дату как количество секунд, прошедших с 01-01-1970T00:00 по UTC
     * @param {String|Date} date ISO8601
     */
    function dateToTimestamp( date ) {
        var _date, datetime = null;

        if( date && date.constructor === String ) {
            _date = new Date( date );
        } else if( date && date.constructor === Date ) {
            _date = date;
        }

        if( _date ) {
            _date.setUTCHours( 0, 0, 0, 0 );
            datetime = _date.getTime() / 1000;
        }

        return datetime;
    }

    function dateToTimestampTime( date ) {
        var time = null, _date, datetime;

        if( date && date.constructor === String ) {
            _date = new Date( date );
        } else if( date && date.constructor === Date ) {
            _date = date;
        }

        if( _date ) {
            datetime = new Date( 0 );
            datetime.setUTCHours( _date.getUTCHours(), _date.getUTCMinutes(), _date.getUTCSeconds(), _date.getUTCMilliseconds() );
            time = datetime.getTime() / 1000;
        }

        return time;
    }

    function createDate( d ) {
        var date;

        if( typeof d === Date ) {
            date = new Date( d.getTime() );
        } else if( typeof d === 'number' ) {
            //Числовое значение интерпретируем как секунды (as unix-time)!
            date = new Date( d * 1000 );
        } else if( typeof d === 'undefined' || d === null ) {
            date = null;
        } else {
            date = toDate( d );
        }

        return date;
    }

    function getDefaultTimezone() {
        return _defaultTimeZone;
    }

    function padInt( value, size ) {
        var str = '' + value;
        var pad = '';
        if( str.length < size ) {
            pad = Array( size - str.length + 1 ).join( '0' );
        }
        return pad + str;
    }

    function init() {
        var date = new Date();
        _defaultTimeZone = date.getTimezoneOffset();

        if( !Math.sign ) { //fix for devices not support ES6
            Math.sign = function( x ) {
                return x ? x < 0 ? -1 : 1 : 0;
            };
        }
    }

} )();
