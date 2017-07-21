/**
 *
 * @mixin
 */
var bindUIElementsMixin = {
    /**
     * Сохраняет в поле ui элементы по селектору в UI
     *
     * UI: {"name1": "selector1", "name2": "selector2"}
     */
    bindUIElements: function() {
        this.ui = {};

        if( typeof this.UI === 'undefined' ) {
            return;
        }

        for( var i in this.UI ) {
            if( !this.UI.hasOwnProperty( i ) ) continue;

            this.ui[ i ] = this.$( this.UI[ i ] );
        }
    }

};

InfinniUI.bindUIElementsMixin = bindUIElementsMixin;
