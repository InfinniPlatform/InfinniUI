/**
 * @class
 * @augments TextEditorBaseModel
 * @constructor
 */
var DateTimePickerModel = TextEditorBaseModel.extend( {

    defaults: _.extend(
        {
            expandOnEnter: true,
            dropdown: null
        },
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
    validate: function( attributes/*, options*/ ) {
        var isValid = InfinniUI.DateUtils.checkRangeDate( attributes.value, attributes.minValue, attributes.maxValue );

        if( !isValid ) {
            return 'Значение выходит за пределы допустимого диапазона';
        }
    }

} );

InfinniUI.DateTimePickerModel = DateTimePickerModel;
