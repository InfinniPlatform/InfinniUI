var SelectDateTime = SelectDate.extend( {

    className: 'pl-datepicker-dropdown pl-dropdown-container',

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/select.dateTime.tpl.html' ],

    UI: {
        days: '.days',
        months: '.months',
        years: '.years',
        times: '.times',
        hours: '.hours',
        minutes: '.minutes'
    },

    onClickToggleDateHandler: function() {
        this.trigger( 'days' );
    },

    onClickToggleTimeHandler: function() {
        this.trigger( 'time' );
    },

    renderComponents: function() {
        var model = this.model;
        var value = InfinniUI.DateUtils.createDate( model.get( 'value' ) );
        var today = InfinniUI.DateUtils.createDate( model.get( 'today' ) );
        var timeZone = model.get( 'timeZone' );
        var m = moment( value );

        if( m.isValid() ) {
            value = m.toDate();
        } else {
            value = null;
        }

        value = InfinniUI.DateUtils.changeTimezoneOffset( value, timeZone );

        var options = {
            value: value,
            today: today || new Date(),
            //date: value,
            max: model.get( 'maxValue' ),
            min: model.get( 'minValue' )
        };

        options.el = this.ui.months;
        var months = new SelectMonths( options );

        options.el = this.ui.years;
        var years = new SelectYears( options );

        options.el = this.ui.days;
        var days = new SelectDays( options );

        options.el = this.ui.times;
        var time = new SelectTimes( options );
        //time.setDate(undefined);

        options.el = this.ui.hours;
        var hours = new SelectHours( options );

        options.el = this.ui.minutes;
        var minutes = new SelectMinutes( options );

        this.workflow( days, months, years, time, hours, minutes )( value );
    },

    useTime: function( date ) {
        var model = this.model;
        var timeZone = model.get( 'timeZone' );
        var min = model.get( 'minValue' );
        var max = model.get( 'maxValue' );

        if( !InfinniUI.DateUtils.checkRangeDate( date, min, max ) ) {
            date = InfinniUI.DateUtils.getNearestDate( date, min, max );
        }

        this.trigger( 'date', InfinniUI.DateUtils.restoreTimezoneOffset( date, timeZone ) );

        return date;
    },

    workflow: function( days, months, years, time, hours, minutes ) {
        var useTime = this.useTime.bind( this );
        var components = Array.prototype.slice.call( arguments );

        this
            .listenTo( days, 'date', this.useValue )
            .listenTo( days, 'year', function( date ) {
                showYears( date );//Needed select year from list
            } )
            .listenTo( days, 'time', function( date ) {
                showTime( date );
            } )
            .listenTo( years, 'year', function( date ) {
                showMonths( date );//Needed select month for year
            } )
            .listenTo( months, 'year', function( date ) {
                showYears( date );//Needed select year from list
            } )
            .listenTo( months, 'month', function( date ) {
                showDays( date );//Needed select day from calendar
            } );

        this.listenTo( time, 'hour', function( date ) {
            showHours( date );
        } )
            .listenTo( time, 'minute', function( date ) {
                showMinutes( date );
            } )
            .listenTo( time, 'day', function( date ) {
                showDays( date );
            } )
            .listenTo( time, 'date', function( date ) {
                useTime( date );
            } )
            .listenTo( hours, 'hour', function( date ) {
                var newDate = useTime( date );
                showTime( newDate );
            } )
            .listenTo( minutes, 'minute', function( date ) {
                var newDate = useTime( date );
                showTime( newDate );
            } );

        //Переключатель режима Date/Time
        this
            .on( 'days', function( date ) {
                showDays( date );
            } )
            .on( 'time', function( date ) {
                showTime( date );
            } );

        return showDays;

        function switchComponent( component ) {
            components.forEach( function( c ) {
                if( c !== component ) {
                    c.hide();
                }
            } );
            component.show();
        }

        function showDays( date ) {
            days.setDate( date );
            switchComponent( days );
        }

        function showMonths( date ) {
            months.setDate( date );
            switchComponent( months );
        }

        function showYears( date ) {
            years.setDate( date );
            switchComponent( years );
        }

        function showHours( date ) {
            hours.setDate( date );
            switchComponent( hours );
        }

        function showMinutes( date ) {
            minutes.setDate( date );
            switchComponent( minutes );
        }

        function showTime( date ) {
            time.setDate( date );
            switchComponent( time );
        }
    }

} );

InfinniUI.SelectDateTime = SelectDateTime;
