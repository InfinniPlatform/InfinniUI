/**
 * @description Базовый класс контролов
 * @class Control
 */
var Control = function( viewMode ) {
    this.controlModel = this.createControlModel();
    this.controlView = this.createControlView( this.controlModel, viewMode );

    this.initHandlers();
};

_.extend( Control.prototype, {

    createControlModel: function() {
        throw ( 'Не перегружен абстрактный метод Control.createControlModel()' );
    },

    createControlView: function( model, viewMode ) {
        throw ( 'Не перегружен абстрактный метод Control.createControlView()' );
    },

    initHandlers: function() {
        this.controlView.on( 'onLoaded', function() {
            this.controlModel.set( 'isLoaded', true );
        }, this );
    },

    set: function( key, value ) {
        this.controlModel.set( key, value );
    },

    get: function( key ) {
        return this.controlModel.get( key );
    },

    on: function( name, handler ) {
        return this.controlModel.on( name, handler );
    },

    render: function() {
        return this.controlView.render().$el;
    },

    getChildElements: function() {
        return [];
    },

    onLoaded: function( handler ) {
        this.controlModel.on( 'change:isLoaded', function( isLoaded ) {
            if( isLoaded ) {
                handler();
            }
        } );
    },

    isLoaded: function() {
        return this.controlModel.get( 'isLoaded' );
    },

    onBeforeClick: function( handler ) {
        this.controlView.on( 'beforeClick', handler );
    },

    onClick: function( handler ) {
        this.controlView.$el.on( 'click', handler );
    },

    onDoubleClick: function( handler ) {
        this.controlView.$el.on( 'dblclick', handler );
    },

    onMouseDown: function( handler ) {
        this.controlView.$el.on( 'mousedown', handler );
    },

    onMouseUp: function( handler ) {
        this.controlView.$el.on( 'mouseup', handler );
    },

    onMouseEnter: function( handler ) {
        this.controlView.$el.on( 'mouseenter', handler );
    },

    onMouseLeave: function( handler ) {
        this.controlView.$el.on( 'mouseleave', handler );
    },

    onMouseMove: function( handler ) {
        this.controlView.$el.on( 'mousemove', handler );
    },

    onMouseWheel: function( handler ) {
        this.controlView.$el.on( 'mousewheel DOMMouseScroll', handler );
    },

    onKeyDown: function( handler ) {
        this.controlView.$el.on( 'keydown', handler );
    },

    onKeyUp: function( handler ) {
        this.controlView.$el.on( 'keyup', handler );
    },

    onRemove: function( handler ) {
        this.controlView.on( messageTypes.onRemove.name, handler );
    },

    remove: function() {
        this.controlView.remove();
    },

    setFocus: function() {
        this.controlView.setFocus();
    }

} );

InfinniUI.Control = Control;
