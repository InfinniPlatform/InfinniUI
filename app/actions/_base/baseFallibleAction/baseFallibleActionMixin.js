var BaseFallibleActionMixin = {
    onSuccessHandler: function( args ) {
        var onSuccessHandler = this.getProperty( 'onSuccessHandler' );

        if( typeof onSuccessHandler === 'function' ) {
            onSuccessHandler( args );
        }
    },
    onErrorHandler: function( args ) {
        var onErrorHandler = this.getProperty( 'onErrorHandler' );

        if( typeof onErrorHandler === 'function' ) {
            onErrorHandler( args );
        }
    }
};
