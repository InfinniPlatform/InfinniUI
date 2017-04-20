function ServerActionBuilder() {
}

_.extend( ServerActionBuilder.prototype, BaseActionBuilderMixin, BaseFallibleActionBuilderMixin, {

    build: function( context, args ) {
        var builder = args.builder;
        var metadata = args.metadata;
        var parentView = args.parentView;
        var action = new ServerAction( parentView );

        this.applyBaseActionMetadata( action, args );
        this.applyBaseFallibleActionMetadata( action, args );

        action.setProperty( 'origin', metadata.Origin || InfinniUI.config.serverUrl.replace( /\/$/, '' ) );
        action.setProperty( 'path', metadata.Path );

        if( metadata.Data ) {
            action.setProperty( 'data', metadata.Data );
        }

        if( metadata.Method ) {
            action.setProperty( 'method', metadata.Method );
        }

        if( metadata.ContentType || metadata.ContentType === false ) {
            action.setProperty( 'contentType', metadata.ContentType );
        }

        if( metadata.Params ) {
            for( var name in metadata.Params ) {

                var value = metadata.Params[ name ];

                if( Array.isArray( value ) || value === null || typeof value != 'object' ) {
                    if( value !== undefined ) {
                        action.setParam( name, value );
                    }
                } else {
                    var buildParams = {
                        parent: parentView,
                        parentView: parentView,
                        basePathOfProperty: args.basePathOfProperty
                    };

                    this._initBinding( name, value, action, buildParams, builder );
                }
            }
        }

        return action;
    },

    _initBinding: function( paramName, paramValue, action, buildParams, builder ) {
        var dataBinding = builder.buildBinding( paramValue, buildParams );

        dataBinding.setMode( InfinniUI.BindingModes.toElement );
        dataBinding.bindElement( {
            setProperty: function( name, value ) {
                action.setParam( name, value );
            },

            onPropertyChanged: function() {
            }
        }, paramName );
    }
} );

window.InfinniUI.ServerActionBuilder = ServerActionBuilder;
