var RestDataSourceBuilder = function() {
    _.superClass( RestDataSourceBuilder, this );
};

_.inherit( RestDataSourceBuilder, BaseDataSourceBuilder );

_.extend( RestDataSourceBuilder.prototype, {

    createDataSource: function( parent ) {
        return new RestDataSource( {
            view: parent
        } );
    },

    applyMetadata: function( builder, parent, metadata, dataSource ) {
        BaseDataSourceBuilder.prototype.applyMetadata.call( this, builder, parent, metadata, dataSource );

        var tmpParams;

        if( metadata[ 'OnProviderError' ] === null || typeof metadata[ 'OnProviderError' ] === 'undefined' ) {
            dataSource.onProviderError( this._getCompensateProviderErrorHandler() );
        }

        if( 'GettingParams' in metadata ) {
            tmpParams = this.extractUrlParams( metadata[ 'GettingParams' ], '.urlParams.get.params' );
            dataSource.setGettingUrlParams( tmpParams );
            this.bindParams( metadata[ 'GettingParams' ], dataSource, parent, '.urlParams.get.params', builder );
        }

        if( 'SettingParams' in metadata ) {
            tmpParams = this.extractUrlParams( metadata[ 'SettingParams' ], '.urlParams.set.params' );
            dataSource.setSettingUrlParams( tmpParams );
            this.bindParams( metadata[ 'SettingParams' ], dataSource, parent, '.urlParams.set.params', builder );
        }

        if( 'DeletingParams' in metadata ) {
            tmpParams = this.extractUrlParams( metadata[ 'DeletingParams' ], '.urlParams.delet.params' );
            dataSource.setDeletingUrlParams( tmpParams );
            this.bindParams( metadata[ 'DeletingParams' ], dataSource, parent, '.urlParams.delet.params', builder );
        }

        if( 'UpdatingItemsConverter' in metadata ) {
            dataSource.setUpdatingItemsConverter( function( items ) {
                return new ScriptExecutor( parent ).executeScript( metadata[ 'UpdatingItemsConverter' ], {
                    value: items,
                    source: dataSource
                } );
            } );
        }
    },

    extractUrlParams: function( urlParamsMetadata, pathForBinding ) {
        var result = {};

        if( 'Origin' in urlParamsMetadata ) {
            result.origin = urlParamsMetadata[ 'Origin' ];
        } else {
            result.origin = InfinniUI.config.serverUrl;
        }

        if( 'Path' in urlParamsMetadata ) {
            result.path = urlParamsMetadata[ 'Path' ];
        }

        if( 'Data' in urlParamsMetadata ) {
            result.data = urlParamsMetadata[ 'Data' ];
        }

        if( 'Method' in urlParamsMetadata ) {
            result.method = urlParamsMetadata[ 'Method' ];
        }

        result.params = {};

        return result;
    },

    bindParams: function( methodMetadata, dataSource, parentView, pathForBinding, builder ) {
        if( 'Params' in methodMetadata ) {
            var params = methodMetadata[ 'Params' ];
            for( var k in params ) {
                this.initBindingToProperty( params[ k ], dataSource, parentView, pathForBinding + '.' + k, builder );
            }
        }
    },

    _getCompensateProviderErrorHandler: function( dataSource ) {
        return function( context, args ) {
            var exchange = InfinniUI.global.messageBus;
            exchange.send( messageTypes.onNotifyUser, { messageText: 'Ошибка на сервере', messageType: 'error' } );
        };
    }
} );

InfinniUI.RestDataSourceBuilder = RestDataSourceBuilder;
