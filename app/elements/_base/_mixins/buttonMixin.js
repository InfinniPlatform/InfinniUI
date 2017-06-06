/**
 *
 * @mixin
 */
var buttonMixin = {

    /**
     *
     */
    buttonInit: function() {
        this.isFirstAction = true;
    },

    /**
     * @returns {*}
     */
    getContent: function() {
        return this.control.get( 'content' );
    },

    /**
     *
     * @param value
     */
    setContent: function( value ) {
        this.control.set( 'content', value );
    },

    /**
     * @returns {*}
     */
    getContentTemplate: function() {
        return this.control.get( 'contentTemplate' );
    },

    /**
     *
     * @param value
     */
    setContentTemplate: function( value ) {
        this.control.set( 'contentTemplate', value );
    },

    /**
     *
     * @param value
     */
    setAction: function( value ) {
        var control = this.control;

        control.set( 'action', value );

        if ( this.isFirstAction ) {
            this.isFirstAction = false;

            this.onClick( function() {
                var action = control.get( 'action' );

                if ( action ) {
                    action.execute();
                }
            } );
        }
    },

    /**
     * @returns {*}
     */
    getAction: function() {
        return this.control.get( 'action' );
    },

    /**
     *
     */
    click: function() {
        this.control.click();
    },

    /**
     *
     * @param handler
     */
    onClick: function( handler ) {
        var that = this;

        Element.prototype.onClick.call( this, onClickHandlerWrap );

        function onClickHandlerWrap( args ) {
            var enabled = that.getEnabled();

            if( enabled ) {
                handler( args );
            }
        }
    }

};

InfinniUI.buttonMixin = buttonMixin;
