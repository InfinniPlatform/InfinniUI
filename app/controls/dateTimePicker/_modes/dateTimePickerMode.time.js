/**
 *
 * @mixin
 */
var dateTimePickerModeTime = {

    /**
     *
     * @returns {*}
     */
    getTemplate: function() {
        return InfinniUI.Template[ 'controls/dateTimePicker/template/time.tpl.html' ];
    },

    /**
     *
     */
    openDropdown: function() {
        var that = this;
        var model = this.model;
        var calendar = new SelectTime( {
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
            that.ui.control.focus();
        } );
    },

    /**
     *
     * @param value
     * @returns {string|null}
     */
    convertValue: function( value ) {
        return InfinniUI.DateUtils.dateToTimestamp( InfinniUI.DateUtils.changeTimezoneOffset( value, this.model.get( 'timeZone' ) ) );
    }

};

InfinniUI.dateTimePickerModeTime = dateTimePickerModeTime;
