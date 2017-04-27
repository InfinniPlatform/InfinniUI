/**
 *
 * @param parentView
 * @constructor
 */
function BaseEditAction( parentView ) {
    _.superClass( BaseEditAction, this, parentView );
}

InfinniUI.BaseEditAction = BaseEditAction;

_.inherit( BaseEditAction, BaseAction );

_.extend( BaseEditAction.prototype, {

    /**
     *
     * @param callback
     */
    execute: function( callback ) {
        var that = this;
        var linkView = this.getProperty( 'linkView' );

        this.setProperty( 'callback', callback );

        linkView.createView( function( createdView ) {
            that.handleViewReady( createdView );
        } );
    },

    /**
     *
     * @param editView
     */
    handleViewReady: function( editView ) {
        var editSourceName = this.getProperty( 'sourceSource' );
        var editDataSource = editView.getContext().dataSources[ editSourceName ];
        var destinationSourceName = this.getProperty( 'destinationSource' );
        var destinationDataSource = this.parentView.getContext().dataSources[ destinationSourceName ];
        var that = this;

        this.setProperty( 'editDataSource', editDataSource );
        this.setProperty( 'destinationDataSource', destinationDataSource );

        var isSuccessfulPreset = this.setSelectedItem();

        if( isSuccessfulPreset ) {
            editView.open();

            editView.onClosed( function() {
                var dialogResult = editView.getDialogResult();

                if ( dialogResult == DialogResult.accepted ) {
                    that.handleClosingView();
                }
            } );
        } else {
            editView.close();
        }
    },

    handleClosingView: function() {
        var callback = this.getProperty( 'callback' );

        this.save();
        this.onExecutedHandler();

        if ( typeof callback === 'function' ) {
            callback();
        }
    },

    /**
     *
     * @param source
     * @returns {boolean}
     * @private
     */
    _isObjectDataSource: function( source ) {
        return 'setItems' in source;
    }

} );
