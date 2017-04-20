function RegexEditMask() {
    this.mask = null;
}

window.InfinniUI.RegexEditMask = RegexEditMask;


_.extend( RegexEditMask.prototype, editMaskMixin );

_.extend( RegexEditMask.prototype, {

    /**
     * Проверка что маска была полностью заполнена
     */
    getIsComplete: function( value ) {
        var regExp;
        this.value = value;
        if ( this.mask !== null ) {
            regExp = new RegExp( this.mask );
            return regExp.test( value );
        }
        return false;
    }


} );

