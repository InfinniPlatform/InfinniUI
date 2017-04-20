var SelectTimesModel = SelectComponentModel.extend( {

    initialize: function() {
        SelectComponentModel.prototype.initialize.call( this );
        this.on( 'change:hour', this.updateDatePart.bind( this, 'hour' ) );
        this.on( 'change:minute', this.updateDatePart.bind( this, 'minute' ) );
        this.on( 'change:second', this.updateDatePart.bind( this, 'second' ) );
        this.on( 'change:millisecond', this.updateDatePart.bind( this, 'millisecond' ) );
    },

    nextHour: function() {
        var hour = this.get( 'hour' );
        hour += 1;

        //@TODO Границу использовать в зависимости от 12/24 формата записи даты из настроек локализации
        if( hour > 23 ) {
            return;
        }

        this.set( 'hour', hour );
        this.keepDateInRange();
    },

    prevHour: function() {
        var hour = this.get( 'hour' );
        hour -= 1;

        if( hour < 0 ) {
            return;
        }

        this.set( 'hour', hour );
        this.keepDateInRange();
    },

    nextMinute: function() {
        var minute = this.get( 'minute' );
        minute += 1;

        if( minute >= 60 ) {
            return;
        }

        this.set( 'minute', minute );
        this.keepDateInRange();
    },

    prevMinute: function() {
        var minute = this.get( 'minute' );
        minute -= 1;

        if( minute < 0 ) {
            return;
        }

        this.set( 'minute', minute );
        this.keepDateInRange();
    },

    nextSecond: function() {
        var second = this.get( 'second' );
        second += 1;

        if( second >= 60 ) {
            return;
        }

        this.set( 'second', second );
        this.keepDateInRange();
    },

    prevSecond: function() {
        var second = this.get( 'second' );
        second -= 1;

        if( second < 0 ) {
            return;
        }

        this.set( 'second', second );
        this.keepDateInRange();
    },

    validate: function( attr, options ) {
        var value = InfinniUI.DateUtils.cloneDate( attr.date );
        value.setHours( attr.hour, attr.minute, attr.second, attr.millisecond );

        if( !this.checkRange( value ) ) {
            return 'Out of range';
        }
    }

} );

var SelectTimes = SelectComponent.extend( {

    modelClass: SelectTimesModel,

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/time/time.tpl.html' ],

    events: {
        'click .time-spin-down.time-spin-hour': 'prevHour',
        'click .time-spin-up.time-spin-hour': 'nextHour',

        'click .time-spin-down.time-spin-minute': 'prevMinute',
        'click .time-spin-up.time-spin-minute': 'nextMinute',

        'click .time-spin-down.time-spin-second': 'prevSecond',
        'click .time-spin-up.time-spin-second': 'nextSecond',

        'click .time-segment-hour': 'selectHour',
        'click .time-segment-minute': 'selectMinute',
        'click .time-segment-second': 'selectSecond',
        'click .days': 'selectDay'
    },

    UI: {
        month: '.month',
        year: '.year',
        hour: '.time-segment-hour',
        minute: '.time-segment-minute',
        second: '.time-segment-second'
    },

    render: function() {
        var template = this.template();
        this.$el.html( template );
        this.bindUIElements();
        this.updateHour();
        this.updateMinute();
        this.updateSecond();
        this.initOnChangeHandlers();
    },

    selectHour: function() {
        var model = this.model;
        var date = model.get( 'date' );
        var hour = model.get( 'hour' );
        var minute = model.get( 'minute' );
        var second = model.get( 'second' );

        date.setHours( hour, minute, second );
        this.trigger( 'hour', date );
    },

    selectMinute: function() {
        var model = this.model;
        var date = model.get( 'date' );
        var hour = model.get( 'hour' );
        var minute = model.get( 'minute' );
        var second = model.get( 'second' );

        date.setHours( hour, minute, second );
        this.trigger( 'minute', date );
    },

    selectSecond: function() {
        var model = this.model;
        var date = model.get( 'date' );
        var hour = model.get( 'hour' );
        var minute = model.get( 'minute' );
        var second = model.get( 'second' );

        date.setHours( hour, minute, second );
        this.trigger( 'second', date );
    },

    initOnChangeHandlers: function() {
        this.listenTo( this.model, 'change:hour', this.updateHour );
        this.listenTo( this.model, 'change:minute', this.updateMinute );
        this.listenTo( this.model, 'change:second', this.updateSecond );
        this.listenTo( this.model, 'change:date', this.useTime );
    },

    updateHour: function() {
        var hour = this.model.get( 'hour' );
        this.ui.hour.text( stringUtils.padLeft( hour, 2, '0' ) );
    },

    updateMinute: function() {
        var minute = this.model.get( 'minute' );
        this.ui.minute.text( stringUtils.padLeft( minute, 2, '0' ) );
    },

    updateSecond: function() {
        var second = this.model.get( 'second' );
        this.ui.second.text( stringUtils.padLeft( second, 2, '0' ) );
    },

    prevHour: function() {
        this.model.prevHour();
    },

    nextHour: function() {
        this.model.nextHour();
    },

    prevMinute: function() {
        this.model.prevMinute();
    },

    nextMinute: function() {
        this.model.nextMinute();
    },

    prevSecond: function() {
        this.model.prevSecond();
    },

    nextSecond: function() {
        this.model.nextSecond();
    },

    useTime: function() {
        var date = this.model.get( 'date' );

        this.trigger( 'date', date );
    },

    selectDay: function() {
        var date = this.model.get( 'date' );

        this.trigger( 'day', date );
    }

} );
