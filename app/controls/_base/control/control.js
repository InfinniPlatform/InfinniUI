/**
 * @description Базовый класс контролов
 * @class Control
 * @param viewMode
 * @constructor
 */
var Control = function( viewMode ) {
    this.controlModel = this.createControlModel();
    this.controlView = this.createControlView( this.controlModel, viewMode );
    this.initHandlers();
};

_.extend( Control.prototype, {

    /**
     *
     */
    createControlModel: function() {
        throw ( 'Не перегружен абстрактный метод Control.createControlModel()' );
    },

    /**
     *
     * @param model
     * @param viewMode
     */
    createControlView: function( model, viewMode ) {
        throw ( 'Не перегружен абстрактный метод Control.createControlView()' );
    },

    /**
     *
     */
    initHandlers: function() {
        this.controlView.on( 'onLoaded', function() {
            this.controlModel.set( 'isLoaded', true );
        }, this );
    },

    /**
     *
     * @param key
     * @param value
     */
    set: function( key, value ) {
        this.controlModel.set( key, value );
    },

    /**
     *
     * @param key
     * @returns {*}
     */
    get: function( key ) {
        return this.controlModel.get( key );
    },

    /**
     *
     * @param name
     * @param handler
     * @returns {*}
     */
    on: function( name, handler ) {
        return this.controlModel.on( name, handler );
    },

    /**
     *
     * @returns {*}
     */
    render: function() {
        return this.controlView.render().$el;
    },

    /**
     *
     * @returns {Array}
     */
    getChildElements: function() {
        return [];
    },

    /**
     *
     * @param handler
     */
    onLoaded: function( handler ) {
        this.controlModel.on( 'change:isLoaded', function( isLoaded ) {
            if( isLoaded ) {
                handler();
            }
        } );
    },

    /**
     *
     * @returns {*}
     */
    isLoaded: function() {
        return this.controlModel.get( 'isLoaded' );
    },

    /**
     *
     * @param handler
     */
    onBeforeClick: function( handler ) {
        this.controlView.on( 'beforeClick', handler );
    },

    /**
     *
     * @param handler
     */
    onClick: function( handler ) {
        this.controlView.$el.on( 'click', handler );
    },

    /**
     *
     * @param handler
     */
    onDoubleClick: function( handler ) {
        this.controlView.$el.on( 'dblclick', handler );
    },

    /**
     *
     * @param handler
     */
    onMouseDown: function( handler ) {
        this.controlView.$el.on( 'mousedown', handler );
    },

    /**
     *
     * @param handler
     */
    onMouseUp: function( handler ) {
        this.controlView.$el.on( 'mouseup', handler );
    },

    /**
     *
     * @param handler
     */
    onMouseEnter: function( handler ) {
        this.controlView.$el.on( 'mouseenter', handler );
    },

    /**
     *
     * @param handler
     */
    onMouseLeave: function( handler ) {
        this.controlView.$el.on( 'mouseleave', handler );
    },

    /**
     *
     * @param handler
     */
    onMouseMove: function( handler ) {
        this.controlView.$el.on( 'mousemove', handler );
    },

    /**
     *
     * @param handler
     */
    onMouseWheel: function( handler ) {
        this.controlView.$el.on( 'mousewheel DOMMouseScroll', handler );
    },

    /**
     *
     * @param handler
     */
    onKeyDown: function( handler ) {
        this.controlView.$el.on( 'keydown', handler );
    },

    /**
     *
     * @param handler
     */
    onKeyUp: function( handler ) {
        this.controlView.$el.on( 'keyup', handler );
    },

    /**
     *
     * @param handler
     */
    onRemove: function( handler ) {
        this.controlView.on( messageTypes.onRemove.name, handler );
    },

    /**
     *
     */
    remove: function() {
        this.controlView.remove();
    },

    /**
     *
     */
    setFocus: function() {
        this.controlView.setFocus();
    }

} );

InfinniUI.Control = Control;
