/**
 *
 * @constructor
 */
var SelectComponentModel = Backbone.Model.extend( {

    /**
     *
     * @returns {{today: Date, todayMonth: number, todayDay: number, todayYear: number, hour: number, minute: number, second: number, millisecond: number}}
     */
    defaults: function() {
        var today = new Date();

        return {
            today: today,
            todayMonth: today.getMonth(),
            todayDay: today.getDate(),
            todayYear: today.getFullYear(),
            hour: today.getHours(),
            minute: today.getMinutes(),
            second: today.getSeconds(),
            millisecond: today.getMilliseconds()
        };
    },

    /**
     *
     */
    initialize: function() {
        this.updateDateParts();
        this.on( 'change:date', this.onChangeDateHandler, this );
    },

    /**
     *
     */
    updateDateParts: function() {
        var date = this.get( 'date' );

        if( date instanceof Date ) {
            this.set( {
                year: date.getFullYear(),
                month: date.getMonth(),
                day: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds(),
                millisecond: date.getMilliseconds()
            } );
        } else {
            this.set( {
                year: null,
                month: null,
                day: null,
                hour: null,
                minute: null,
                second: null,
                millisecond: null
            } );
        }

    },

    /**
     *
     * @param model
     * @param value
     */
    onChangeDateHandler: function( model, value ) {
        if( typeof value !== 'undefined' && value !== null ) {
            model.set( {
                year: moment( value ).year(),
                month: moment( value ).month(),
                day: moment( value ).date(),
                hour: moment( value ).hour(),
                minute: moment( value ).minute(),
                second: moment( value ).second(),
                millisecond: moment( value ).millisecond()
            } );
        } else {
            model.set( {
                year: null,
                month: null,
                day: null,
                hour: null,
                minute: null,
                second: null,
                millisecond: null
            } );
        }
    },

    /**
     *
     * @param datePart
     * @param model
     * @param value
     */
    updateDatePart: function( datePart, model, value ) {
        var d = this.get( 'date' );
        var date = InfinniUI.DateUtils.createDate( d ) || this.get( 'today' );
        var data = this.toJSON();

        switch( datePart ) {
            case 'hour':
            case 'minute':
            case 'second':
                date.setHours( data.hour, data.minute, data.second );
                break;
            case 'year':
            case 'month':
            case 'day':
                date.setFullYear( data.year, data.month, data.day );
                break;
            default:
                break;
        }

        this.set( 'date', date );
    },

    /**
     *
     * @param date
     * @param precision
     * @returns {boolean}
     */
    checkRange: function( date, precision ) {
        var min = this.get( 'min' );
        var max = this.get( 'max' );

        return InfinniUI.DateUtils.checkRangeDate( date, min, max, precision );
    },

    /**
     *
     */
    keepDateInRange: function() {
        if( this.isValid() ) {
            return;
        }
        var date = InfinniUI.DateUtils.getNearestDate( this.get( 'date' ), this.get( 'min' ), this.get( 'max' ) );
        this.set( 'date', date );
    },

    /**
     * @description Установка текущего положения списка выбора значений
     * Если устанавливается недействительная дата - используется текущая
     * @param date
     */
    setDate: function( date ) {
        if( typeof date === 'undefined' || date === null ) {
            var value = this.get( 'value' );
            var today = this.get( 'date' );

            date = value || today;
        }

        if( date instanceof Date ) {
            date = new Date( date.getTime() );
        }
        this.set( 'date', date );
    }

} );

InfinniUI.SelectComponentModel = SelectComponentModel;
