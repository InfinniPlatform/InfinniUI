/**
 * @class
 * @augments Backbone.View
 */
var ControlView = Backbone.View.extend( {

    initialize: function() {
        this.wasRendered = false;
        this.once( 'render', this.initHandlersForProperties, this );
        this._initDomHandlers();
    },

    classNameFocused: 'pl-focused',

    _initDomHandlers: function() {
        var view = this;
        var $el = this.$el;

        $el[ 0 ].addEventListener( 'click', function( event ) {
            view.trigger( 'beforeClick', null, { value: event } );
        }, true );
    },

    initHandlersForProperties: function() {
        this.listenTo( this.model, 'change:visible', this.updateVisible );
        this.listenTo( this.model, 'change:horizontalAlignment', this.updateHorizontalAlignment );
        this.listenTo( this.model, 'change:textHorizontalAlignment', this.updateTextHorizontalAlignment );
        this.listenTo( this.model, 'change:enabled', this.updateEnabled );
        this.listenTo( this.model, 'change:name', this.updateName );
        this.listenTo( this.model, 'change:style', this.updateStyle );
        this.listenTo( this.model, 'change:text', this.updateText );
        this.listenTo( this.model, 'change:textStyle', this.updateTextStyle );
        this.listenTo( this.model, 'change:background', this.updateBackground );
        this.listenTo( this.model, 'change:foreground', this.updateForeground );
        this.listenTo( this.model, 'change:validationState', this.updateValidationState );
        this.listenTo( this.model, 'change:focusable', this.updateFocusable );
        this.listenTo( this.model, 'change:focused', this.updateFocused );

        this.initFocusHandlers();
    },

    initFocusHandlers: function() {
        var $el = this.$el;
        var view = this;
        var model = this.model;

        $el
            .on( 'focusin', onFocusIn )
            .on( 'focusout', onFocusOut );

        function onFocusIn( event ) {
            model.set( 'focused', true );
        }

        function onFocusOut( event ) {
            if( view.isControlElement( event.relatedTarget ) ) {
                //focus out to element inside control
                model.set( 'focused', true );
            } else {
                //focus out
                model.set( 'focused', false );
            }
        }
    },

    isControlElement: function( el ) {
        return this.el === el || $.contains( this.el, el );
    },

    updateProperties: function() {
        this.updateVisible();
        this.updateTextHorizontalAlignment();
        this.updateHorizontalAlignment();
        this.updateEnabled();
        this.updateName();
        this.updateText();
        this.updateStyle();
        this.updateTextStyle();
        this.updateBackground();
        this.updateForeground();
        this.updateValidationState();
        this.updateFocusable();
        this.updateFocused();
        this.updateViewMode();
    },

    /**
     * @description Изменяет контрол в соответсвии со значением focusable. Напр. добавить tabindex="0"
     */
    updateFocusable: function() {
    },

    /**
     * @description Возвращает элемент, который должен получить фокус
     */
    getElementForFocus: function() {
        return this.$el;
    },

    updateFocused: function() {
        var focused = this.model.get( 'focused' );

        if( focused ) {
            var $el = this.getElementForFocus();
            if( $el && $el.length ) {
                //$el.focus();
            }
        }
        this.$el.toggleClass( this.classNameFocused, focused );
    },


    onFocusHandler: function( event ) {
    },


    updateVisible: function() {
        var isVisible = this.model.get( 'visible' );
        this.$el.toggleClass( 'hidden', !isVisible );

        this.onUpdateVisible();
    },

    onUpdateVisible: function() {
        this.updateLayout();
    },

    updateLayout: function() {
        var exchange = InfinniUI.global.messageBus;
        exchange.send( 'OnChangeLayout', {} );
    },

    updateEnabled: function() {
        var isEnabled = this.model.get( 'enabled' );
        this.$el.toggleClass( 'pl-disabled', !isEnabled );
    },

    updateTextHorizontalAlignment: function() {
        this.switchClass( 'pl-text-horizontal', this.model.get( 'textHorizontalAlignment' ) );
    },

    updateHorizontalAlignment: function() {
        this.switchClass( 'pl-horizontal', this.model.get( 'horizontalAlignment' ) );
    },

    updateName: function() {
        var newName = this.model.get( 'name' );
        var currentName = this.$el.attr( 'data-pl-name' );

        if( newName != currentName && typeof newName == 'string' ) {
            this.$el.attr( 'data-pl-name', newName );
        }
    },

    updateText: function() {
    },

    updateTextStyle: function() {
        var customStyle = this.model.get( 'textStyle' );

        this.changeElementClass( this.valueToTextClassName( this.currentTextStyle ), this.valueToTextClassName( customStyle ) );
        this.currentTextStyle = customStyle;
    },

    updateBackground: function() {
        var customStyle = this.model.get( 'background' );

        this.changeElementClass( this.valueToBackgroundClassName( this.currentBackground ), this.valueToBackgroundClassName( customStyle ) );
        this.currentBackground = customStyle;
    },

    updateForeground: function() {
        var customStyle = this.model.get( 'foreground' );

        this.changeElementClass( this.valueToForegroundClassName( this.currentForeground ), this.valueToForegroundClassName( customStyle ) );
        this.currentForeground = customStyle;
    },

    updateStyle: function() {
        var customStyle = this.model.get( 'style' );

        this.changeElementClass( this.currentStyle, customStyle );
        this.currentStyle = customStyle;
    },

    changeElementClass: function( oldClass, newClass ) {
        if( oldClass ) {
            this.$el.removeClass( oldClass );
        }

        if( newClass ) {
            this.$el.addClass( newClass );
        }
    },

    updateViewMode: function() {
        if( this.viewMode == 'FormGroup' ) {
            this.$el.addClass( 'pl-form-group' );
        }
    },

    updateValidationState: function() {
        var newState = this.model.get( 'validationState' );
        var message = this.model.get( 'validationMessage' );

        switch( newState ) {
            case 'success':
                this.$el
                    .removeClass( 'has-warning has-error' );
                this.hideErrorMessage();
                break;

            case 'warning':
                this.$el
                    .removeClass( 'has-error' )
                    .addClass( 'has-warning' );
                this.showErrorMessage( message );
                break;

            case 'error':
                this.$el
                    .removeClass( 'has-warning' )
                    .addClass( 'has-error' );
                this.showErrorMessage( message );
                break;

            default:
                break;
        }
    },

    showErrorMessage: function( message ) {
        var $errorIcn = $( _.template( '<i class="2 error-icn fa fa-warning" data-placement="left" title="<%-message%>"></i>' )( { message: message } ) );

        this.hideErrorMessage();
        this.$el
            .find( '.form-control:first' )
            .before( $errorIcn );

        $errorIcn.tooltip( { 'container': 'body' } );
    },

    hideErrorMessage: function() {
        this.$el
            .find( '.error-icn' )
            .remove();
    },

    rerender: function() {
        if( this.wasRendered ) {
            this.render();
        }
    },

    prerenderingActions: function() {
        this.wasRendered = true;
    },

    /**
     *
     * @param {Boolean} triggeringOnLoaded [onLoaded=true]
     */
    postrenderingActions: function( triggeringOnLoaded ) {
        this.delegateEvents();

        triggeringOnLoaded = triggeringOnLoaded === undefined ? true : triggeringOnLoaded;

        if( triggeringOnLoaded ) {
            this.trigger( 'onLoaded' );
        }
    },

    remove: function() {
        this.trigger( messageTypes.onRemove.name );
        Backbone.View.prototype.remove.apply( this, Array.prototype.slice.call( arguments ) );
    },

    switchClass: function( name, value, $el, separator ) {
        if( typeof separator === 'undefined' ) {
            separator = '-';
        } else if( separator === false ) {
            separator = '';
        }

        var startWith = name + separator;
        var regexp = new RegExp( '(^|\\s)' + startWith + '\\S+', 'ig' );
        var $element = $el || this.$el;
        $element.removeClass( function( i, name ) {
            return ( name.match( regexp ) || [] ).join( ' ' );
        } ).addClass( startWith + value );
    },

    valueToBackgroundClassName: function( value ) {
        if( value ) return 'pl-' + value.toLowerCase() + '-bg';
        else return '';
    },

    valueToForegroundClassName: function( value ) {
        if( value ) return 'pl-' + value.toLowerCase() + '-fg';
        else return '';
    },

    valueToTextClassName: function( value ) {
        if( value ) return 'pl-' + value.toLowerCase();
        else return '';
    },

    renderTemplate: function( template ) {
        var data = this.getData();

        this.$el.html( template( data ) );
        this.bindUIElements();
    },

    getData: function() {
        var model = this.model;

        return {
            name: model.get( 'name' ),
            text: model.get( 'text' ),
            focusable: model.get( 'focusable' ),
            focused: model.get( 'focused' ),
            enabled: model.get( 'enabled' ),
            visible: model.get( 'visible' ),
            horizontalAlignment: model.get( 'horizontalAlignment' ),
            textHorizontalAlignment: model.get( 'textHorizontalAlignment' ),
            textVerticalAlignment: model.get( 'textVerticalAlignment' ),
            textStyle: model.get( 'textStyle' ),
            foreground: model.get( 'foreground' ),
            background: model.get( 'background' )
        };
    },

    setFocus: function() {
        this.$el.focus();
    }

} );

_.extend( ControlView.prototype, bindUIElementsMixin, eventHandlerMixin );

InfinniUI.ControlView = ControlView;
