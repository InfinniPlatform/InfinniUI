/**
 *
 * @mixin
 */
var valuePropertyMixin = {

    /**
     * @returns {*}
     */
    getValue: function() {
        return this.control.get( 'value' );
    },

    /**
     *
     * @param value
     * @returns {*}
     */
    setValue: function( value ) {
        return this.control.set( 'value', value );
    },

    /**
     *
     * @param handler
     */
    onValueChanged: function( handler ) {
        this.control.onValueChanged( handler );
    }

};

InfinniUI.valuePropertyMixin = valuePropertyMixin;
