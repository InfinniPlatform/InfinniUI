/**
 *
 * @param parent
 * @constructor
 */
function LinkView( parent ) {
    this.openMode = 'Default';
    this.parent = parent;

    this.viewTemplate = function() {
        return '';
    };
}

InfinniUI.LinkView = LinkView;

_.extend( LinkView.prototype, {

    /**
     *
     * @param mode
     */
    setOpenMode: function( mode ) {
        if( _.isEmpty( mode ) ) return;
        this.openMode = mode;
    },

    /**
     *
     * @returns {string|*}
     */
    getOpenMode: function() {
        return this.openMode;
    },

    /**
     *
     * @param containerName
     */
    setContainer: function( containerName ) {
        this.containerName = containerName;
    },

    /**
     *
     * @param viewTemplate
     */
    setViewTemplate: function( viewTemplate ) {
        this.viewTemplate = viewTemplate;
    },

    /**
     *
     * @param dialogWidth
     */
    setDialogWidth: function( dialogWidth ) {
        dialogWidth = dialogWidth.toLowerCase();
        if( dialogWidth == 'extralarge' ) {
            dialogWidth = '100%';
        }
        this.dialogWidth = dialogWidth;
    },

    /**
     *
     * @param resultCallback
     */
    createView: function( resultCallback ) {
        var that = this;

        this.viewTemplate( onViewReady );

        function onViewReady( createdView ) {
            that.view = createdView;
            that._initViewHandler( createdView );

            resultCallback( createdView );
        }
    },

    /**
     *
     * @param view
     * @private
     */
    _initViewHandler: function( view ) {
        var that = this;
        var openMode = that.openMode;
        var openStrategy;
        var container;

        if( view.setParent ) {
            view.setParent( this.parent );
        }

        InfinniUI.global.messageBus.send( 'onViewCreated', { openMode: openMode, view: view } );

        switch( openMode ) {
            case 'Container':
                container = InfinniUI.global.containers[ this.containerName ];

                openStrategy = new OpenModeContainerStrategy();
                openStrategy.setView( view );
                openStrategy.setContainer( container );
                view.setOpenStrategy( openStrategy );
                break;

            case 'Dialog':
                openStrategy = new OpenModeDialogStrategy();
                openStrategy.setView( view );
                if( this.dialogWidth ) {
                    openStrategy.setDialogWidth( this.dialogWidth );
                }
                openStrategy.setView( view );
                view.setOpenStrategy( openStrategy );
                break;
            default:
                break;
        }
    }

} );
