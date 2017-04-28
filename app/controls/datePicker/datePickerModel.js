/**
 *
 * @constructor
 */
var DatePickerModel = DateTimePickerModel.extend( {

    /**
     *
     */
    initialize: function() {
        DateTimePickerModel.prototype.initialize.apply( this, arguments );
    }

} );

InfinniUI.DatePickerModel = DatePickerModel;
