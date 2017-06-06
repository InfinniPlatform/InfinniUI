/**
 *
 * @param parent
 * @param viewMode
 * @constructor
 */
var Element = function( parent, viewMode ) {
    this.parent = parent;
    this.control = this.createControl( viewMode );
    this.state = {
        Enabled: true
    };

    this.childElements = [];
};

Object.defineProperties( Element.prototype, {
    name: {
        get: function() {
            return this.getName();
        }
    }
} );

_.extend( Element.prototype, {

    /**
     *
     * @param viewMode
     */
    createControl: function( viewMode ) {
        throw new Error( 'Не перегружен абстрактный метод Element.createControl' );
    },

    /**
     *
     * @param parentElement
     */
    setParent: function( parentElement ) {
        this.parent = parentElement;
    },

    /**
     *
     * @return {*}
     */
    getParent: function() {
        return this.parent;
    },

    /**
     *
     * @return {undefined|*|Array}
     */
    getChildElements: function() {
        return this.childElements;
    },

    /**
     *
     * @param type
     * @return {*}
     */
    findAllChildrenByType: function( type ) {
        return this._findAllChildren( predicate, getChildElements );

        function predicate() {
            return this.constructor.name === type;
        }

        function getChildElements( element ) {
            return element.findAllChildrenByType( type );
        }
    },

    /**
     *
     * @param name
     * @return {*}
     */
    findAllChildrenByName: function( name ) {
        return this._findAllChildren( predicate, getChildElements );

        function predicate() {
            return this.getName() === name;
        }

        function getChildElements( element ) {
            return element.findAllChildrenByName( name );
        }

    },

    /**
     *
     * @param predicate
     * @param getChildElements
     * @return {Array}
     * @private
     */
    _findAllChildren: function( predicate, getChildElements ) {
        var elements = this.getChildElements();
        var items = [];

        if( Array.isArray( elements ) ) {
            elements.forEach( function( element ) {
                if( predicate.call( element ) ) {
                    items.push( element );
                }
                Array.prototype.push.apply( items, getChildElements( element ) );
            } );
        }

        return items;
    },

    /**
     *
     * @return {*|null}
     */
    getView: function() {
        if( !this.parentView ) {
            if( this.parent && this.parent.isView ) {
                this.parentView = this.parent;

            } else {
                if( this.parent && this.parent.getView ) {
                    this.parentView = this.parent.getView();
                } else {
                    this.parentView = null;
                }
            }
        }

        return this.parentView;
    },

    /**
     * @returns {*}
     */
    getName: function() {
        return this.control.get( 'name' );
    },

    /**
     *
     * @param name
     */
    setName: function( name ) {
        if( this.getName() ) {
            throw new Error( 'name already exists' );
        }

        if( typeof name == 'string' ) {
            this.control.set( 'name', name );
        }
    },

    /**
     *
     * @param name
     * @return {*}
     */
    getProperty: function( name ) {
        var getterMethodName = 'get' + this._upperFirstSymbol( name );

        if( typeof this[ getterMethodName ] === 'function' ) {
            return this[ getterMethodName ]();
        } else {
            throw new Error( 'expect that ' + getterMethodName + ' is getter function' );
        }
    },

    /**
     *
     * @param name
     * @param value
     */
    setProperty: function( name, value ) {
        var setterMethodName = 'set' + this._upperFirstSymbol( name );
        var getterMethodName;

        if( typeof this[ setterMethodName ] === 'function' ) {
            this[ setterMethodName ]( value );
        } else {
            if( this._isCollectionProperty( name ) ) {
                getterMethodName = 'get' + this._upperFirstSymbol( name );
                this[ getterMethodName ]().set( value );
            } else {
                throw new Error( 'expect that ' + setterMethodName + ' is setter function' );
            }
        }
    },

    /**
     *
     * @param propertyName
     * @return {boolean}
     * @private
     */
    _isCollectionProperty: function( propertyName ) {
        var getterMethodName = 'get' + this._upperFirstSymbol( propertyName );

        return ( typeof this[ getterMethodName ] === 'function' ) && this[ getterMethodName ]() instanceof Collection;
    },

    /**
     *
     * @param propertyName
     * @param handler
     */
    onPropertyChanged: function( propertyName, handler ) {
        var subscribingMethodName = 'on' + this._upperFirstSymbol( propertyName ) + 'Changed';

        if( typeof this[ subscribingMethodName ] === 'function' ) {
            this[ subscribingMethodName ]( handler );
        } else {
            this.control.on( 'change:' + propertyName, function( model, value ) {
                var parentView = this.getView(),
                    context = parentView ? parentView.getContext() : undefined,
                    args = {
                        property: propertyName,
                        oldValue: model.previous( propertyName ),
                        newValue: value
                    };
                handler( context, args );
            }.bind( this ) );
        }
    },

    /**
     * @returns {*}
     */
    getText: function() {
        return this.control.get( 'text' );
    },

    /**
     *
     * @param text
     */
    setText: function( text ) {
        if( typeof text !== 'undefined' ) {
            this.control.set( 'text', text );
        }
    },

    /**
     * @returns {*}
     */
    getEnabled: function() {
        return this.control.get( 'enabled' );
    },

    /**
     *
     * @param isEnabled
     */
    setEnabled: function( isEnabled ) {
        if( typeof isEnabled !== 'boolean' ) {
            return;
        }

        this.setState( 'Enabled', isEnabled );

        var parentEnabled = this.control.get( 'parentEnabled' );
        var old = this.control.get( 'enabled' );

        isEnabled = parentEnabled && isEnabled;

        if( isEnabled === old ) {
            return;
        }

        this.control.set( 'enabled', isEnabled );
        this.setParentEnabledOnChild( isEnabled );
    },

    /**
     *
     * @param value
     */
    setParentEnabledOnChild: function( value ) {
        var elements = this.getChildElements();

        if( _.isEmpty( elements ) === false ) {
            for( var i = 0, ln = elements.length; i < ln; i = i + 1 ) {
                if( typeof elements[ i ].setParentEnabled === 'undefined' ) {
                    continue;
                }
                elements[ i ].setParentEnabled( value );
            }
        }
    },

    /**
     *
     * @param value
     */
    setParentEnabled: function( value ) {
        if( typeof value !== 'boolean' ) {
            return;
        }

        var old = this.control.get( 'parentEnabled' );

        this.control.set( 'parentEnabled', value );

        if( old !== value ) {
            var enabled = value && this.getState( 'Enabled' );
            this.control.set( 'enabled', enabled );
            this.setParentEnabled( enabled );
            this.setParentEnabledOnChild( enabled );
        }
    },

    /**
     * @returns {*}
     */
    getVisible: function() {
        return this.control.get( 'visible' );
    },

    /**
     *
     * @param isVisible
     */
    setVisible: function( isVisible ) {
        if( typeof isVisible == 'boolean' ) {
            this.control.set( 'visible', isVisible );
        }
    },

    /**
     * @returns {*}
     */
    getStyle: function() {
        return this.control.get( 'style' );
    },

    /**
     *
     * @param style
     */
    setStyle: function( style ) {
        if( typeof style == 'string' ) {
            this.control.set( 'style', style );
        }
    },

    /**
     * @returns {*}
     */
    getTextHorizontalAlignment: function() {
        return this.control.get( 'textHorizontalAlignment' );
    },

    /**
     *
     * @param value
     */
    setTextHorizontalAlignment: function( value ) {
        if( InfinniUI.Metadata.isValidValue( value, InfinniUI.TextHorizontalAlignment ) ) {
            this.control.set( 'textHorizontalAlignment', value );
        }
    },

    /**
     * @returns {*}
     */
    getHorizontalAlignment: function() {
        return this.control.get( 'horizontalAlignment' );
    },

    /**
     *
     * @param horizontalAlignment
     */
    setHorizontalAlignment: function( horizontalAlignment ) {
        if( typeof horizontalAlignment == 'string' ) {
            this.control.set( 'horizontalAlignment', horizontalAlignment );
        }
    },

    /**
     * @returns {*}
     */
    getTextStyle: function() {
        return this.control.get( 'textStyle' );
    },

    /**
     *
     * @param textStyle
     */
    setTextStyle: function( textStyle ) {
        if( typeof textStyle == 'string' ) {
            this.control.set( 'textStyle', textStyle );
        }
    },

    /**
     * @returns {*}
     */
    getBackground: function() {
        return this.control.get( 'background' );
    },

    /**
     *
     * @param background
     */
    setBackground: function( background ) {
        if( typeof background == 'string' ) {
            this.control.set( 'background', background );
        }
    },

    /**
     * @returns {*}
     */
    getForeground: function() {
        return this.control.get( 'foreground' );
    },

    /**
     *
     * @param foreground
     */
    setForeground: function( foreground ) {
        if( typeof foreground == 'string' ) {
            this.control.set( 'foreground', foreground );
        }
    },

    /**
     *
     * @param handler
     */
    onLoaded: function( handler ) {
        this.control.onLoaded( handler );
    },

    /**
     *
     * @returns {*}
     */
    isLoaded: function() {
        return this.control.isLoaded();
    },

    /**
     * @returns {*}
     */
    getFocusable: function() {
        return this.control.get( 'focusable' );
    },

    /**
     *
     * @param value
     */
    setFocusable: function( value ) {
        if( typeof value === 'boolean' ) {
            this.control.set( 'focusable', value );
        }
    },

    /**
     * @returns {*}
     */
    getFocused: function() {
        return this.control.get( 'focused' );
    },

    /**
     *
     * @param value
     * @returns {*}
     */
    setFocused: function( value ) {
        //Установка фокуса вручную
        return this.control.setFocus();
    },

    /**
     *
     * @param handler
     */
    onLostFocus: function( handler ) {
        this.control.on( 'OnLostFocus', handler );
    },

    /**
     *
     * @param handler
     */
    onGotFocus: function( handler ) {
        this.control.on( 'OnGotFocus', handler );
    },

    /**
     *
     * @param value
     */
    setToolTip: function( value ) {
        this.control.set( 'toolTip', value );
    },

    /**
     * @returns {*}
     */
    getToolTip: function() {
        return this.control.get( 'toolTip' );
    },

    /**
     *
     * @param items
     */
    setContextMenu: function( items ) {
        this.control.set( 'contextMenu', items );
    },

    /**
     * @returns {*}
     * @param items
     */
    getContextMenu: function( items ) {
        return this.control.get( 'contextMenu' );
    },

    /**
     * @returns {*}
     */
    getIsLoaded: function() {
        return this.control.get( 'isLoaded' );
    },

    /**
     *
     */
    setIsLoaded: function() {
        this.control.set( 'isLoaded', true );
    },

    /**
     *
     * @param value
     */
    setTag: function( value ) {
        this.control.set( 'tag', value );
    },

    /**
     * @returns {*}
     */
    getTag: function() {
        return this.control.get( 'tag' );
    },

    /**
     * @returns {*}
     */

    render: function() {
        return this.control.render();
    },

    /**
     *
     */
    getWidth: function() {
    },

    /**
     *
     */
    getHeight: function() {
    },

    /**
     * @returns {*}
     */
    getScriptsStorage: function() {
        return this.getView();
    },

    /**
     * Установка состояния валидации элеменат
     * @param {String} [state="success"]
     * @param {String} [message]
     */
    setValidationState: function( state, message ) {
        this.control.set( 'validationMessage', message );
        this.control.set( 'validationState', state );
    },

    /**
     * Получение состояния валидации элеменат
     * @return {String} [state="success"]
     */
    getValidationState: function() {
        return this.control.get( 'validationState' );
    },

    /**
     *
     * @param name
     * @returns {*}
     */
    getState: function( name ) {
        return this.state[ name ];
    },

    /**
     *
     * @param name
     * @param value
     */
    setState: function( name, value ) {
        this.state[ name ] = value;
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onBeforeClick: function( handler ) {
        return this.control.onBeforeClick( handler );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onKeyDown: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingKeyEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onKeyDown( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onKeyUp: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingKeyEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onKeyUp( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onClick: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onClick( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onDoubleClick: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onDoubleClick( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onMouseDown: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onMouseDown( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onMouseUp: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onMouseUp( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onMouseEnter: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onMouseEnter( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onMouseLeave: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onMouseLeave( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onMouseMove: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onMouseMove( callback );
    },

    /**
     *
     * @param handler
     * @returns {*}
     */
    onMouseWheel: function( handler ) {
        var that = this;
        var callback = function( nativeEventData ) {
            var eventData = that._getHandlingMouseEventData( nativeEventData );
            handler( eventData );
        };

        return this.control.onMouseWheel( callback );
    },

    /**
     *
     * @param handler
     * @returns {*|CollectionEventManager|{name}}
     */
    onRemove: function( handler ) {
        return this.control.onRemove( this.createControlEventHandler( this, handler ) );
    },

    /**
     *
     * @param isInitiatedByParent
     * @param parent
     */
    remove: function( isInitiatedByParent, parent ) {
        var logger = InfinniUI.global.logger;
        if( this.isRemoved ) {
            logger.warn( 'Element.remove: Попытка удалить элемент, который уже был удален' );
            return;
        }

        var children = this.childElements;

        for( var i = 0, ii = children.length; i < ii; i++ ) {
            children[ i ].remove( true, this );
        }

        this.control.remove();

        if( this.parent && this.parent.removeChild && !isInitiatedByParent ) {
            if( this.parent.isRemoved ) {
                logger.warn( 'Element.remove: Попытка удалить элемент из родителя, который помечен как удаленный' );
            } else {
                this.parent.removeChild( this );
            }
        }

        if( parent && this.parent && this.parent.removeChild && isInitiatedByParent && parent !== this.parent ) {
            this.parent.removeChild( this );
        }

        this.isRemoved = true;

        this.childElements = undefined;
    },

    /**
     *
     * @param child
     */
    removeChild: function( child ) {
        var index = this.childElements.indexOf( child );

        if( index != -1 ) {
            this.childElements.splice( index, 1 );
        }
    },

    /**
     *
     * @param child
     */
    addChild: function( child ) {
        if( !this.isRemoved ) {
            this.childElements.push( child );

        } else {
            var logger = InfinniUI.global.logger;
            logger.warn( 'Element.addChild: Попытка добавить потомка в удаленный элемент' );
        }

    },

    /**
     *
     * @param element
     * @param handler
     * @param additionParams
     * @returns {Function}
     */
    createControlEventHandler: function( element, handler, additionParams ) {
        var context;
        var parentView = element.getView();
        additionParams = additionParams || {};

        if( parentView ) {
            context = parentView.context;
        }

        return function( message ) {
            message = message || {};
            _.extend(
                message,
                additionParams
            );
            message.source = element;

            return handler.call( undefined, context, message );
        };
    },

    /**
     *
     * @param nativeData
     * @returns {{source: Element, key: (jQuery.which|*|Object), altKey: (*|boolean), ctrlKey: (*|boolean), shiftKey: (*|boolean), nativeEventData: *}}
     * @private
     */
    _getHandlingKeyEventData: function( nativeData ) {
        return {
            source: this,
            key: nativeData.which,
            altKey: nativeData.altKey,
            ctrlKey: nativeData.ctrlKey,
            shiftKey: nativeData.shiftKey,
            nativeEventData: nativeData
        };
    },

    /**
     *
     * @param nativeData
     * @returns {{source: Element, button: (jQuery.which|*|Object), altKey: (*|boolean), ctrlKey: (*|boolean), shiftKey: (*|boolean), nativeEventData: *}}
     * @private
     */
    _getHandlingMouseEventData: function( nativeData ) {
        return {
            source: this,
            button: nativeData.which,
            altKey: nativeData.altKey,
            ctrlKey: nativeData.ctrlKey,
            shiftKey: nativeData.shiftKey,
            nativeEventData: nativeData
        };
    },

    /**
     *
     * @param s
     * @returns {string}
     * @private
     */
    _upperFirstSymbol: function( s ) {
        return s[ 0 ].toUpperCase() + s.substr( 1 );
    },

    /**
     *
     */
    setFocus: function() {
        this.control.setFocus();
    },

    /**
     *
     * @param textIndentOld
     */
    renderTree: function( textIndentOld ) {
        var textIndent = textIndentOld || '';

        console.log( textIndent + 'Name: ' + this.getName(), this );
        if( typeof this.childElements !== 'undefined' ) {
            if( textIndent !== '' ) {
                textIndent += '_____';
            } else {
                textIndent += '_____';
            }
            for( var i = 0, ii = this.childElements.length; i < ii; i += 1 ) {
                this.renderTree.call( this.childElements[ i ], textIndent );
            }
        }
    },

    /**
     *
     */
    renderFullTree: function() {
        var parent = this.parent;

        while( parent.parent && typeof parent.parent.parent !== 'undefined' ) {
            parent = parent.parent;
        }
        this.renderTree.call( parent );
    }

} );

InfinniUI.Element = Element;
