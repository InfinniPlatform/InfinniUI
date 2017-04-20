var SelectYearsModel = SelectComponentModel.extend( {

    defaults: function() {
        var defaults = SelectComponentModel.prototype.defaults.call( this );

        return _.defaults( {
            pageSize: 20,
            page: 0
        }, defaults );
    },

    initialize: function() {
        SelectComponentModel.prototype.initialize.call( this );
        this.on( 'change:year', this.updateDatePart.bind( this, 'year' ) );
        this.on( 'change:year', this.onChangeYearHandler );
    },

    prevPage: function() {
        var page = this.get( 'page' );
        this.set( 'page', page - 1 );
    },

    nextPage: function() {
        var page = this.get( 'page' );
        this.set( 'page', page + 1 );
    },

    resetPage: function() {
        this.set( 'page', 0 );
    },

    onChangeYearHandler: function( model, value ) {
        this.keepDateInRange();
        model.set( 'page', 0 );
    }

} );

var SelectYears = SelectComponent.extend( {

    modelClass: SelectYearsModel,

    template: InfinniUI.Template[ 'controls/dateTimePicker/template/date/years.tpl.html' ],

    events: {
        'click .btn-year-prev': 'prevPage',
        'click .btn-year-next': 'nextPage',
        'click .today-year': 'showTodayYear',
        'click .year:not(".year-unavailable")': 'useYear'
    },

    UI: {
        years: '.year',
        yearBegin: '.year-begin',
        yearEnd: '.year-end'
    },

    initOnChangeHandlers: function() {
        this.listenTo( this.model, 'change:page', this.fillYearsTable );
        this.listenTo( this.model, 'change:year', this.fillYearsTable );
    },

    render: function() {
        var template = this.template();
        this.$el.html( template );
        this.bindUIElements();
        //this.fillCalendar();
        this.fillYearsTable();
        this.initOnChangeHandlers();
    },

    fillYearsTable: function() {
        var model = this.model;
        var page = model.get( 'page' );
        var pageSize = model.get( 'pageSize' );
        var year = model.get( 'year' );
        var todayYear = model.get( 'todayYear' );
        // var startYear = Math.ceil((year || todayYear) - pageSize / 2) + page * pageSize;
        var startYear = Math.ceil( year - pageSize / 2 ) + page * pageSize;

        this.ui.years.each( function( i, el ) {
            var $el = $( el );
            var year = startYear + i;
            $el.text( year );
            $el.attr( 'data-year', year );
            markTodayYear( $el, year );
            markSelected( $el, year );
            markAvailable( $el, year );
        } );

        this.ui.yearBegin.text( startYear );
        this.ui.yearEnd.text( startYear + pageSize - 1 );

        function markTodayYear( $el, value ) {
            $el.toggleClass( 'year-today', value === todayYear );
        }

        function markSelected( $el, value ) {
            $el.toggleClass( 'year-selected', value === year );
        }

        function markAvailable( $el, value ) {
            var date = moment( [ value ] );
            $el.toggleClass( 'year-unavailable', !model.checkRange( date, 'year' ) );
        }
    },

    prevPage: function() {
        this.model.prevPage();
    },

    nextPage: function() {
        this.model.nextPage();
    },

    showTodayYear: function() {
        this.today();
    },

    today: function() {
        this.model.resetPage();
    },

    useYear: function( event ) {
        var $el = $( event.target );
        var model = this.model;

        model.set( {
            year: parseInt( $el.attr( 'data-year' ), 10 )
        } );

        this.trigger( 'year', model.get( 'date' ) );
    }

} );
