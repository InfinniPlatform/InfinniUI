/**
 * @constructor
 * @augments Backbone.Model
 * @mixes dataSourceFindItemMixin
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

    initialize: function() {
        var view = this.get( 'view' );
        var modelStartTree = {
            items: null,
            selectedItem: null
        };

        this.initDataProvider();

        if( !view ) {
            throw 'BaseDataSource.initialize: При создании объекта не была задана view.'
        }
        this.set( 'suspendingList', [] );
        this.set( 'waitingOnUpdateItemsHandlers', [] );
        this.set( 'model', new TreeModel( view.getContext(), this, modelStartTree ) );

        _.extend( this, BaseDataSource.identifyingStrategy.byId );
    },

    initDataProvider: function() {
        throw 'BaseDataSource.initDataProvider В потомке BaseDataSource не задан провайдер данных.';
    },

    getSearch: function(){
        return this.get('model').getProperty('search');
    },

    setSearch: function(searchStr){
        this.get('model').setProperty('search', searchStr);
    },

    getFilter: function(){
        return this.get('model').getProperty('filter');
    },

    setFilter: function(filter){
        this.get('model').setProperty('filter', filter);
    },

    getFilterParams: function(propertyName){
        if(arguments.length == 0){
            propertyName = 'filterParams';

        }else{
            if(propertyName == ''){
                propertyName = 'filterParams';
            }else{
                propertyName = 'filterParams.' + propertyName;
            }
        }

        return this.get('model').getProperty(propertyName);
    },

    setFilterParams: function(propertyName, value){
        if(arguments.length == 1){
            value = propertyName;
            propertyName = 'filterParams';

        }else{
            if(propertyName == ''){
                propertyName = 'filterParams';
            }else{
                propertyName = 'filterParams.' + propertyName;
            }
        }

        this.get('model').setProperty(propertyName, value);
    },

    onPropertyChanged: function( property, handler, owner ) {

        if( typeof property == 'function' ) {
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

        this.get( 'model' ).onPropertyChanged( property, function( context, args ) {
            var property = args.property;

            if( property.substr( 0, 6 ) == 'items.' ) {
                property = property.substr( 6 );
            } else if( property == 'items' ) {
                property = '';
            } else {
                property = '.' + property;
            }

            args.property = property;

            handler( context, args );
        }, owner );
    },

    onSelectedItemChanged: function( handler, owner ) {
        var that = this;

        this.get( 'model' ).onPropertyChanged( 'selectedItem', function( context, args ) {
            var argument = that._getArgumentTemplate();
            argument.value = args.newValue;

            handler( context, argument );
        }, owner );
    },

    onErrorValidator: function( handler ) {
        this.on( 'onErrorValidator', handler );
    },

    onItemSaved: function( handler ) {
        this.on( 'onItemSaved', handler );
    },

    onItemCreated: function( handler ) {
        this.on( 'onItemCreated', handler );
    },

    onItemsUpdated: function( handler ) {
        this.on( 'onItemsUpdated', handler );
    },

    onItemsUpdatedOnce: function( handler ) {
        this.once( 'onItemsUpdated', handler );
    },

    onItemDeleted: function( handler ) {
        this.on( 'onItemDeleted', handler );
    },

    onProviderError: function( handler ) {
        this.off( 'onProviderError' );
        this.on( 'onProviderError', handler );

        this.onProviderErrorHandler = handler;
    },

    getName: function() {
        return this.get( 'name' );
    },

    setName: function( name ) {
        this.set( 'name', name );
        this.name = name;
    },

    getView: function() {
        return this.get( 'view' );
    },

    getProperty: function( property ) {
        var firstChar = property.charAt( 0 );
        var indexOfSelectedItem;

        if( this.get( 'isNumRegEx' ).test( firstChar ) ) {
            property = 'items.' + property;

        } else if( firstChar == '' ) {
            property = 'items';

        } else if( firstChar == '$' ) {
            indexOfSelectedItem = this._indexOfSelectedItem();
            if( indexOfSelectedItem == -1 ) {
                return undefined;
            }
            property = 'items.' + indexOfSelectedItem + property.substr( 1 );

        } else if( firstChar == '.' ) {
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

    setProperty: function( property, value ) {
        var propertyPaths = property.split( '.' );
        var firstChar;
        var indexOfSelectedItem;
        var resultOfSet;

        if( propertyPaths[0] == '$' ) {
            indexOfSelectedItem = this._indexOfSelectedItem();
            if( indexOfSelectedItem == -1 ) {
                return;
            }

            property = indexOfSelectedItem + property.substr( 1 );
            propertyPaths[0] = indexOfSelectedItem.toString();
        }

        firstChar = property.charAt( 0 );

        if( propertyPaths.length == 1 ) {

            if( propertyPaths[0] == '' ) {
                this._setItems( value );

            } else if( this.get( 'isNumRegEx' ).test( propertyPaths[0] ) ) {
                this._changeItem( propertyPaths[0], value );

            } else {
                indexOfSelectedItem = this._indexOfSelectedItem();
                if( indexOfSelectedItem == -1 ) {
                    return;
                }
                property = 'items.' + indexOfSelectedItem + '.' + property;
                resultOfSet = this.get( 'model' ).setProperty( property, value );

                if( resultOfSet ) {
                    this._includeItemToModifiedSetByIndex( indexOfSelectedItem );
                }
            }

        } else {
            if( firstChar == '.' ) {
                property = property.substr( 1 );
                this.get( 'model' ).setProperty( property, value );

            } else if( this.get( 'isNumRegEx' ).test( firstChar ) ) {
                property = 'items.' + property;
                resultOfSet = this.get( 'model' ).setProperty( property, value );

                if( resultOfSet ) {
                    this._includeItemToModifiedSetByIndex( parseInt( propertyPaths[0] ) );
                }
            } else {
                indexOfSelectedItem = this._indexOfSelectedItem();
                if( indexOfSelectedItem == -1 ) {
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
                this.setSelectedItem( items[0] );
            }

        } else {
            this.setSelectedItem( null );
        }
    },

    _restoreSelectedItem: function() {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._restoreSelectedItem: not overrided by strategy',
            source: this
        } );
    },

    getSelectedItem: function() {
        return this.get( 'model' ).getProperty( 'selectedItem' );
    },

    setSelectedItem: function( item, success, error ) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource.setSelectedItem: not overrided by strategy',
            source: this
        } );
    },

    _notifyAboutSelectedItem: function( item, successHandler ) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;

        if( successHandler ) {
            successHandler( context, argument );
        }
    },

    _tuneMirroringOfModel: function( index ) {
        if( index != -1 ) {
            this.get( 'model' ).setMirroring( 'items.$', 'items.' + index );
        } else {
            this.get( 'model' ).setMirroring( null, null );
        }
    },

    getIdProperty: function() {
        return this.get( 'idProperty' );
    },

    setIdProperty: function( value ) {
        this.set( 'idProperty', value );
    },

    getFillCreatedItem: function() {
        return this.get( 'fillCreatedItem' );
    },

    setFillCreatedItem: function( fillCreatedItem ) {
        this.set( 'fillCreatedItem', fillCreatedItem );
    },

    suspendUpdate: function( name ) {
        var reason = name || 'default';

        var suspended = this.get( 'suspendingList' );
        if( suspended.indexOf( reason ) === -1 ) {
            suspended = suspended.slice( 0 );
            suspended.push( reason );
            this.set( 'suspendingList', suspended );
        }
    },

    resumeUpdate: function( name ) {
        var reason = name || 'default';

        var suspended = this.get( 'suspendingList' );
        var index = suspended.indexOf( reason );

        if( index !== -1 ) {
            suspended = suspended.slice( 0 );
            suspended.splice( index, 1 );
            this.set( 'suspendingList', suspended );

            // если источник полностью разморожен, а до этого вызывались updateItems, не выполненные из-за заморозки, нужно вызвать updateItems
            if( !this.isUpdateSuspended() && this.get( 'waitingOnUpdateItemsHandlers' ).length > 0 ) {
                // waitingOnUpdateItemsHandlers будут вызваны в _notifyAboutItemsUpdated или _onErrorProviderUpdateItemsHandle
                this.updateItems();
            }
        }
    },

    isUpdateSuspended: function() {
        var suspended = this.get( 'suspendingList' );
        return suspended.length > 0;
    },

    isModifiedItems: function() {
        return this.isModified();
    },

    isModified: function( item ) {
        if( arguments.length == 0 ) {
            return _.size( this.get( 'modifiedItems' ) ) > 0;
        }

        if( item === null || item === undefined ) {
            return false;
        }
        else {
            var itemId = this.idOfItem( item );
            return itemId in this.get( 'modifiedItems' );
        }
    },

    _includeItemToModifiedSetByIndex: function( index ) {
        var item;

        item = this.getItems()[index];
        this._includeItemToModifiedSet( item );
    },

    _includeItemToModifiedSet: function( item ) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._includeItemToModifiedSet: not overrided by strategy',
            source: this
        } );
    },

    _excludeItemFromModifiedSet: function( item ) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._excludeItemFromModifiedSet: not overrided by strategy',
            source: this
        } );
    },

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

    _changeItem: function( index, value ) {
        var item = this.get( 'model' ).getProperty( 'items.' + index ),
            isSelectedItem = (item == this.getSelectedItem()),
            idProperty = this.get( 'idProperty' ),
            indexedItemsById = this.get( 'itemsById' );

        if( value == item ) {
            return;
        }

        this._excludeItemFromModifiedSet( item );
        delete indexedItemsById[item[idProperty]];

        this.get( 'model' ).setProperty( 'items.' + index, value );

        this._includeItemToModifiedSet( value );
        indexedItemsById[value[idProperty]] = value;
        this.set( 'itemsById', indexedItemsById );

        if( isSelectedItem ) {
            this.get( 'model' ).setProperty( 'selectedItem', value );
        }
    },

    tryInitData: function() {
        if( !this.get( 'isDataReady' ) && !this.get( 'isRequestInProcess' ) ) {
            this.updateItems();
        }
    },

    saveItem: function( item, success, error ) {
        var dataProvider = this.get( 'dataProvider' ),
            that = this,
            validateResult;

        if( !this.isModified( item ) ) {
            this._notifyAboutItemSaved( {item: item, result: null}, 'notModified' );
            that._executeCallback( success, {item: item, validationResult: {IsValid: true}} );
            return;
        }

        validateResult = this.getValidationResult( item );
        if( !validateResult.IsValid ) {
            this._notifyAboutValidation( validateResult );
            this._executeCallback( error, {item: item, validationResult: validateResult} );
            return;
        }

        dataProvider.saveItem( item, function( data ) {
            that._excludeItemFromModifiedSet( item );
            that._notifyAboutItemSaved( {item: item, result: data.data}, 'modified' );
            that._executeCallback( success, {
                item: item,
                validationResult: that._extractValidationResult( data ),
                originalResponse: data
            } );
        }, function( data ) {
            var result = that._extractValidationResult( data );

            that._executeCallback( error, {item: item, validationResult: result, originalResponse: data} );
            that._onServerErrorHandler( {
                response: data,
                validationResult: result,
                item: item
            } );
        } );
    },

    _extractValidationResult: function( data ) {
        if( data.data && data.data.responseJSON && data.data.responseJSON['Result'] ) {
            return data.data.responseJSON['Result']['ValidationResult'];
        }

        return data.data && data.data['Result'] && data.data['Result']['ValidationResult'];
    },

    _executeCallback: function( callback, args ) {
        if( callback ) {
            callback( this.getContext(), args );
        }
    },

    _notifyAboutItemSaved: function( data, result ) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = data;
        argument.result = result;

        this.trigger( 'onItemSaved', context, argument );
    },

    deleteItem: function( item, success, error ) {
        var dataProvider = this.get( 'dataProvider' ),
            that = this,
            itemId = this.idOfItem( item ),
            isItemInSet = this.get( 'itemsById' )[itemId] !== undefined;

        if( item == null || ( itemId !== undefined && !isItemInSet ) ) {
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

            that._executeCallback( error, {item: item, validationResult: result, originalResponse: data} );
            that._onServerErrorHandler( {
                response: data,
                validationResult: result,
                item: item
            } );
        } );
    },

    _onServerErrorHandler: function( params ) {
        var validationResult = params.validationResult,
            context = this.getContext();
        if( validationResult && validationResult.Items ) {
            this._notifyAboutValidation(validationResult);
        } else {
            this.trigger( 'onProviderError', context, {item: params.item, data: params.response} );
        }
    },

    beforeDeleteItem: function( item ) {
    },

    _handleDeletedItem: function( item ) {
        // override by strategy
        var logger = window.InfinniUI.global.logger;
        logger.warn( {
            message: 'BaseDataSource._handleDeletedItem: not overrided by strategy',
            source: this
        } );
    },

    _notifyAboutItemDeleted: function( item, successHandler ) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;

        this.trigger( 'onItemDeleted', context, argument );
    },

    _notifyAboutMissingDeletedItem: function( item, errorHandler ) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.value = item;
        argument.error = {
            message: 'Нельзя удалить элемент, которого нет текущем наборе источника данных'
        };

        if( errorHandler ) {
            errorHandler( context, argument );
        }
    },

    isDataReady: function() {
        return this.get( 'isDataReady' );
    },

    getItems: function() {
        var logger = window.InfinniUI.global.logger;

        if( !this.isDataReady() ) {
            logger.warn( {
                message: 'BaseDataSource: Попытка получить данные источника данных (' + this.get( 'name' ) + '), до того как он был проинициализирован данными',
                source: this
            } );
        }

        return this.get( 'model' ).getProperty( 'items' );
    },

    updateItems: function( onSuccess, onError ) {
        if( !this.isUpdateSuspended() ) {
            var dataProvider = this.get( 'dataProvider' ),
                that = this;

            this.set( 'isRequestInProcess', true );
            dataProvider.getItems(
                function( data ) {
                    that._handleSuccessUpdateItemsInProvider( data, onSuccess );
                },
                function( data ) {
                    var context = that.getContext();
                    that._onErrorProviderUpdateItemsHandle( data, onError );
                    that.trigger( 'onProviderError', context, {data: data} );
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
        window.InfinniUI.global.messageBus.send( 'updateItems', {dataSource: this} );
        //devblockstop
    },

    _handleSuccessUpdateItemsInProvider: function( data, callback ) {
        var that = this,
            isWaiting = that.get( 'isWaiting' ),
            finishUpdating = function() {
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

    _onErrorProviderUpdateItemsHandle: function( data, callback ) {
        var handlers = this.get( 'waitingOnUpdateItemsHandlers' ),
            context = this.getContext();

        // вызываем обработчики которые были переданы на отложенных updateItems (из-за замороженного источника)
        for( var i = 0, ii = handlers.length; i < ii; i++ ) {
            if( handlers[i].onError ) {
                handlers[i].onError( context, data );
            }
        }

        this.set( 'waitingOnUpdateItemsHandlers', [] );

        if( _.isFunction( callback ) ) {
            callback( context, data );
        }
    },

    setIsWaiting: function( value ) {
        this.set( 'isWaiting', value );
    },

    _handleUpdatedItemsData: function( itemsData, callback ) {
        if( this.get( 'newItemsHandler' ) ) {
            itemsData = this.get( 'newItemsHandler' )( itemsData );
        }

        this._setItems( itemsData );
        this._notifyAboutItemsUpdated( itemsData, callback );
    },

    _notifyAboutItemsUpdated: function( itemsData, callback ) {
        var context = this.getContext();
        var argument = {
            value: itemsData,
            source: this
        };

        // вызываем обработчики которые были переданы на отложенных updateItems (из за замороженного источника)
        var handlers = this.get( 'waitingOnUpdateItemsHandlers' );
        for( var i = 0, ii = handlers.length; i < ii; i++ ) {
            if( handlers[i].onSuccess ) {
                handlers[i].onSuccess( context, argument );
            }
        }

        this.set( 'waitingOnUpdateItemsHandlers', [] );

        if( callback ) {
            callback( context, argument );
        }

        this.trigger( 'onItemsUpdated', context, argument );
    },

    _notifyAboutItemsUpdatedAsPropertyChanged: function( itemsData ) {
        var context = this.getContext(),
            argument = this._getArgumentTemplate();

        argument.property = '';
        argument.newValue = itemsData;
        argument.oldValue = null;

        this.trigger( 'onPropertyChanged', context, argument );
        this.trigger( 'onPropertyChanged:', context, argument );
    },

    createItem: function( success, error ) {
        var dataProvider = this.get( 'dataProvider' ),
            idProperty = this.get( 'idProperty' ),
            that = this,
            localItem;

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

    _handleDataForCreatingItem: function( itemData, successHandler ) {
        var items = this.getItems();

        if( items ) {
            items = items.slice();
            items.push( itemData );
        } else {
            items = [itemData];
        }

        this._setItems( items );
        this._includeItemToModifiedSet( itemData );
        this.setSelectedItem( itemData );
        this._notifyAboutItemCreated( itemData, successHandler );
    },

    _notifyAboutItemCreated: function( createdItem, successHandler ) {
        var context = this.getContext(),
            argument = {
                value: createdItem
            };

        if( successHandler ) {
            successHandler( context, argument );
        }
        this.trigger( 'onItemCreated', context, argument );
    },

    _setCriteriaList: function( criteriaList, onSuccess, onError ) {
        this.set( 'criteriaList', criteriaList );
        this.updateItems( onSuccess, onError );
    },

    setIdFilter: function( itemId ) {
        var dataProvider = this.get( 'dataProvider' ),
            idFilter = dataProvider.createIdFilter( itemId );

        this.setFilter( idFilter );
    },

    setNewItemsHandler: function( handler ) {
        this.set( 'newItemsHandler', handler );
    },

    getErrorValidator: function() {
        return this.get( 'errorValidator' );
    },

    setErrorValidator: function( validatingFunction ) {
        this.set( 'errorValidator', validatingFunction );
    },

    getValidationResult: function( item ) {
        var validatingFunction = this.get( 'errorValidator' ),
            result = {
                IsValid: true,
                Items: []
            },
            isCheckingOneItem = !!item,
            context = this.getContext(),
            items, subResult;

        if( validatingFunction ) {
            if( isCheckingOneItem ) {

                result = validatingFunction( context, item );

            } else {

                items = this.getItems();
                for( var i = 0, ii = items.length; i < ii; i++ ) {

                    subResult = validatingFunction( context, items[i] );
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

    setFileProvider: function( fileProvider ) {
        this.set( 'fileProvider', fileProvider );
    },

    getFileProvider: function() {
        return this.get( 'fileProvider' );
    },

    _addIndexToPropertiesOfValidationMessage: function( validationMessages, index ) {
        for( var i = 0, ii = validationMessages.length; i < ii; i++ ) {
            validationMessages[i].property = index + '.' + validationMessages[i].property;
        }
    },

    _notifyAboutValidation: function( validationResult ) {
        if( !validationResult ) {
            return;
        }

        var context = this.getContext(),
            argument = {
                value: validationResult
            };

        this.trigger( 'onErrorValidator', context, argument );
    },

    getContext: function() {
        return this.getView().getContext();
    },

    _indexItemsById: function( items ) {
        var idProperty = this.get( 'idProperty' ),
            result = {},
            idValue;
        for( var i = 0, ii = items.length; i < ii; i++ ) {
            idValue = items[i][idProperty];
            result[idValue] = items[i];
        }

        return result;
    },

    _indexOfItem: function( item ) {
        var items = this.getItems();
        if( !items ) {
            return -1;
        }
        return items.indexOf( item );
    },

    _indexOfSelectedItem: function() {
        var selectedItem = this.getSelectedItem();

        return this._indexOfItem( selectedItem );
    },

    idOfItem: function( item ) {
        var idProperty = this.get( 'idProperty' );
        if( !item ) {
            return undefined;
        }
        return item[idProperty];
    },

    getCurrentRequestPromise: function() {
        var promise = $.Deferred();
        var logger = window.InfinniUI.global.logger;

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

    setIsLazy: function( isLazy ) {
        this.set( 'isLazy', isLazy );
    },

    isLazy: function() {
        return this.get( 'isLazy' );
    },

    setResolvePriority: function( priority ) {
        this.set( 'resolvePriority', priority );
    },

    getResolvePriority: function() {
        return this.get( 'resolvePriority' );
    },

    _copyObject: function( currentObject ) {
        return JSON.parse( JSON.stringify( currentObject ) );
    },

    _getArgumentTemplate: function() {
        return {
            source: this
        };
    },

    _detectIdentifyingMode: function( items ) {
        if( $.isArray( items ) && items.length > 0 ) {
            if( !$.isPlainObject( items[0] ) || this.getIdProperty() in items[0] ) {
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

    _getIdentifyingMode: function() {
        return this.get( 'identifyingMode' );
    }

} );

BaseDataSource.identifyingStrategy = {

    byId: {
        _restoreSelectedItem: function() {

            var selectedItem = this.getSelectedItem(),
                selectedItemId = this.idOfItem( selectedItem );

            if( selectedItemId != null ) {
                var items = this.get( 'itemsById' );
                var newSelectedItem = items[selectedItemId];

                if( newSelectedItem != null ) {
                    this.setSelectedItem( newSelectedItem );
                    return true;
                }
            }

            return false;
        },

        setSelectedItem: function( item, success, error ) {
            var currentSelectedItem = this.getSelectedItem(),
                items = this.get( 'itemsById' ),
                itemId = this.idOfItem( item ),
                index;

            if( typeof item == 'undefined' ) {
                item = null;
            }

            if( item == currentSelectedItem ) {
                return;
            }

            if( item !== null ) {
                if( !items[itemId] ) {
                    if( !error ) {
                        throw 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.';
                    } else {
                        error( this.getContext(), {error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.'} );
                        return;
                    }
                }
            }

            this.get( 'model' ).setProperty( 'selectedItem', item );

            index = this._indexOfItem( items[itemId] );
            this._tuneMirroringOfModel( index );

            this._notifyAboutSelectedItem( item, success );
        },

        _includeItemToModifiedSet: function( item ) {
            var itemId = this.idOfItem( item );
            this.get( 'modifiedItems' )[itemId] = item;
        },

        _excludeItemFromModifiedSet: function( item ) {
            var itemId = this.idOfItem( item );
            delete this.get( 'modifiedItems' )[itemId];
        },

        _handleDeletedItem: function( item ) {
            var items = this.getItems(),
                idProperty = this.get( 'idProperty' ),
                itemId = this.idOfItem( item ),
                selectedItem = this.getSelectedItem();

            for( var i = 0, ii = items.length, needExit = false; i < ii && !needExit; i++ ) {
                if( items[i][idProperty] == itemId ) {
                    items.splice( i, 1 );
                    needExit = true;
                }
            }
            delete this.get( 'itemsById' )[itemId];
            this._excludeItemFromModifiedSet( item );

            if( selectedItem && selectedItem[idProperty] == itemId ) {
                this.setSelectedItem( null );
            }

            this._notifyAboutItemDeleted( item );
        }
    },

    byLink: {
        _restoreSelectedItem: function() {

            var selectedItem = this.getSelectedItem();
            var items = this.getItems();

            if( items.indexOf( selectedItem ) == -1 ) {
                return false;
            } else {
                return true;
            }
        },

        setSelectedItem: function( item, success, error ) {
            var currentSelectedItem = this.getSelectedItem(),
                items = this.getItems(),
                index = this._indexOfItem( item );

            if( typeof item == 'undefined' ) {
                item = null;
            }

            if( item == currentSelectedItem ) {
                return;
            }

            if( item !== null ) {
                if( index == -1 ) {
                    if( !error ) {
                        throw 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.';
                    } else {
                        error( this.getContext(), {error: 'BaseDataSource.setSelectedItem() Попытка выбрать элемент в источнике, которого нет среди элементов этого источника.'} );
                        return;
                    }
                }
            }

            this.get( 'model' ).setProperty( 'selectedItem', item );

            this._tuneMirroringOfModel( index );

            this._notifyAboutSelectedItem( item, success );
        },

        _includeItemToModifiedSet: function( item ) {
            this.get( 'modifiedItems' )['-'] = item;
        },

        _excludeItemFromModifiedSet: function( item ) {
            delete this.get( 'modifiedItems' )['-'];
        },

        _handleDeletedItem: function( item ) {
            var items = this.getItems(),
                selectedItem = this.getSelectedItem(),
                index = items.indexOf( item );

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

window.InfinniUI.BaseDataSource = BaseDataSource;
