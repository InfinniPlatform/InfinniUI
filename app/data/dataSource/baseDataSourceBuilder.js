/**
 * @constructor
 * @mixes DataSourceValidationNotifierMixin
 */
var BaseDataSourceBuilder = function() {
};

_.extend( BaseDataSourceBuilder.prototype, {

    build: function( context, args ) {
        var dataSource = this.createDataSource( args.parentView );
        dataSource.suspendUpdate( 'tuningInSourceBuilder' );

        this.applyMetadata( args.builder, args.parentView, args.metadata, dataSource );

        this.applySuspended( dataSource, args.suspended );

        dataSource.resumeUpdate( 'tuningInSourceBuilder' );

        return dataSource;
    },

    applySuspended: function( dataSource, suspended ) {
        if( !suspended ) {
            return;
        }

        for( var name in suspended ) {
            if( !suspended.hasOwnProperty( name ) || dataSource.getName() !== name ) {
                continue;
            }

            dataSource.suspendUpdate( suspended[ name ] );
        }
    },

    applyMetadata: function( builder, parentView, metadata, dataSource ) {
        var idProperty = metadata.IdProperty;
        if( idProperty ) {
            dataSource.setIdProperty( idProperty );
        }

        if( 'SuspendUpdate' in metadata ) {
            dataSource.suspendUpdate( metadata[ 'SuspendUpdate' ] );
        }

        dataSource.setName( metadata.Name );
        dataSource.setFillCreatedItem( metadata.FillCreatedItem );

        if( 'IsLazy' in metadata ) {
            dataSource.setIsLazy( metadata[ 'IsLazy' ] );
        }

        if( 'Search' in metadata ) {
            dataSource.setSearch( metadata[ 'Search' ] );
        }

        if( 'Filter' in metadata ) {
            dataSource.setFilter( metadata[ 'Filter' ] );
        }
        if( 'FilterParams' in metadata ) {
            var params = metadata[ 'FilterParams' ];
            for( var k in params ) {
                this.initBindingToProperty( params[ k ], dataSource, parentView, '.filterParams.' + k, builder );
            }
        }

        if( 'IsLazy' in metadata ) {
            dataSource.setIsLazy( metadata[ 'IsLazy' ] );
        }

        if( 'ResolvePriority' in metadata ) {
            dataSource.setResolvePriority( metadata[ 'ResolvePriority' ] );
        }

        if( typeof metadata.CustomProperties === 'object' ) {
            this.initCustomProperties( dataSource, metadata.CustomProperties );
        }

        this.initValidation( parentView, dataSource, metadata );
        this.initNotifyValidation( dataSource );
        this.initScriptsHandlers( parentView, metadata, dataSource );

        this.initFileProvider( dataSource );
    },

    createDataSource: function( parent ) {
        return new BaseDataSource( {
            view: parent
        } );
    },

    initCustomProperties: function( dataSource, customProperties ) {
        for( var key in customProperties ) {
            if( customProperties.hasOwnProperty( key ) ) {
                var value = customProperties[ key ];
                dataSource.setProperty( '.' + key, value );
            }
        }
    },

    /**
     * @protected
     * @description Инициализация обработчиков для валидации данных
     * @param parentView
     * @param dataSource
     * @param metadata
     */
    initValidation: function( parentView, dataSource, metadata ) {
        if( metadata.ValidationErrors ) {
            dataSource.setErrorValidator( function( context, args ) {
                return new ScriptExecutor( parentView ).executeScript( metadata.ValidationErrors, args );
            } );
        }
    },

    //Скриптовые обработчики на события
    initScriptsHandlers: function( parentView, metadata, dataSource ) {
        if( !parentView ) {
            return;
        }

        if( metadata.OnSelectedItemChanged ) {
            dataSource.onSelectedItemChanged( function( context, args ) {
                new ScriptExecutor( parentView ).executeScript( metadata.OnSelectedItemChanged, args );
            } );
        }

        if( metadata.OnItemsUpdated ) {
            dataSource.onItemsUpdated( function( context, args ) {
                new ScriptExecutor( parentView ).executeScript( metadata.OnItemsUpdated, args );
            } );
        }

        if( metadata.OnPropertyChanged ) {
            dataSource.onPropertyChanged( function( context, args ) {
                new ScriptExecutor( parentView ).executeScript( metadata.OnPropertyChanged, args );
            } );
        }

        if( metadata.OnItemDeleted ) {
            dataSource.onItemDeleted( function( context, args ) {
                new ScriptExecutor( parentView ).executeScript( metadata.OnItemDeleted, args );
            } );
        }

        if( metadata.OnErrorValidator ) {
            dataSource.onErrorValidator( function( context, args ) {
                new ScriptExecutor( parentView ).executeScript( metadata.OnErrorValidator, args );
            } );
        }

        if( metadata.OnProviderError ) {
            dataSource.onProviderError( function( context, args ) {
                new ScriptExecutor( parentView ).executeScript( metadata.OnProviderError, args );
            } );
        }
    },

    buildBindingBuilder: function( params ) {
        return function( bindingMetadata ) {
            return params.builder.buildBinding( bindingMetadata, {
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            } );
        };
    },

    initFileProvider: function( dataSource ) {
        var host = InfinniUI.config.serverUrl;
        var fileUrlConstructor = new DocumentUploadQueryConstructor( host );
        var fileProvider = new DocumentFileProvider( fileUrlConstructor );

        dataSource.setFileProvider( fileProvider );
    },

    initBindingToProperty: function( valueMetadata, dataSource, parentView, pathForBinding, builder ) {
        if( typeof valueMetadata !== 'object' ) {
            if( typeof valueMetadata !== 'undefined' ) {
                dataSource.setProperty( pathForBinding, valueMetadata );
            }

        } else {
            var args = {
                parent: parentView,
                parentView: parentView
            };

            var dataBinding = builder.buildBinding( valueMetadata, args );

            dataBinding.setMode( InfinniUI.BindingModes.toElement );

            dataBinding.bindElement( dataSource, pathForBinding );
        }
    }

} );

_.extend( BaseDataSourceBuilder.prototype, dataSourceValidationNotifierMixin );

InfinniUI.BaseDataSourceBuilder = BaseDataSourceBuilder;
