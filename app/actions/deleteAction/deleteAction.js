/**
 *
 * @param parentView
 * @constructor
 */
function DeleteAction( parentView ) {
    _.superClass( DeleteAction, this, parentView );
}

_.inherit( DeleteAction, BaseAction );

_.extend( DeleteAction.prototype, baseFallibleActionMixin, {

    /**
     *
     * @param callback
     */
    execute: function( callback ) {
        var accept = this.getProperty( 'accept' );
        var that = this;
        var dataSource = this.getProperty( 'destinationSource' );
        var property = this.getProperty( 'destinationProperty' );
        var acceptMessage = this.getProperty( 'acceptMessage' ) || localized.strings.DeleteAction.warnMessage;
        var acceptMessageType = this.getProperty( 'acceptMessageType' ) || 'default';

        if( dataSource.getProperty( property ) ) {
            if( accept ) {
                new MessageBox( {
                    text: acceptMessage,
                    type: acceptMessageType,
                    buttons: [
                        {
                            name: localized.strings.DeleteAction.agree,
                            type: 'action',
                            onClick: function() {
                                that.remove( callback );
                            }
                        },
                        {
                            name: localized.strings.DeleteAction.disagree
                        }
                    ]
                } );
            } else {
                this.remove( callback );
            }
        } else {
            new MessageBox( {
                text: localized.strings.DeleteAction.warnMessageNoItem,
                type: 'error',
                buttons: [
                    {
                        name: localized.strings.DeleteAction.cancel
                    }
                ]
            } );
        }
    },

    /**
     *
     * @param callback
     */
    remove: function( callback ) {
        var dataSource = this.getProperty( 'destinationSource' );
        var property = this.getProperty( 'destinationProperty' );

        if( this._isRootElementPath( property ) ) {
            this._deleteDocument( dataSource, property, callback );
        } else {
            this._deleteArrayElement( dataSource, property, callback );
        }
    },

    /**
     *
     * @param dataSource
     * @param property
     * @param callback
     * @private
     */
    _deleteDocument: function( dataSource, property, callback ) {
        var that = this;
        var onSuccessDelete = function( context, args ) {
            dataSource.updateItems();

            that.onExecutedHandler( args );
            that.onSuccessHandler( args );

            if( typeof callback === 'function' ) {
                callback();
            }
        };
        var onErrorDelete = function( context, args ) {
            that.onExecutedHandler( args );
            that.onErrorHandler( args );

            if( typeof callback === 'function' ) {
                callback();
            }
        };
        var selectedItem = dataSource.getProperty( property );

        dataSource.deleteItem( selectedItem, onSuccessDelete, onErrorDelete );
    },

    /**
     *
     * @param dataSource
     * @param {string} property
     * @param callback
     * @private
     */
    _deleteArrayElement: function( dataSource, property, callback ) {
        var propertyPathList = property.split( '.' );
        var index = propertyPathList.pop();
        var parentProperty = propertyPathList.join( '.' );
        var items = dataSource.getProperty( parentProperty );

        items = _.clone( items );
        items.splice( index, 1 );
        dataSource.setProperty( parentProperty, items );

        this.onExecutedHandler();
        this.onSuccessHandler();

        if( typeof callback === 'function' ) {
            callback();
        }
    }

} );

InfinniUI.DeleteAction = DeleteAction;
