var buttonMixin = {

    buttonInit: function() {
        this.isFirstAction = true;
    },

    getContent: function() {
        return this.control.get( 'content' );
    },

    setContent: function( value ) {
        this.control.set( 'content', value );
    },

    getContentTemplate: function() {
        return this.control.get( 'contentTemplate' );
    },

    setContentTemplate: function( value ) {
        this.control.set( 'contentTemplate', value );
    },

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

    getAction: function() {
        return this.control.get( 'action' );
    },

    click: function() {
        this.control.click();
    },

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