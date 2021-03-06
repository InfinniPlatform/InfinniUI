/**
 *
 * @constructor
 */
var ElementBuilder = function() {
};

_.extend( ElementBuilder.prototype, {

    /**
     *
     * @param context
     * @param args
     * @returns {*}
     */
    build: function( context, args ) {
        args = args || {};
        var element = this.createElement( args );
        var params = _.extend( args, { element: element } );

        this.applyMetadata( params );

        if( args.parentView && args.parentView.registerElement ) {
            args.parentView.registerElement( element );
        }

        if( args.parent && args.parent.addChild ) {
            args.parent.addChild( element );
        }

        return element;
    },

    /**
     *
     * @param {Object} params
     * @param {Builder} params.builder
     * @param {View} params.parent
     * @param {Object} params.metadata
     * @param {*} params.collectionProperty
     */
    createElement: function( params ) {
        throw new Error( 'Не перегружен абстрактный метод ElementBuilder.createElement()' );
    },

    /**
     *
     * @param {Object} params
     * @param {Builder} params.builder
     * @param {View} params.parent
     * @param {Object} params.metadata
     * @param {*} params.collectionProperty
     * @param {Element} params.element
     */
    applyMetadata: function( params ) {
        var metadata = params.metadata;
        var element = params.element;

        this.initBindingToProperty( params, 'Text' );
        this.resolveExpressionInText( params, 'Text' );
        this.initBindingToProperty( params, 'Visible', true );
        this.initBindingToProperty( params, 'Enabled', true );
        this.initBindingToProperty( params, 'HorizontalAlignment' );
        this.initBindingToProperty( params, 'TextHorizontalAlignment' );
        this.initBindingToProperty( params, 'TextStyle' );
        this.initBindingToProperty( params, 'Foreground' );
        this.initBindingToProperty( params, 'Background' );
        this.initBindingToProperty( params, 'Style' );
        this.initBindingToProperty( params, 'Tag' );
        this.initBindingToProperty( params, 'Focusable', true );

        if( metadata.ToolTip ) {
            this.initToolTip( params );
        }
        if( metadata.ContextMenu ) {
            this.initContextMenu( params );
        }

        if( 'Name' in metadata ) {
            element.setName( metadata.Name );
        }

        var executorBuilderParams = {
            parentView: params.parentView,
            parent: element,
            basePathOfProperty: params.basePathOfProperty
        };

        if( metadata.OnLoaded ) {
            var onLoadedExecutor = Executor( metadata.OnLoaded, params.builder, executorBuilderParams );
            element.onLoaded( onLoadedExecutor.bind( null, { source: element } ) );
        }

        if( metadata.OnGotFocus ) {
            var onGotFocusExecutor = Executor( metadata.OnGotFocus, params.builder, executorBuilderParams );
            element.onGotFocus( onGotFocusExecutor.bind( null, { source: element } ) );
        }

        if( metadata.OnLostFocus ) {
            var onLostFocusExecutor = Executor( metadata.OnLostFocus, params.builder, executorBuilderParams );
            element.onLostFocus( onLostFocusExecutor.bind( null, { source: element } ) );
        }

        if( metadata.OnDoubleClick ) {
            var onDoubleClickExecutor = Executor( metadata.OnDoubleClick, params.builder, executorBuilderParams );
            element.onDoubleClick( onDoubleClickExecutor );
        }

        if( metadata.OnClick ) {
            var onClickExecutor = Executor( metadata.OnClick, params.builder, executorBuilderParams );
            element.onClick( onClickExecutor );
        }

        if( metadata.OnMouseEnter ) {
            var onMouseEnterExecutor = Executor( metadata.OnMouseEnter, params.builder, executorBuilderParams );
            element.onMouseEnter( onMouseEnterExecutor );
        }

        if( metadata.OnMouseLeave ) {
            var onMouseLeaveExecutor = Executor( metadata.OnMouseLeave, params.builder, executorBuilderParams );
            element.onMouseLeave( onMouseLeaveExecutor );
        }

        if( metadata.OnMouseMove ) {
            var onMouseMoveExecutor = Executor( metadata.OnMouseMove, params.builder, executorBuilderParams );
            element.onMouseMove( onMouseMoveExecutor );
        }

        if( metadata.OnKeyDown ) {
            var onKeyDownExecutor = Executor( metadata.OnKeyDown, params.builder, executorBuilderParams );
            element.onKeyDown( onKeyDownExecutor );
        }

        if( metadata.OnKeyUp ) {
            var onKeyUpExecutor = Executor( metadata.OnKeyUp, params.builder, executorBuilderParams );
            element.onKeyUp( onKeyUpExecutor );
        }

        if( metadata.OnMouseDown ) {
            var onMouseDownExecutor = Executor( metadata.OnMouseDown, params.builder, executorBuilderParams );
            element.onMouseDown( onMouseDownExecutor );
        }

        if( metadata.OnMouseUp ) {
            var onMouseUpExecutor = Executor( metadata.OnMouseUp, params.builder, executorBuilderParams );
            element.onMouseUp( onMouseUpExecutor );
        }

        if( metadata.OnMouseWheel ) {
            var onMouseWheelExecutor = Executor( metadata.OnMouseWheel, params.builder, executorBuilderParams );
            element.onMouseWheel( onMouseWheelExecutor );
        }
    },

    /**
     *
     * @param params
     * @param propertyName
     * @param isBooleanBinding
     * @returns {*}
     */
    initBindingToProperty: function( params, propertyName, isBooleanBinding ) {
        var metadata = params.metadata;
        var propertyMetadata = metadata[ propertyName ];
        var element = params.element;
        var lowerCasePropertyName = this.lowerFirstSymbol( propertyName );
        var converter;

        if( !propertyMetadata || typeof propertyMetadata != 'object' ) {
            if( typeof propertyMetadata !== 'undefined' ) {
                params.element[ 'set' + propertyName ]( propertyMetadata );
            }
            return null;
        } else {
            var args = {
                parent: params.parent,
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            };
            var dataBinding = params.builder.buildBinding( metadata[ propertyName ], args );
            var oldConverter;

            if( isBooleanBinding ) {
                dataBinding.setMode( InfinniUI.BindingModes.toElement );

                converter = dataBinding.getConverter();
                if( !converter ) {
                    converter = {};
                }

                if( !converter.toElement ) {
                    converter.toElement = function( context, args ) {
                        return !!args.value;
                    };
                } else {
                    oldConverter = converter.toElement;

                    converter.toElement = function( context, args ) {
                        var tmp = oldConverter( context, args );
                        return !!tmp;
                    };
                }

                dataBinding.setConverter( converter );
            }

            dataBinding.bindElement( element, lowerCasePropertyName );

            return dataBinding;
        }
    },

    /**
     *
     * @param params
     * @param propertyName
     */
    resolveExpressionInText: function( params, propertyName ) {
        var valueToResolve = params.metadata[ propertyName ];

        if( valueToResolve &&
            typeof valueToResolve === 'string' &&
            valueToResolve.slice( 0, 2 ) === '{=' &&
            valueToResolve.slice( -1 ) === '}' ) {

            var args = {
                parent: params.parent,
                parentView: params.parentView,
                basePathOfProperty: params.basePathOfProperty
            };
            var expression = '{return ' + valueToResolve.slice( 2, -1 ) + ';}';
            var newValue = new ScriptExecutor( params.element.getScriptsStorage() ).executeScript( expression, args );

            if( typeof newValue !== 'undefined' ) {
                params.element[ 'set' + propertyName ]( newValue );
            }
        }
    },

    /**
     *
     * @param params
     */
    initToolTip: function( params ) {
        var builder = params.builder;
        var element = params.element;
        var metadata = params.metadata;
        var tooltipBuilderParams = {
            basePathOfProperty: params.basePathOfProperty,
            parent: element,
            parentView: params.parentView
        };

        element.setToolTip( builder.buildType( 'ToolTip', metadata[ 'ToolTip' ], tooltipBuilderParams ) );
    },

    /**
     *
     * @param params
     */
    initContextMenu: function( params ) {
        var exchange = InfinniUI.global.messageBus;
        var builder = params.builder;
        var element = params.element;
        var metadata = params.metadata;
        var contextMenu;
        var argumentForBuilder = {
            parent: element,
            parentView: params.parentView,
            basePathOfProperty: params.basePathOfProperty
        };

        contextMenu = builder.buildType( 'ContextMenu', {
            'Items': metadata.ContextMenu.Items
        }, argumentForBuilder );

        element.setContextMenu( contextMenu );
        exchange.send( messageTypes.onContextMenu.name, { source: element, content: contextMenu.render() } );
    },

    /**
     *
     * @param s
     * @returns {string}
     */
    lowerFirstSymbol: function( s ) {
        return s[ 0 ].toLowerCase() + s.substr( 1 );
    }

} );

InfinniUI.ElementBuilder = ElementBuilder;
