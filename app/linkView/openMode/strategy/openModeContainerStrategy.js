var OpenModeContainerStrategy = function() {
};

_.extend( OpenModeContainerStrategy.prototype, {

    setView: function( view ) {
        this.view = view;
    },

    setContainer: function( container ) {
        this.container = container;
    },

    open: function() {
        var logger = InfinniUI.global.logger;
        if( !this.container ) {
            logger.error( 'OpenModeContainerStrategy.open: не задан контейнер, в который должо быть помещено приложение' );
        }

        this.container.setLayout( this.view );
    },

    close: function() {
        this.container.setLayout( null );
        this.view.remove();
    }

} );

InfinniUI.OpenModeContainerStrategy = OpenModeContainerStrategy;
