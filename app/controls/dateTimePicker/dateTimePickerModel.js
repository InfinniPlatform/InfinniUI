/**
 * @class
 * @augments TextEditorBaseModel
 * @constructor
 */
var DateTimePickerModel = TextEditorBaseModel.extend( {

    defaults: _.extend(
        {},
        TextEditorBaseModel.prototype.defaults,
        {
            mode: 'Date'
            //today: new Date()
        }
    ),

    /**
     *
     */
    initialize: function() {
        TextEditorBaseModel.prototype.initialize.apply( this, Array.prototype.slice.call( arguments ) );
        this.set( 'today', new Date() );
        this.set( 'timeZone', InfinniUI.DateUtils.getDefaultTimeZone() );
    },

    /**
     *
     * @param attributes
     * @returns {boolean}
     */
    validate: function( attributes ) {
        var min = attributes.minValue;
        var max = attributes.maxValue;

        return InfinniUI.DateUtils.checkRangeDate( attributes.value, attributes.minValue, attributes.maxValue );
    }

} );

InfinniUI.DateTimePickerModel = DateTimePickerModel;
