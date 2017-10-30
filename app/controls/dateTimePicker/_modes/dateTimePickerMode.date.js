/**
 *
 * @mixin
 */
var dateTimePickerModeDate = {

    /**
     *
     * @returns {*}
     */
    getTemplate: function() {
        return InfinniUI.Template[ 'controls/dateTimePicker/template/date.tpl.html' ];
    },

    /**
     *
     */
    openDropdown: function() {
        var model = this.model;
        var calendar = new SelectDate( {
            model: model
        } );

        calendar.render();
        $( 'body' ).append( calendar.$el );

        calendar.updatePosition( this.el );

        model.set( 'dropdown', calendar );

        this.listenTo( calendar, 'date', function( date ) {
            model.set( 'value', this.convertValue( date ) );
        } );

        this.listenTo( calendar, 'remove', function( date ) {
            model.set( 'dropdown', null );
        } );
    },

    /**
     *
     * @param value
     * @returns {string|null}
     */
    convertValue: function( value ) {
        return InfinniUI.DateUtils.dateToTimestamp( InfinniUI.DateUtils.changeTimezoneOffset( value ) );
    }

};

InfinniUI.dateTimePickerModeDate = dateTimePickerModeDate;
