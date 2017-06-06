/**
 *
 * @mixin
 */
var labelTextElementMixin = {

    /**
     * @returns {*}
     */
    getLabelText: function() {
        return this.control.get( 'labelText' );
    },

    /**
     *
     * @param value
     */
    setLabelText: function( value ) {
        this.control.set( 'labelText', value );
    }

};

InfinniUI.labelTextElementMixin = labelTextElementMixin;
