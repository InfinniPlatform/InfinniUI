/**
 * @constructor
 * @augments Backbone.Model
 */
var BaseDataSource = Backbone.Model.extend( {

    defaults: {
        name: null,
        idProperty: '_id',
        identifyingMode: 'byId', // byId, byLink. detect automatically

        view: null,

        isDataReady: false,

        dataProvider: null,

        /*
         * TreeModel for handling
         * model.items
         * model.selectedItem
         * */
        model: null,

        modifiedItems: {},
        itemsById: {},

        fillCreatedItem: true,

        suspendingList: null, // []

        waitingOnUpdateItemsHandlers: null, //[]

        errorValidator: null,

        isRequestInProcess: false,

        isLazy: true,

        isWaiting: false,

        resolvePriority: 0,

        newItemsHandler: null,

        isNumRegEx: /^\d/

    },

    /**
     *
     */
    initialize: function() {
        var view = this.get( 'view' );
        var modelStartTree = {
            items: null,
            selectedItem: null
        };

        this.initDataProvider();

        if( !view ) {
            throw new Error( 'BaseDataSource.initialize: При создании объекта не была задана view.' );
        }
        this.set( 'suspendingList', [] );
        this.set( 'waitingOnUpdateItemsHandlers', [] );
        this.set( 'model', new TreeModel( view.getContext(), this, modelStartTree ) );

        _.extend( this, BaseDataSource.identifyingStrategy.byId );
    },

    /**
     *
     */
    initDataProvider: function() {
        throw new Error( 'BaseDataSource.initDataProvider В потомке BaseDataSource не задан провайдер данных.' );
    },

    /**
     *
     * @returns {*}
     */
    getSearch: function() {
        return this.get( 'model' ).getProperty( 'search' );
    },

    /**
     *
     * @param searchStr
     */
    setSearch: function( searchStr ) {
        this.get( 'model' ).setProperty( 'search', searchStr );
    },

    /**
     *
     * @returns {*}
     */
    getFilter: function() {
        return this.get( 'model' ).getProperty( 'filter' );
    },

    /**
     *
     * @param filter
     */
    setFilter: function( filter ) {
        this.get( 'model' ).setProperty( 'filter', filter );
    },

    /**
     *
     * @param propertyName
     * @returns {*}
     */
    getFilterParams: function( propertyName ) {
        if( arguments.length === 0 ) {
            propertyName = 'filterParams';
        } else {
            if( propertyName == '' ) {
                propertyName = 'filterParams';
            } else {
                propertyName = 'filterParams.' + propertyName;
            }
        }

        return this.get( 'model' ).getProperty( propertyName );
    },

    /**
     *
     * @param propertyName
     * @param value
     */
    setFilterParams: function( propertyName, value ) {
        if( arguments.length === 1 ) {
            value = propertyName;
            propertyName = 'filterParams';
        } else {
            if( propertyName == '' ) {
                propertyName = 'filterParams';
            } else {
                propertyName = 'filterParams.' + propertyName;
            }
        }

        this.get( 'model' ).setProperty( propertyName, value );
    },

    /**
     *
     * @param property
     * @param handler
     * @param owner
     * @returns {*}
     */
    onPropertyChanged: function( property, handler, owner ) {
        if( typeof property === 'function' ) {
            owner = handler;
            handler = property;
            property = '*';
        }

        if( property.charAt( 0 ) == '.' ) {
            property = property.substr( 1 );
        } else {
            if( property == '' ) {
                property = 'items';
            } else {
                property = 'items.' + property;
            }
        }

        return this.get( 'model' ).onPropertyChanged( property, function( context, args ) {
            var property = args.property;

            if( property.substr( 0, 6 ) === 'items.' ) {
                property = property.substr( 6 );
            } else if( property === 'items' ) {
                property = '';
            } else {
                property = '.' + property;
            }

            args.property = property;

            handler( context, args );
        }, owner );
    },

    /**
     *
     * @param propertyName
     * @param bindId
     */
    offPropertyChanged: function( propertyName, bindId ) {

        if( propertyName.charAt( 0 ) === '.' ) {
            propertyName = propertyName.substr( 1 );
        } else {
            if( propertyName == '' ) {
                propertyName = 'items';
            } else {
                propertyName = 'items.' + propertyName;
            }
        }

        this.get( 'model' ).offPropertyChanged( propertyName, bindId );
    },

    /**
     *
     */
    remove: function() {
        this.off();
        this.clear();
    },

    /**
     *
     * @param handler
     * @param owner
     */
    onSelectedItemChanged: function( handler, owner ) {
        var that = this;

        this.get( 'model' ).onPropertyChanged( 'selectedItem', function( context, args ) {
            var argument = that._getArgumentTemplate();
            argument.value = args.newValue;

            handler( context, argument );
        }, owner );
    },

    /**
     *
     * @param handler
     * @param subscriptionContext
     */
    onErrorValidator: function( handler, subscriptionContext ) {
        this.on( 'onErrorValidator', handler, subscriptionContext );
    },

    /**
     *
     * @param subscriptionContext
     */
    offErrorValidator: function( subscriptionContext ) {
        this.off( null, null, subscriptionContext );
    },

    /**
     *
     * @param handler
     */
    onItemSaved: function( handler ) {
        this.on( 'onItemSaved', handler );
    },

    /**
     *
     * @param handler
     */
    onItemCreated: function( handler ) {
        this.on( 'onItemCreated', handler );
    },

    /**
     *
     * @param handler
     */
    onItemsUpdated: function( handler ) {
        this.on( 'onItemsUpdated', handler );
    },

    /**
     *
     * @param handler
     */
    onItemsUpdatedOnce: function( handler ) {
        this.once( 'onItemsUpdated', handler );
    },

    /**
     *
     * @param handler
     */
    onItemDeleted: function( handler ) {
        this.on( 'onItemDeleted', handler );
    },

    /**
     *
     * @param handler
     */
    onProviderError: function( handler ) {
        this.off( 'onProviderError' );
        this.on( 'onProviderError', handler );

        this.onProviderErrorHandler = handler;
    },

    /**
     *
     * @returns {*}
     */
    getName: function() {
        return this.get( 'name' );
    },

    /**
     *
     * @param name
     */
    setName: function( name ) {
        this.set( 'name', name );
        this.name = name;
    },

    /**
     *
     * @returns {*}
     */
    getView: function() {
        return this.get( 'view' );
    },

    /**
     *
     * @param property
     * @returns {*}
     */
    getProperty: function( property ) {
        var firstChar = property.charAt( 0 );
        var indexOfSelectedItem;

        if( this.get( 'isNumRegEx' ).test( firstChar ) ) {
            property = 'items.' + property;
        } else if( firstChar == '' ) {
            property = 'items';
        } else if( firstChar === '$' ) {
            indexOfSelectedItem = this._indexOfSelectedItem();
            if( indexOfSelectedItem == -1 ) {
                return undefined;
            }
            property = 'items.' + indexOfSelectedItem + property.substr( 1 );
        } else if( firstChar === '.' ) {
            property = property.substr( 1 );
        } else {
            indexOfSelectedItem = this._indexOfSelectedItem();
            if( indexOfSelectedItem == -1 ) {
                return undefined;
            }
            property = 'items.' + indexOfSelectedItem + '.' + property;
        }

        return this.get( 'model' ).getProperty( property );
    },

    /**
     *
     * @param property
     * @param value
     */
    setProperty: function( property, value ) {
        var propertyPaths = property.split( '.' );
        var firstChar;
        var indexOfSelectedItem;
        var resultOfSet;

        if( propertyPaths[ 0 ] === '$' ) {
            indexOfSelectedItem = this._indexOfSelectedItem();
            if( indexOfSelectedItem === -1 ) {
                return;
            }

            property = indexOfSelectedItem + property.substr( 1 );
            propertyPaths[ 0 ] = indexOfSelectedItem.toString();
        }

        firstChar = property.charAt( 0 );

        if( propertyPaths.length === 1 ) {
            if( propertyPaths[ 0 ] === '' ) {
                this._setItems( value );
            } else if( this.get( 'isNumRegEx' ).test( propertyPaths[ 0 ] ) ) {
                this._changeItem( propertyPaths[ 0 ], value );
            } else {
                indexOfSelectedItem = this._indexOfSelectedItem();
                if( indexOfSelectedItem === -1 ) {
                    return;
                }
                property = 'items.' + indexOfSelectedItem + '.' + property;
                resultOfSet = this.get( 'model' ).setProperty( property, value );

                if( resultOfSet ) {
                    this._includeItemToModifiedSetByIndex( indexOfSelectedItem );
                }
            }
        } else {
            if( firstChar === '.' ) {
                property = property.substr( 1 );
                this.get( 'model' ).setProperty( property, value );

            } else if( this.get( 'isNumRegEx' ).test( firstChar ) ) {
                property = 'items.' + property;
                resultOfSet = this.get( 'model' ).setProperty( property, value );

                if( resultOfSet ) {
                    this._includeItemToModifiedSetByIndex( parseInt( propertyPaths[ 0 ] ) );
                }
            } else {
                indexOfSelectedItem = this._indexOfSelectedItem();
                if( indexOfSelectedItem === -1 ) {
                    return;
                }
                property = 'items.' + indexOfSelectedItem + '.' + property;
                resultOfSet = this.get( 'model' ).setProperty( property, value );

                if( resultOfSet ) {
                    this._includeItemToModifiedSetByIndex( indexOfSelectedItem );
                }
            }
        }
    },

    /**
     *
     * @param items
     * @private
     */
    _setItems: function( items ) {
        this._detectIdentifyingMode( items );

        var indexOfItemsById;

        this.set( 'isDataReady', true );
        this.get( 'model' ).setProperty( 'items', items );
        this._clearModifiedSet();

        if( items && items.length > 0 ) {
            indexOfItemsById = this._indexItemsById( items );
            this.set( 'itemsById', indexOfItemsById );

            if( !this._restoreSelectedItem() ) {
                this.setSelectedItem( items[ 0 ] );
            }
        } else {
            this.setSelectedItem( null );
        }
    },

    /**
     *
     * @private
     */
    _restoreSelectedItem: function() {
        // override by strategy
        var logger = InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._restoreSelectedItem: not overrided by strategy',
            source: this
        } );
    },

    /**
     *
     * @returns {*}
     */
    getSelectedItem: function() {
        return this.get( 'model' ).getProperty( 'selectedItem' );
    },

    /**
     *
     * @param item
     * @param success
     * @param error
     */
    setSelectedItem: function( item, success, error ) {
        // override by strategy
        var logger = InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource.setSelectedItem: not overrided by strategy',
            source: this
        } );
    },

    /**
     *
     * @param item
     * @param successHandler
     * @private
     */
    _notifyAboutSelectedItem: function( item, successHandler ) {
        var context = this.getContext();
        var argument = this._getArgumentTemplate();

        argument.value = item;

        if( successHandler ) {
            successHandler( context, argument );
        }
    },

    /**
     *
     * @param index
     * @private
     */
    _tuneMirroringOfModel: function( index ) {
        if( index != -1 ) {
            this.get( 'model' ).setMirroring( 'items.$', 'items.' + index );
        } else {
            this.get( 'model' ).setMirroring( null, null );
        }
    },

    /**
     *
     * @returns {*}
     */
    getIdProperty: function() {
        return this.get( 'idProperty' );
    },

    /**
     *
     * @param value
     */
    setIdProperty: function( value ) {
        this.set( 'idProperty', value );
    },

    /**
     *
     * @returns {*}
     */
    getFillCreatedItem: function() {
        return this.get( 'fillCreatedItem' );
    },

    /**
     *
     * @param fillCreatedItem
     */
    setFillCreatedItem: function( fillCreatedItem ) {
        this.set( 'fillCreatedItem', fillCreatedItem );
    },

    /**
     *
     * @param name
     */
    suspendUpdate: function( name ) {
        var reason = name || 'default';
        var suspended = this.get( 'suspendingList' );

        if( suspended.indexOf( reason ) === -1 ) {
            suspended = suspended.slice( 0 );
            suspended.push( reason );
            this.set( 'suspendingList', suspended );
        }
    },

    /**
     *
     * @param name
     */
    resumeUpdate: function( name ) {
        var reason = name || 'default';
        var suspended = this.get( 'suspendingList' );
        var index = suspended.indexOf( reason );

        if( index !== -1 ) {
            suspended = suspended.slice( 0 );
            suspended.splice( index, 1 );
            this.set( 'suspendingList', suspended );

            // если источник полностью разморожен, а до этого вызывались updateItems, не выполненные из-за заморозки,
            // нужно вызвать updateItems
            if( !this.isUpdateSuspended() && this.get( 'waitingOnUpdateItemsHandlers' ).length > 0 ) {
                // waitingOnUpdateItemsHandlers будут вызваны в _notifyAboutItemsUpdated
                // или _onErrorProviderUpdateItemsHandle
                this.updateItems();
            }
        }
    },

    /**
     *
     * @returns {boolean}
     */
    isUpdateSuspended: function() {
        var suspended = this.get( 'suspendingList' );
        return suspended.length > 0;
    },

    /**
     *
     * @returns {*}
     */
    isModifiedItems: function() {
        return this.isModified();
    },

    /**
     *
     * @param item
     * @returns {boolean}
     */
    isModified: function( item ) {
        if( arguments.length === 0 ) {
            return _.size( this.get( 'modifiedItems' ) ) > 0;
        }

        if( item === null || typeof item === 'undefined' ) {
            return false;
        }
        else {
            var itemId = this.idOfItem( item );
            return itemId in this.get( 'modifiedItems' );
        }
    },

    /**
     *
     * @param index
     * @private
     */
    _includeItemToModifiedSetByIndex: function( index ) {
        var item;

        item = this.getItems()[ index ];
        this._includeItemToModifiedSet( item );
    },

    /**
     *
     * @param item
     * @private
     */
    _includeItemToModifiedSet: function( item ) {
        // override by strategy
        var logger = InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._includeItemToModifiedSet: not overrided by strategy',
            source: this
        } );
    },

    /**
     *
     * @param item
     * @private
     */
    _excludeItemFromModifiedSet: function( item ) {
        // override by strategy
        var logger = InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._excludeItemFromModifiedSet: not overrided by strategy',
            source: this
        } );
    },

    /**
     *
     * @private
     */
    _clearModifiedSet: function() {
        this.set( 'modifiedItems', {} );
    },

    /**
     * @description Проверяет формат имя свойства атрибута
     * @param propertyName
     * @private
     */
    _checkPropertyName: function( propertyName ) {
        var result = true;

        try {
            if( propertyName && propertyName.length > 0 ) {
                result = propertyName.match( /^[\$#@\d]+/ );
            }
            if( !result ) {
                throw new Error( 'Wrong property name "' + propertyName + '"' );
            }
        } catch( e ) {
            console.debug( e );
        }
    },

    /**
     *
     * @param index
     * @param value
     * @private
     */
    _changeItem: function( index, value ) {
        var item = this.get( 'model' ).getProperty( 'items.' + index );
        var isSelectedItem = ( item == this.getSelectedItem() );
        var idProperty = this.get( 'idProperty' );
        var indexedItemsById = this.get( 'itemsById' );

        if( value == item ) {
            return;
        }

        this._excludeItemFromModifiedSet( item );
        delete indexedItemsById[ item[ idProperty ] ];

        this.get( 'model' ).setProperty( 'items.' + index, value );

        this._includeItemToModifiedSet( value );
        indexedItemsById[ value[ idProperty ] ] = value;
        this.set( 'itemsById', indexedItemsById );

        if( isSelectedItem ) {
            this.get( 'model' ).setProperty( 'selectedItem', value );
        }
    },

    /**
     *
     */
    tryInitData: function() {
        if( !this.get( 'isDataReady' ) && !this.get( 'isRequestInProcess' ) ) {
            this.updateItems();
        }
    },

    /**
     *
     * @param item
     * @param success
     * @param error
     */
    saveItem: function( item, success, error ) {
        var dataProvider = this.get( 'dataProvider' );
        var that = this;
        var validateResult;

        if( !this.isModified( item ) ) {
            this._notifyAboutItemSaved( { item: item, result: null }, 'notModified' );
            that._executeCallback( success, { item: item, validationResult: new ValidationResult() } );
            return;
        }

        validateResult = this.getValidationResult( item );
        if( !validateResult.IsValid ) {
            this._notifyAboutValidation( validateResult );
            this._executeCallback( error, { item: item, validationResult: validateResult } );
            return;
        }

        dataProvider.saveItem( item, function( data ) {
            that._excludeItemFromModifiedSet( item );
            that._notifyAboutItemSaved( { item: item, result: data.data }, 'modified' );
            that._executeCallback( success, {
                item: item,
                validationResult: that._extractValidationResult( data ),
                originalResponse: data
            } );
        }, function( data ) {
            var result = that._extractValidationResult( data );

            that._executeCallback( error, { item: item, validationResult: result, originalResponse: data } );
            that._onServerErrorHandler( {
                response: data,
                validationResult: result,
                item: item
            } );
        } );
    },

    /**
     *
     * @param data
     * @returns {*}
     * @private
     */
    _extractValidationResult: function( data ) {
        if( data.data && data.data.responseJSON && data.data.responseJSON[ 'Result' ] ) {
            return data.data.responseJSON[ 'Result' ][ 'ValidationResult' ];
        }

        return data.data && data.data[ 'Result' ] && data.data[ 'Result' ][ 'ValidationResult' ];
    },

    /**
     *
     * @param callback
     * @param args
     * @private
     */
    _executeCallback: function( callback, args ) {
        if( callback ) {
            callback( this.getContext(), args );
        }
    },

    /**
     *
     * @param data
     * @param result
     * @private
     */
    _notifyAboutItemSaved: function( data, result ) {
        var context = this.getContext();
        var argument = this._getArgumentTemplate();

        argument.value = data;
        argument.result = result;

        this.trigger( 'onItemSaved', context, argument );
    },

    /**
     *
     * @param item
     * @param success
     * @param error
     */
    deleteItem: function( item, success, error ) {
        var dataProvider = this.get( 'dataProvider' );
        var that = this;
        var itemId = this.idOfItem( item );
        var isItemInSet = typeof this.get( 'itemsById' )[ itemId ] !== 'undefined';

        if( ( item === null || typeof item === 'undefined' ) || ( typeof itemId !== 'undefined' && !isItemInSet ) ) {
            this._notifyAboutMissingDeletedItem( item, error );
            return;
        }

        this.beforeDeleteItem( item );

        dataProvider.deleteItem( item, function( data ) {
            that._handleDeletedItem( item );
            that._executeCallback( success, {
                item: item,
                validationResult: that._extractValidationResult( data ),
                originalResponse: data
            } );
        }, function( data ) {
            var result = that._extractValidationResult( data );

            that._executeCallback( error, { item: item, validationResult: result, originalResponse: data } );
            that._onServerErrorHandler( {
                response: data,
                validationResult: result,
                item: item
            } );
        } );
    },

    /**
     *
     * @param params
     * @private
     */
    _onServerErrorHandler: function( params ) {
        var validationResult = params.validationResult;
        var context = this.getContext();

        if( validationResult && validationResult.Items ) {
            this._notifyAboutValidation( validationResult );
        } else {
            this.trigger( 'onProviderError', context, { item: params.item, data: params.response } );
        }
    },

    /**
     *
     * @param item
     */
    beforeDeleteItem: function( item ) {
    },

    /**
     *
     * @param item
     * @private
     */
    _handleDeletedItem: function( item ) {
        // override by strategy
        var logger = InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._handleDeletedItem: not overrided by strategy',
            source: this
        } );
    },

    /**
     *
     * @param item
     * @param successHandler
     * @private
     */
    _notifyAboutItemDeleted: function( item, successHandler ) {
        var context = this.getContext();
        var argument = this._getArgumentTemplate();

        argument.value = item;

        this.trigger( 'onItemDeleted', context, argument );
    },

    /**
     *
     * @param item
     * @param errorHandler
     * @private
     */
    _notifyAboutMissingDeletedItem: function( item, errorHandler ) {
        var context = this.getContext();
        var argument = this._getArgumentTemplate();

        argument.value = item;
        argument.error = {
            message: 'Нельзя удалить элемент, которого нет текущем наборе источника данных'
        };

        if( errorHandler ) {
            errorHandler( context, argument );
        }
    },

    /**
     *
     * @returns {*}
     */
    isDataReady: function() {
        return this.get( 'isDataReady' );
    },

    /**
     *
     * @returns {*}
     */
    getItems: function() {
        var logger = InfinniUI.global.logger;

        if( !this.isDataReady() ) {
            logger.warn( {
                message: 'BaseDataSource: Попытка получить данные источника данных (' + this.get( 'name' ) + '), до того как он был проинициализирован данными',
                source: this
            } );
        }

        return this.get( 'model' ).getProperty( 'items' );
    },

    /**
     *
     * @param onSuccess
     * @param onError
     */
    updateItems: function( onSuccess, onError ) {
        if( !this.isUpdateSuspended() ) {
            var dataProvider = this.get( 'dataProvider' );
            var that = this;

            this.set( 'isRequestInProcess', true );
            dataProvider.getItems(
                function( data ) {
                    that._handleSuccessUpdateItemsInProvider( data, onSuccess );
                },
                function( data ) {
                    var context = that.getContext();
                    that._onErrorProviderUpdateItemsHandle( data, onError );
                    that.trigger( 'onProviderError', context, { data: data } );
                }
            );

        } else {
            var handlers = this.get( 'waitingOnUpdateItemsHandlers' );
            handlers.push( {
                onSuccess: onSuccess,
                onError: onError
            } );
        }
        //devblockstart
        InfinniUI.global.messageBus.send( 'updateItems', { dataSource: this } );
        //devblockstop
    },

    /**
     *
     * @param data
     * @param callback
     * @private
     */
    _handleSuccessUpdateItemsInProvider: function( data, callback ) {
        var that = this;
        var isWaiting = that.get( 'isWaiting' );
        var finishUpdating = function() {
            that.set( 'isRequestInProcess', false );
            that._handleUpdatedItemsData( data.data, callback );
        };

        if( isWaiting ) {
            that.once( 'change:isWaiting', function() {
                finishUpdating();
            } );
        } else {
            finishUpdating();
        }
    },

    /**
     *
     * @param data
     * @param callback
     * @private
     */
    _onErrorProviderUpdateItemsHandle: function( data, callback ) {
        var handlers = this.get( 'waitingOnUpdateItemsHandlers' );
        var context = this.getContext();

        // вызываем обработчики которые были переданы на отложенных updateItems (из-за замороженного источника)
        for( var i = 0, ii = handlers.length; i < ii; i++ ) {
            if( handlers[ i ].onError ) {
                handlers[ i ].onError( context, data );
            }
        }

        this.set( 'waitingOnUpdateItemsHandlers', [] );

        if( typeof callback === 'function' ) {
            callback( context, data );
        }
    },

    /**
     *
     * @param value
     */
    setIsWaiting: function( value ) {
        this.set( 'isWaiting', value );
    },

    /**
     *
     * @param itemsData
     * @param callback
     * @private
     */
    _handleUpdatedItemsData: function( itemsData, callback ) {
        if( this.get( 'newItemsHandler' ) ) {
            itemsData = this.get( 'newItemsHandler' )( itemsData );
        }

        this._setItems( itemsData );
        this._notifyAboutItemsUpdated( itemsData, callback );
    },

    /**
     *
     * @param itemsData
     * @param callback
     * @private
     */
    _notifyAboutItemsUpdated: function( itemsData, callback ) {
        var context = this.getContext();
        var argument = {
            value: itemsData,
            source: this
        };

        // вызываем обработчики которые были переданы на отложенных updateItems (из за замороженного источника)
        var handlers = this.get( 'waitingOnUpdateItemsHandlers' );

        for( var i = 0, ii = handlers.length; i < ii; i++ ) {
            if( handlers[ i ].onSuccess ) {
                handlers[ i ].onSuccess( context, argument );
            }
        }

        this.set( 'waitingOnUpdateItemsHandlers', [] );

        if( callback ) {
            callback( context, argument );
        }

        this.trigger( 'onItemsUpdated', context, argument );
    },

    /**
     *
     * @param itemsData
     * @private
     */
    _notifyAboutItemsUpdatedAsPropertyChanged: function( itemsData ) {
        var context = this.getContext();
        var argument = this._getArgumentTemplate();

        argument.property = '';
        argument.newValue = itemsData;
        argument.oldValue = null;

        this.trigger( 'onPropertyChanged', context, argument );
        this.trigger( 'onPropertyChanged:', context, argument );
    },

    /**
     *
     * @param success
     * @param error
     */
    createItem: function( success, error ) {
        var dataProvider = this.get( 'dataProvider' );
        var idProperty = this.get( 'idProperty' );
        var that = this;
        var localItem;

        if( this.get( 'fillCreatedItem' ) ) {
            dataProvider.createItem(
                function( item ) {
                    that._handleDataForCreatingItem( item, success );
                },
                idProperty
            );
        } else {
            localItem = dataProvider.createLocalItem( idProperty );
            this._handleDataForCreatingItem( localItem, success );
        }
    },

    /**
     *
     * @param itemData
     * @param successHandler
     * @private
     */
    _handleDataForCreatingItem: function( itemData, successHandler ) {
        var items = this.getItems();

        if( items ) {
            items = items.slice();
            items.push( itemData );
        } else {
            items = [ itemData ];
        }

        this._setItems( items );
        this._includeItemToModifiedSet( itemData );
        this.setSelectedItem( itemData );
        this._notifyAboutItemCreated( itemData, successHandler );
    },

    /**
     *
     * @param createdItem
     * @param successHandler
     * @private
     */
    _notifyAboutItemCreated: function( createdItem, successHandler ) {
        var context = this.getContext();
        var argument = {
            value: createdItem
        };

        if( successHandler ) {
            successHandler( context, argument );
        }
        this.trigger( 'onItemCreated', context, argument );
    },

    /**
     *
     * @param criteriaList
     * @param onSuccess
     * @param onError
     * @private
     */
    _setCriteriaList: function( criteriaList, onSuccess, onError ) {
        this.set( 'criteriaList', criteriaList );
        this.updateItems( onSuccess, onError );
    },

    /**
     *
     * @param itemId
     */
    setIdFilter: function( itemId ) {
        var dataProvider = this.get( 'dataProvider' );
        var idFilter = dataProvider.createIdFilter( itemId );

        this.setFilter( idFilter );
    },

    /**
     *
     * @param handler
     */
    setNewItemsHandler: function( handler ) {
        this.set( 'newItemsHandler', handler );
    },

    /**
     *
     * @returns {*}
     */
    getErrorValidator: function() {
        return this.get( 'errorValidator' );
    },

    /**
     *
     * @param validatingFunction
     */
    setErrorValidator: function( validatingFunction ) {
        this.set( 'errorValidator', validatingFunction );
    },

    /**
     *
     * @param item
     * @returns {ValidationResult}
     */
    getValidationResult: function( item ) {
        var validatingFunction = this.getErrorValidator();
        var result = new ValidationResult();
        var isCheckingOneItem = !!item;
        var context = this.getContext();
        var items, subResult;

        if( validatingFunction ) {
            if( isCheckingOneItem ) {

                result = validatingFunction( context, item );

            } else {

                items = this.getItems();
                for( var i = 0, ii = items.length; i < ii; i++ ) {

                    subResult = validatingFunction( context, items[ i ] );
                    if( !subResult.IsValid ) {
                        this._addIndexToPropertiesOfValidationMessage( subResult.Items, i );
                        result.IsValid = false;
                        result.Items = _.union( result.Items, subResult.Items );
                    }

                }

            }
        }

        return result;
    },

    /**
     *
     * @param fileProvider
     */
    setFileProvider: function( fileProvider ) {
        this.set( 'fileProvider', fileProvider );
    },

    /**
     *
     * @returns {*}
     */
    getFileProvider: function() {
        return this.get( 'fileProvider' );
    },

    /**
     *
     * @param validationMessages
     * @param index
     * @private
     */
    _addIndexToPropertiesOfValidationMessage: function( validationMessages, index ) {
        for( var i = 0, ii = validationMessages.length; i < ii; i++ ) {
            validationMessages[ i ].property = index + '.' + validationMessages[ i ].property;
        }
    },

    /**
     *
     * @param validationResult
     * @private
     */
    _notifyAboutValidation: function( validationResult ) {
        if( !validationResult ) {
            return;
        }

        var context = this.getContext();
        var argument = {
            value: validationResult
        };

        this.trigger( 'onErrorValidator', context, argument );
    },

    /**
     *
     * @returns {*}
     */
    getContext: function() {
        return this.getView().getContext();
    },

    /**
     *
     * @param items
     * @returns {*}
     * @private
     */
    _indexItemsById: function( items ) {
        var idProperty = this.get( 'idProperty' );
        var result = {};
        var idValue;

        for( var i = 0, ii = items.length; i < ii; i++ ) {
            idValue = items[ i ][ idProperty ];
            result[ idValue ] = items[ i ];
        }

        return result;
    },

    /**
     *
     * @param item
     * @returns {*}
     * @private
     */
    _indexOfItem: function( item ) {
        var items = this.getItems();

        if( !items ) {
            return -1;
        }
        return items.indexOf( item );
    },

    /**
     *
     * @returns {*}
     * @private
     */
    _indexOfSelectedItem: function() {
        var selectedItem = this.getSelectedItem();

        return this._indexOfItem( selectedItem );
    },

    /**
     *
     * @param item
     * @returns {*}
     */
    idOfItem: function( item ) {
        var idProperty = this.get( 'idProperty' );

        if( !item ) {
            return undefined;
        }
        return item[ idProperty ];
    },

    /**
     *
     * @returns {*}
     */
    getCurrentRequestPromise: function() {
        var promise = $.Deferred();
        var logger = InfinniUI.global.logger;

        if( this.get( 'isRequestInProcess' ) ) {
            this.onItemsUpdatedOnce( function() {
                if( this.isDataReady() ) {
                    promise.resolve();
                } else {
                    logger.warn( {
                        message: 'BaseDataSource: strange, expected other dataReady status',
                        source: this
                    } );
                }
            } );
        } else {
            promise.resolve();
        }

        return promise;
    },

    /**
     *
     * @returns {*}
     */
    getNearestRequestPromise: function() {
        var promise = $.Deferred();

        this.onItemsUpdatedOnce( function() {
            if( this.isDataReady() ) {
                promise.resolve();
            } else {
                logger.warn( {
                    message: 'BaseDataSource: strange, expected other dataReady status',
                    source: this
                } );
            }
        } );

        return promise;
    },

    /**
     *
     * @param isLazy
     */
    setIsLazy: function( isLazy ) {
        this.set( 'isLazy', isLazy );
    },

    /**
     *
     * @returns {*}
     */
    isLazy: function() {
        return this.get( 'isLazy' );
    },

    /**
     *
     * @param priority
     */
    setResolvePriority: function( priority ) {
        this.set( 'resolvePriority', priority );
    },

    /**
     *
     * @returns {*}
     */
    getResolvePriority: function() {
        return this.get( 'resolvePriority' );
    },

    /**
     *
     * @param currentObject
     * @private
     * @returns {*}
     */
    _copyObject: function( currentObject ) {
        return JSON.parse( JSON.stringify( currentObject ) );
    },

    /**
     *
     * @returns {{source: BaseDataSource}}
     * @private
     */
    _getArgumentTemplate: function() {
        return {
            source: this
        };
    },

    /**
     *
     * @param items
     * @private
     */
    _detectIdentifyingMode: function( items ) {
        if( Array.isArray( items ) && items.length > 0 ) {
            if( !$.isPlainObject( items[ 0 ] ) || this.getIdProperty() in items[ 0 ] ) {
                this.set( 'identifyingMode', 'byId' );
                _.extend( this, BaseDataSource.identifyingStrategy.byId );
            } else {
                this.set( 'identifyingMode', 'byLink' );
                _.extend( this, BaseDataSource.identifyingStrategy.byLink );
            }
        } else {
            this.set( 'identifyingMode', 'byId' );
            _.extend( this, BaseDataSource.identifyingStrategy.byId );
        }
    },

    /**
     *
     * @private
     * @returns {*}
     */
    _getIdentifyingMode: function() {
        return this.get( 'identifyingMode' );
    }

} );

BaseDataSource.identifyingStrategy = {

    byId: {

        /**
         *
         * @returns {boolean}
         * @private
         */
        _restoreSelectedItem: function() {
            var selectedItem = this.getSelectedItem();
            var selectedItemId = this.idOfItem( selectedItem );

            if( selectedItemId !== null && typeof selectedItemId !== 'undefined' ) {
                var items = this.get( 'itemsById' );
                var newSelectedItem = items[ selectedItemId ];

                if( newSelectedItem !== null && typeof newSelectedItem !== 'undefined' ) {
                    this.setSelectedItem( newSelectedItem );
                    return true;
                }
            }

            return false;
        },

        /**
         *
         * @param item
         * @param success
         * @param error
         */
        setSelectedItem: function( item, success, error ) {
            var currentSelectedItem = this.getSelectedItem();
            var items = this.get( 'itemsById' );
            var itemId = this.idOfItem( item );
            var index;

            if( typeof item == 'undefined' ) {
                item = null;
            }

            if( item == currentSelectedItem ) {
                return;
            }

            if( item !== null ) {
                if( !items[ itemId ] ) {
                    if( !error ) {
                        throw new Error( 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.' );
                    } else {
                        error( this.getContext(), { error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.' } );
                        return;
                    }
                }
            }

            this.get( 'model' ).setProperty( 'selectedItem', item );

            index = this._indexOfItem( items[ itemId ] );
            this._tuneMirroringOfModel( index );

            this._notifyAboutSelectedItem( item, success );
        },

        /**
         *
         * @param item
         * @private
         */
        _includeItemToModifiedSet: function( item ) {
            var itemId = this.idOfItem( item );
            this.get( 'modifiedItems' )[ itemId ] = item;
        },

        /**
         *
         * @param item
         * @private
         */
        _excludeItemFromModifiedSet: function( item ) {
            var itemId = this.idOfItem( item );
            delete this.get( 'modifiedItems' )[ itemId ];
        },

        /**
         *
         * @param item
         * @private
         */
        _handleDeletedItem: function( item ) {
            var items = this.getItems();
            var idProperty = this.get( 'idProperty' );
            var itemId = this.idOfItem( item );
            var selectedItem = this.getSelectedItem();

            for( var i = 0, ii = items.length, needExit = false; i < ii && !needExit; i++ ) {
                if( items[ i ][ idProperty ] == itemId ) {
                    items.splice( i, 1 );
                    needExit = true;
                }
            }
            delete this.get( 'itemsById' )[ itemId ];
            this._excludeItemFromModifiedSet( item );

            if( selectedItem && selectedItem[ idProperty ] == itemId ) {
                this.setSelectedItem( null );
            }

            this._notifyAboutItemDeleted( item );
        }

    },

    byLink: {

        /**
         *
         * @returns {boolean}
         * @private
         */
        _restoreSelectedItem: function() {
            var selectedItem = this.getSelectedItem();
            var items = this.getItems();

            if( items.indexOf( selectedItem ) === -1 ) {
                return false;
            } else {
                return true;
            }
        },

        /**
         *
         * @param item
         * @param success
         * @param error
         */
        setSelectedItem: function( item, success, error ) {
            var currentSelectedItem = this.getSelectedItem();
            var index = this._indexOfItem( item );

            if( typeof item == 'undefined' ) {
                item = null;
            }

            if( item == currentSelectedItem ) {
                return;
            }

            if( item !== null ) {
                if( index == -1 ) {
                    if( !error ) {
                        throw new Error( 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.' );
                    } else {
                        error( this.getContext(), { error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.' } );
                        return;
                    }
                }
            }

            this.get( 'model' ).setProperty( 'selectedItem', item );
            this._tuneMirroringOfModel( index );
            this._notifyAboutSelectedItem( item, success );
        },

        /**
         *
         * @param item
         * @private
         */
        _includeItemToModifiedSet: function( item ) {
            this.get( 'modifiedItems' )[ '-' ] = item;
        },

        /**
         *
         * @param item
         * @private
         */
        _excludeItemFromModifiedSet: function( item ) {
            delete this.get( 'modifiedItems' )[ '-' ];
        },

        /**
         *
         * @param item
         * @private
         */
        _handleDeletedItem: function( item ) {
            var items = this.getItems();
            var selectedItem = this.getSelectedItem();
            var index = items.indexOf( item );

            if( index >= 0 ) {
                items.splice( index, 1 );
                this._excludeItemFromModifiedSet( item );

                if( selectedItem && selectedItem == item ) {
                    this.setSelectedItem( null );
                }
            }

            this._notifyAboutItemDeleted( item );
        }
    }

};

InfinniUI.BaseDataSource = BaseDataSource;
