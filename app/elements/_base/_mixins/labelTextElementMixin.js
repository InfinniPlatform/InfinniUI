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
    },

    /**
     * @returns {boolean | null}
     */
    getLabelTextTitle: function() {
        return this.control.get( 'labelTextTitle' );
    },

    /**
     *
     * @param {boolean} value
     */
    setLabelTextTitle: function( value ) {
        this.control.set( 'labelTextTitle', value );
    }

};

InfinniUI.labelTextElementMixin = labelTextElementMixin;
