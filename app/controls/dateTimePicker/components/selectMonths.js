/**
 *
 * @constructor
 */
var SelectMonthsModel = SelectComponentModel.extend( {

    /**
     *
     */
    initialize: function() {
        SelectComponentModel.prototype.initialize.call( this );
        this.on( 'change:month', this.updateDatePart.bind( this, 'month' ) );
        this.on( 'change:year', this.updateDatePart.bind( this, 'year' ) );
    },

    /**
     *
     */
    nextYear: function() {
        var year = this.get( 'year' );

        this.set( 'year', year + 1 );
        this.keepDateInRange();
    },

    /**
     *
     */
    prevYear: function() {
        var year = this.get( 'year' );
        this.set( 'year', year - 1 );
        this.keepDateInRange();
    },

    /**
     *
     */
    today: function() {
        this.set( {
            month: this.get( 'todayMonth' ),
            year: this.get( 'todayYear' )
        } );
    }

} );

InfinniUI.SelectMonthsModel = SelectMonthsModel;

/**
 *
 * @constructor
 */
var SelectMonths = SelectComponent.extend( {

    modelClass: SelectMonthsModel,

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/date/months.tpl.html' ],

    events: {
        'click .btn-year-prev': 'prevYear',
        'click .btn-year-next': 'nextYear',
        'click .month:not(\'.month-unavailable\')': 'useMonth',
        'click .year': 'selectYear',
        'click .today-month': 'showToday'
    },

    UI: {
        month: '.month',
        year: '.year'
    },

    /**
     *
     */
    render: function() {
        var template = this.template();
        this.$el.html( template );
        this.bindUIElements();
        this.fillMonthsTable();
        this.initOnChangeHandlers();
    },

    /**
     *
     */
    fillMonthsTable: function() {
        this.ui.year.text( this.model.get( 'year' ) );

        var model = this.model;
        var dateTimeFormatInfo = localized.dateTimeFormatInfo;
        var todayMonth = model.get( 'todayMonth' );
        var month = model.get( 'month' );

        this.ui.month.each( function( i, el ) {
            var $el = $( el );
            $el.text( dateTimeFormatInfo.abbreviatedMonthNames[ i ] );
            $el.attr( 'data-month', i );
            markTodayMonth( $el, i );
            markSelected( $el, i );
            markAvailable( $el, i );
        } );

        function markTodayMonth( $el, value ) {
            var date = moment( [model.get( 'year' ), value] );
            var today = model.get( 'today' );

            $el.toggleClass( 'month-today', moment( date ).isSame( today, 'month' ) );
        }

        function markSelected( $el, value ) {
            var date = moment( [model.get( 'year' ), value] );
            var selected = model.get( 'value' );

            $el.toggleClass( 'month-selected', moment( date ).isSame( selected, 'month' ) );
        }

        function markAvailable( $el, value ) {
            var date = moment( [model.get( 'year' ), value] );
            $el.toggleClass( 'month-unavailable', !model.checkRange( date, 'month' ) );
        }
    },

    /**
     *
     */
    initOnChangeHandlers: function() {
        this.listenTo( this.model, 'change:year', this.fillMonthsTable );
    },

    /**
     *
     */
    prevYear: function() {
        this.model.prevYear();
    },

    /**
     *
     */
    nextYear: function() {
        this.model.nextYear();
    },

    /**
     *
     * @param event
     */
    useMonth: function( event ) {
        var $el = $( event.target );
        var model = this.model;

        model.set( {
            year: parseInt( model.get( 'year' ), 10 ),
            month: parseInt( $el.attr( 'data-month' ), 10 )
        } );
        this.trigger( 'month', model.get( 'date' ) );
    },

    /**
     *
     */
    selectYear: function() {
        this.trigger( 'year', this.model.get( 'data' ) );
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
    }

} );

InfinniUI.SelectMonths = SelectMonths;
