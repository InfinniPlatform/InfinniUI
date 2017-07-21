/**
 * @param parent
 * @constructor
 * @augments Container
 */
function View( parent ) {
    _.superClass( View, this, parent );

    var view = this;

    this.eventManager = new EventManager();
    this.openStrategy = new OpenModeDefaultStrategy();
    this.openStrategy.setView( this );
    this.members = {};
    this.membersDeferreds = {};
    this.handlers = {
        onBeforeLoaded: $.Deferred(),
        onLoaded: $.Deferred(),
        onSelectedElementChange: null
    };
    this._initContext();

    var parentView = this.getView();

    if( parentView ) {
        // перед закрытием родительской view необходимо также убедиться, что могут быть закрыты все дочерние view
        parentView.onClosing && parentView.onClosing( function( context, message ) {
            if( !view.isRemoved ) {
                return view.eventManager.trigger( 'onClosing', view.getContext(), view._getScriptArgs() );
            }
        } );

        // при закрытии родительской view необходимо закрыть все дочерние view
        parentView.onClosed && parentView.onClosed( function( context, message ) {
            view.close( null, null, true );
        } );
    }

    this.control.get( 'dataSources' ).onChange( function() {
        view._initDataSourceHandlers();
    } );
}

InfinniUI.View = View;

_.inherit( View, Container );

_.extend( View.prototype, {

    isView: true,

    /**
     *
     * @private
     */
    _initDataSourceHandlers: function() {
        var that = this;
        var dataSources = this.getContext().dataSources;
        var readyDsDeferred = [];

        this.control.onLoaded( function() {
            for( var k in dataSources ) {
                readyDsDeferred.push( dataSources[ k ].getCurrentRequestPromise() );
            }

            if( readyDsDeferred.length > 0 ) {
                $.when.apply( $, readyDsDeferred ).done( function() {
                    that._notifyAboutDsReady();
                } );
            } else {
                that._notifyAboutDsReady();
            }

        } );
    },

    /**
     *
     * @private
     */
    _notifyAboutDsReady: function() {
        this.handlers.onBeforeLoaded.resolve();
        this.handlers.onLoaded.resolve();
    },

    /**
     *
     * @returns {ViewControl}
     */
    createControl: function() {
        return new ViewControl();
    },

    /**
     *
     * @private
     */
    _initContext: function() {
        this.context = {
            view: this,
            scripts: {},
            parameters: {},
            dataSources: {},
            controls: {},
            messageBus: new MessageBus( this ),
            global: InfinniUI.global
        };

        var that = this;

        // on scripts changing
        this.control.get( 'scripts' ).onChange( function() {
            that.context.scripts = {};

            var newScripts = that.getScripts();

            newScripts.forEach( function( item ) {
                that.context.scripts[ item.name ] = item.func;
            } );
        } );

        // on parameters changing
        this.control.get( 'parameters' ).onChange( function() {
            that.context.parameters = {};

            var newParameters = that.getParameters();

            newParameters.forEach( function( item ) {
                that.context.parameters[ item.name ] = item;
                that.registerMember( item.name, item );
            } );
        } );

        // on dataSources changing
        this.control.get( 'dataSources' ).onChange( function() {
            that.context.dataSources = {};

            var newParameters = that.getDataSources();

            newParameters.forEach( function( item ) {
                that.context.dataSources[ item.get( 'name' ) ] = item;
                that.registerMember( item.name, item );
            } );
        } );
    },

    /**
     *
     * @returns {*}
     */
    getApplicationView: function() {
        var isApplication = this.control.get( 'isApplication' );
        var parent = this.parent;

        if( isApplication ) {
            return this;
        } else {
            return _.isEmpty( parent ) ? null : parent.getApplicationView();
        }
    },

    /**
     *
     * @param param
     */
    isApplication: function( param ) {
        var result = this.control.get( 'isApplication' );

        if( typeof param === 'boolean' ) {
            this.control.set( 'isApplication', param );
        }

        return result;
    },

    /**
     *
     * @param element
     */
    registerElement: function( element ) {
        this.context.controls[ element.name ] = element;
        this.registerMember( element.name, element );
    },

    /**
     *
     * @returns {*}
     */
    getContext: function() {
        return this.context;
    },

    /**
     * @returns {*}
     */
    getScripts: function() {
        return this.control.get( 'scripts' );
    },

    /**
     * @returns {*}
     */
    getParameters: function() {
        return this.control.get( 'parameters' );
    },

    /**
     * @returns {*}
     */
    getDataSources: function() {
        return this.control.get( 'dataSources' );
    },

    /**
     * @returns {*}
     */
    getDialogResult: function() {
        return this.control.get( 'dialogResult' );
    },

    /**
     * @returns {*}
     * @param value
     */
    setDialogResult: function( value ) {
        return this.control.set( 'dialogResult', value );
    },

    /**
     *
     * @param success
     * @param error
     */
    open: function( success, error ) {
        var context = this.getContext();
        var scriptArgs = this._getScriptArgs();

        if( this.eventManager.trigger( 'onOpening', scriptArgs, context ) ) {
            this.openStrategy.open();
            this.eventManager.trigger( 'onOpened', scriptArgs, context );

            if( success ) {
                success( context, scriptArgs );
            }
        } else if( error ) {
            error( context, scriptArgs );
        }
    },

    /**
     *
     * @param success
     * @param error
     * @param notCallOnClosing
     */
    close: function( success, error, notCallOnClosing ) {
        if( this.isClosing ) {
            return;
        } else {
            this.isClosing = true;
        }

        var context = this.getContext();
        var scriptArgs = this._getScriptArgs();

        if( notCallOnClosing || this.eventManager.trigger( 'onClosing', scriptArgs, context ) ) {
            this.eventManager.trigger( 'onClosed', scriptArgs, context );

            this.openStrategy.close();
            this.removeParameters();

            if( success ) {
                success( context, scriptArgs );
            }

        } else if( error ) {
            error( context, scriptArgs );
        }
    },

    /**
     *
     */
    removeParameters: function() {
        var parameters = this.control.get( 'parameters' );

        if( parameters._items.length ) {
            parameters.forEach( function( parameter ) {
                parameter.remove();
            } );

            parameters.removeAll();
        }
    },

    /**
     *
     * @returns {View}
     */
    getScriptsStorage: function() {
        return this;
    },

    /**
     *
     * @param openStrategy
     */
    setOpenStrategy: function( openStrategy ) {
        this.openStrategy = openStrategy;
    },

    /**
     *
     * @param handler
     */
    onBeforeLoaded: function( handler ) {
        this.handlers.onBeforeLoaded.done( handler );
    },

    /**
     *
     * @param handler
     */
    onLoaded: function( handler ) {
        this.handlers.onLoaded.done( handler );
    },
    /**
     *
     * @param callback
     */
    onOpening: function( callback ) {
        this.eventManager.on( 'onOpening', callback );
    },

    /**
     *
     * @param callback
     */
    onOpened: function( callback ) {
        this.eventManager.on( 'onOpened', callback );
    },

    /**
     *
     * @param callback
     */
    onClosing: function( callback ) {
        this.eventManager.on( 'onClosing', callback );
    },

    /**
     *
     * @param callback
     */
    onClosed: function( callback ) {
        this.eventManager.on( 'onClosed', callback );
    },

    /**
     *
     * @returns {{source: View}}
     * @private
     */
    _getScriptArgs: function() {
        return {
            source: this
        };
    },

    /**
     * @description Устанаваливает шаблон заголовка
     * @param {Function} template
     */
    setHeaderTemplate: function( template ) {
        this.headerTemplate = template;
    },

    /**
     * @description Возвращает шаблон заголовка
     * @returns {Function|*}
     */
    getHeaderTemplate: function() {
        return this.headerTemplate;
    },

    /**
     * @description Устанавливает флаг видитмости кнопки закрытия
     * @param {boolean} value
     */
    setCloseButtonVisibility: function( value ) {
        if( typeof value === 'boolean' ) {
            this.control.set( 'closeButtonVisibility', value );
        }
    },

    /**
     * @description Возвращает флаг видимости кнопки закрытия
     * @returns {boolean}
     */
    getCloseButtonVisibility: function() {
        return this.control.get( 'closeButtonVisibility' );
    },

    /**
     *
     */
    noDataSourceOnView: function() {
        this._initDataSourceHandlers();
    },

    /**
     *
     * @param memberName
     * @param member
     */
    registerMember: function( memberName, member ) {
        this.members[ memberName ] = member;

        if( memberName in this.membersDeferreds ) {
            this.membersDeferreds[ memberName ].resolve( member );
        }
    },

    /**
     *
     * @param memberName
     * @returns {*}
     */
    getDeferredOfMember: function( memberName ) {
        if( memberName === 'LocalStorageDS' ) {
            return $.Deferred().resolve( InfinniUI.localStorageDataSource );
        }

        if( !( memberName in this.membersDeferreds ) ) {
            this.membersDeferreds[ memberName ] = $.Deferred();

            if( this.members[ memberName ] ) {
                var member = this.members[ memberName ];
                this.membersDeferreds[ memberName ].resolve( member );
            }
        }

        return this.membersDeferreds[ memberName ];
    },

    /**
     *
     * @param {string} value
     */
    setFocusOnControl: function( value ) {
        this.control.set( 'focusOnControl', value );
    },

    /**
     *
     * @returns {string}
     */
    getFocusOnControl: function() {
        return this.control.get( 'focusOnControl' );
    }

} );
