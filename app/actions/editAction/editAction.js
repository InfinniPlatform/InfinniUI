/**
 *
 * @param parentView
 * @constructor
 */
function EditAction( parentView ) {
    _.superClass( EditAction, this, parentView );
}

_.inherit( EditAction, BaseEditAction );

_.extend( EditAction.prototype, {

    /**
     *
     * @returns {boolean}
     */
    setSelectedItem: function() {
        var editDataSource = this.getProperty( 'editDataSource' );
        var destinationDataSource = this.getProperty( 'destinationDataSource' );
        var destinationProperty = this.getProperty( 'destinationProperty' );
        var selectedItem = destinationDataSource.getProperty( destinationProperty );

        if( selectedItem === null || typeof selectedItem === 'undefined' ) {
            // if selectedItem is empty and it is must be document
            // return error
            if( this._isRootElementPath( destinationProperty ) ) {
                var logger = InfinniUI.global.logger;
                var message = stringUtils.format( 'EditAction: edit item has not been found. {0} does not have item by path "{1}"', [ destinationDataSource.getName(), destinationProperty ] );
                logger.error( message );

                return false;
            }

            // but if selectedItem is property of document
            // it will be created
            selectedItem = selectedItem || {};
        }

        if( this._isObjectDataSource( editDataSource ) ) {
            this._setItem( editDataSource, selectedItem );
        } else {
            this._setDocument( editDataSource, selectedItem );
        }

        return true;
    },

    /**
     *
     * @private
     */
    _resumeUpdateEditDataSource: function() {
        var editDataSource = this.getProperty( 'editDataSource' );

        editDataSource.resumeUpdate( 'BaseEditAction' );
    },

    /**
     *
     * @param editDataSource
     * @param selectedItem
     * @private
     */
    _setDocument: function( editDataSource, selectedItem ) {
        var selectedItemId = editDataSource.idOfItem( selectedItem );

        editDataSource.setIdFilter( selectedItemId );
        editDataSource.tryInitData();
        this._resumeUpdateEditDataSource();
    },

    /**
     *
     * @param editDataSource
     * @param selectedItem
     * @private
     */
    _setItem: function( editDataSource, selectedItem ) {
        var item = _.clone( selectedItem );

        if( typeof item === 'undefined' || item === null ) {
            item = {};
        }
        this._resumeUpdateEditDataSource();
        editDataSource.setItems( [ item ] );
        editDataSource.setSelectedItem( item );
    },

    /**
     * save item in destination data source
     */
    save: function() {
        var editDataSource = this.getProperty( 'editDataSource' );
        var destinationDataSource = this.getProperty( 'destinationDataSource' );
        var destinationProperty = this.getProperty( 'destinationProperty' );

        if( this._isObjectDataSource( editDataSource ) ) {
            var editedItem = editDataSource.getSelectedItem();
            var originItem = destinationDataSource.getProperty( destinationProperty );

            if( this._isRootElementPath( destinationProperty ) ) {
                this._overrideOriginItem( originItem, editedItem );
                destinationDataSource._includeItemToModifiedSet( originItem );
                destinationDataSource.saveItem( originItem, function() {
                    destinationDataSource.updateItems();
                } );
            } else {
                destinationDataSource.setProperty( destinationProperty, editedItem );
            }

        } else {
            destinationDataSource.updateItems();
        }
    },

    /**
     *
     * @param originItem
     * @param newItem
     * @private
     */
    _overrideOriginItem: function( originItem, newItem ) {
        var property;

        for( property in originItem ) {
            delete originItem[ property ];
        }

        for( property in newItem ) {
            originItem[ property ] = _.clone( newItem[ property ] );
        }
    }

} );

InfinniUI.EditAction = EditAction;
