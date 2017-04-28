/**
 *
 * @constructor
 */
var SelectDaysModel = SelectComponentModel.extend( {

    /**
     *
     */
    initialize: function() {
        SelectComponentModel.prototype.initialize.call( this );
        this.on( 'change:year', this.updateDatePart.bind( this, 'year' ) );
        this.on( 'change:month', this.updateDatePart.bind( this, 'month' ) );
        this.on( 'change:day', this.updateDatePart.bind( this, 'day' ) );
    },

    /**
     *
     */
    today: function() {
        this.set( {
            year: this.get( 'todayYear' ),
            month: this.get( 'todayMonth' )
        } );
    },

    /**
     *
     */
    nextMonth: function() {
        var month = this.get( 'month' );
        var year = this.get( 'year' );

        this.set( {
            month: month === 11 ? 0 : month + 1,
            year: month === 11 ? year + 1 : year
        } );

        this.keepDateInRange();
    },

    /**
     *
     */
    prevMonth: function() {
        var month = this.get( 'month' );
        var year = this.get( 'year' );

        this.set( {
            month: month === 0 ? 11 : month - 1,
            year: month === 0 ? year - 1 : year
        } );

        this.keepDateInRange();
    }

} );

InfinniUI.SelectDaysModel = SelectDaysModel;

/**
 *
 * @constructor
 */
var SelectDays = SelectComponent.extend( {

    modelClass: SelectDaysModel,

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/date/days.tpl.html' ],

    UI: {
        headerDays: '.weekdays-head .day',
        calendarDays: '.day-calendar',
        year: '.years-year',
        month: '.years-month'
    },

    events: {
        'click .years': 'onYearsClickHandler',
        'click .btn-month-prev': 'prevMonth',
        'click .btn-month-next': 'nextMonth',
        'click .today-date': 'showToday',
        'click .day-calendar:not(".day-unavailable")': 'useDay',
        'click .time': 'showTime'
    },

    /**
     *
     */
    render: function() {
        var template = this.template();
        this.$el.html( template );
        this.bindUIElements();
        this.fillLegend();
        this.fillCalendar();
        this.renderMonth();
        this.renderYear();
        this.initOnChangeHandlers();
    },

    /**
     *
     */
    initOnChangeHandlers: function() {
        this.listenTo( this.model, 'change:month', this.onChangeMonthHandler );
        this.listenTo( this.model, 'change:year', this.onChangeYearHandler );
        this.listenTo( this.model, 'change:day', this.onChangeDayHandler );
    },

    /**
     *
     */
    renderMonth: function() {
        var month = this.model.get( 'month' );
        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        this.ui.month.text( dateTimeFormatInfo.monthNames[ month ] );
    },

    /**
     *
     */
    renderYear: function() {
        var year = this.model.get( 'year' );
        this.ui.year.text( year );
    },

    onChangeMonthHandler: function( model, value ) {
        this.renderMonth();
        this.fillCalendar();
    },

    /**
     *
     * @param model
     * @param value
     */
    onChangeYearHandler: function( model, value ) {
        this.renderYear();
        this.fillCalendar();
    },

    /**
     *
     */
    fillLegend: function() {
        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        var firstDayOfWeek = dateTimeFormatInfo.firstDayOfWeek;
        var days = dateTimeFormatInfo.abbreviatedDayNames.map( function( day, i ) {
            return i;
        } );

        if( firstDayOfWeek > 0 ) {
            days = days.splice( firstDayOfWeek ).concat( days );
        }

        this.ui.headerDays.each( function( i, el ) {
            var $el = $( el );
            var index = days[ i ];
            $el.text( dateTimeFormatInfo.abbreviatedDayNames[ index ] );
            markWeekend( $el, index );
        } );

        this.ui.calendarDays.each( function( i, el ) {
            var $el = $( el );
            var index = days[ i % 7 ];
            markWeekend( $el, index );
        } );

        function markWeekend( $el, weekday ) {
            $el.toggleClass( 'day-weekend', weekday === 0 || weekday === 6 );
        }
    },

    /**
     *
     */
    fillCalendar: function() {
        var model = this.model;
        var valueDate = model.get( 'value' );
        var month = model.get( 'month' );
        var year = model.get( 'year' );
        var day = model.get( 'day' );
        var min = model.get( 'min' );
        var max = model.get( 'max' );
        var firstDayOfMonth = new Date( year, month );
        var weekday = firstDayOfMonth.getDay();
        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        var firstDayOfWeek = dateTimeFormatInfo.firstDayOfWeek;

        var weekdays = [ 0, 1, 2, 3, 4, 5, 6 ];
        Array.prototype.push.apply( weekdays, weekdays.splice( 0, firstDayOfWeek ) );
        var start = new Date( year, month, 1 - weekdays.indexOf( weekday ) );

        var startYear = start.getFullYear();
        var startMonth = start.getMonth();
        var startDate = start.getDate();

        this.ui.calendarDays.each( function( i, el ) {
            var $el = $( el );
            var d = new Date( startYear, startMonth, startDate + i );

            $el.text( d.getDate() );
            $el.attr( 'data-date', d );
            markActiveMonth( $el, d.getMonth() === month );
            markToday( $el, d );
            markSelected( $el, d );
            markAvailable( $el, d );
        } );

        function markActiveMonth( $el, active ) {
            $el.toggleClass( 'day-inactive', !active );
        }

        function markToday( $el, date ) {
            var today = date.getMonth() === model.get( 'todayMonth' )
                && date.getFullYear() === model.get( 'todayYear' )
                && date.getDate() === model.get( 'todayDay' );

            $el.toggleClass( 'day-today', today );
        }

        function markSelected( $el, value ) {
            var selected = false;

            if( valueDate ) {
                selected = moment( valueDate ).isSame( value, 'day' );
            }

            $el.toggleClass( 'day-selected', selected );
        }

        function markAvailable( $el, value ) {
            $el.toggleClass( 'day-unavailable', !model.checkRange( value, 'day' ) );
        }
    },

    /**
     *
     */
    onYearsClickHandler: function() {
        var date = this.model.get( 'date' );

        this.trigger( 'year', date );
    },

    /**
     *
     */
    prevMonth: function() {
        this.model.prevMonth();
    },

    /**
     *
     */
    nextMonth: function() {
        this.model.nextMonth();
    },

    /**
     *
     */
    showToday: function() {
        this.today();
    },

    /**
     *
     */
    today: function() {
        this.model.today();
    },

    /**
     *
     */
    showTime: function() {
        this.trigger( 'time', this.model.get( 'date' ) );
    },

    /**
     *
     * @param event
     */
    useDay: function( event ) {
        var $el = $( event.target );
        var date = new Date( $el.attr( 'data-date' ) );

        this.model.set( {
            year: date.getFullYear(),
            month: date.getMonth(),
            day: date.getDate()
        } );

        this.trigger( 'date', this.model.get( 'date' ) );
    }

} );

InfinniUI.SelectDays = SelectDays;
