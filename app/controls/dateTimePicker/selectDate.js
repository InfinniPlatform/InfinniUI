/**
 *
 * @constructor
 */
var SelectDate = Backbone.View.extend( {

    className: 'pl-datepicker-dropdown pl-dropdown-container',

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/select.date.tpl.html' ],

    UI: {
        days: '.days',
        months: '.months',
        years: '.years'
    },

    events: {
        'click .backdrop': 'onClickBackdropHandler',
        'click .datepicker-clear': 'onClickClearValueHandler',
        'click .today-date': 'onClickTodayHandler'
    },

    /**
     *
     */
    render: function() {
        var template = this.template();
        this.$el.html( template );
        this.bindUIElements();
        this.renderComponents();
    },

    /**
     *
     */
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

        this.months = months;
        this.years = years;
        this.days = days;

        this.workflow( days, months, years, value )( value );
    },

    /**
     *
     */
    onClickBackdropHandler: function() {
        this.remove();
    },

    /**
     *
     */
    onClickClearValueHandler: function() {
        this.clearValue();
    },

    /**
     *
     */
    clearValue: function() {
        this.useValue( null );
    },

    /**
     *
     * @param date
     */
    useValue: function( date ) {
        var model = this.model;
        var timeZone = model.get( 'timeZone' );
        var min = model.get( 'minValue' );
        var max = model.get( 'maxValue' );

        if( !InfinniUI.DateUtils.checkRangeDate( date, min, max ) ) {
            date = InfinniUI.DateUtils.getNearestDate( date, min, max );
        }

        this.trigger( 'date', InfinniUI.DateUtils.restoreTimezoneOffset( date, timeZone ) );
        this.remove();
    },

    /**
     *
     * @param days
     * @param months
     * @param years
     * @returns {showDays}
     */
    workflow: function( days, months, years ) {
        this
            .listenTo( days, 'date', this.useValue )
            .listenTo( days, 'year', function( date ) {
                showYears( date );//Needed select year from list
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

        return showDays;

        function showDays( date ) {
            days.setDate( date );

            years.hide();
            months.hide();
            days.show();
        }

        function showMonths( date ) {
            months.setDate( date );

            days.hide();
            years.hide();
            months.show();
        }

        function showYears( date ) {
            years.setDate( date );

            days.hide();
            months.hide();
            years.show();
        }
    },

    /**
     *
     */
    onClickTodayHandler: function() {
        this.useValue( new Date() );
    },

    /**
     *
     * @param parentDOMElement
     */
    updatePosition: function( parentDOMElement ) {
        var direction = this.getDropdownDirection( parentDOMElement );
        this.setPositionFor( parentDOMElement, direction );
    },

    /**
     *
     * @param parentDOMElement
     * @param direction
     */
    setPositionFor: function( parentDOMElement, direction ) {
        clearInterval( this._intervalId );

        this.applyStyle( parentDOMElement, direction );
        this._intervalId = setInterval( this.applyStyle.bind( this, parentDOMElement, direction ), 100 );
    },

    /**
     *
     * @returns {*}
     */
    remove: function() {
        clearInterval( this._intervalId );
        this.trigger( 'remove' );
        return Backbone.View.prototype.remove.apply( this, arguments );
    },

    /**
     *
     * @param parentDOMElement
     * @returns {string}
     */
    getDropdownDirection: function( parentDOMElement ) {
        var windowHeight = $( window ).height();
        var rect = parentDOMElement.getBoundingClientRect();
        var height = this.$el.height();
        var direction = 'bottom';

        if( rect.bottom + height + 30 > windowHeight && rect.bottom > windowHeight / 2 && rect.top > height ) {
            direction = 'top';
        }

        return direction;
    },

    /**
     *
     * @param parentDOMElement
     * @param direction
     */
    applyStyle: function( parentDOMElement, direction ) {
        var rect = parentDOMElement.getBoundingClientRect();
        var rectDropdown = this.el.getBoundingClientRect();
        //@TODO Вынести общие стили в css
        var style = {
            position: 'absolute',
            left: window.pageXOffset + rect.right - Math.round( rectDropdown.width )
        };

        if( direction === 'bottom' ) {
            style.top = window.pageYOffset + rect.bottom;
        } else {
            style.top = window.pageYOffset + rect.top - this.$el.height();
        }

        this.$el.css( style );
    }

} );

_.extend( SelectDate.prototype, bindUIElementsMixin );

InfinniUI.SelectDate = SelectDate;
