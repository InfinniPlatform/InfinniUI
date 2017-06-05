/**
 * @mixes editMaskMixin
 * @constructor
 */
function RegexEditMask() {
    this.mask = null;
}

InfinniUI.RegexEditMask = RegexEditMask;

_.extend( RegexEditMask.prototype, editMaskMixin, {

    /**
     * @description Проверка что маска была полностью заполнена
     * @param value
     * @returns {boolean}
     */
    getIsComplete: function( value ) {
        var regExp;
        this.value = value;
        if( this.mask !== null ) {
            regExp = new RegExp( this.mask );
            return regExp.test( value );
        }
        return false;
    }

} );

