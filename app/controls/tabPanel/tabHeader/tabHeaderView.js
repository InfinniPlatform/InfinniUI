/**
 * @constructor
 * @augments Backbone.Model
 */
var TabHeaderModel = Backbone.Model.extend( {

    defaults: {
        text: '',
        enabled: true,
        canClose: false
    }

} );

InfinniUI.TabHeaderModel = TabHeaderModel;

/**
 * @constructor
 * @augments Backbone.View
 * @mixes bindUIElementsMixin
 */
var TabHeaderView = Backbone.View.extend( {

    className: 'pl-tabheader',

    tagName: 'li',

    template: InfinniUI.Template[ 'controls/tabPanel/tabHeader/template/tabHeader.tpl.html' ],

    events: {
        'click': 'onClickHandler',
        'click .pl-close': 'onClickCloseHandler'
    },

    UI: {
        label: '.pl-tabheader-text',
        close: '.pl-close'
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        this.model = new TabHeaderModel( options );

        this.on( 'rendered', this.onRenderedHandler );
    },

    /**
     *
     * @returns {TabHeaderView}
     */
    render: function() {
        this.$el.html( this.template );
        this.bindUIElements();
        this.trigger( 'rendered' );
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    /**
     *
     * @param {string} value
     */
    setText: function( value ) {
        this.model.set( 'text', value );
    },

    /**
     *
     * @param {boolean} value
     */
    setCanClose: function( value ) {
        this.model.set( 'canClose', value );
    },

    /**
     *
     * @param {boolean} value
     */
    setSelected: function( value ) {
        this.model.set( 'selected', value );
    },

    /**
     *
     * @param value
     */
    setEnabled: function( value ) {
        this.model.set( 'enabled', value );
    },

    /**
     * @protected
     */
    updateProperties: function() {
        this.updateTextHandler();
        this.updateCanClose();
        this.updateSelectedHandler();
        this.updateEnabled();
    },

    /**
     * @protected
     */
    onRenderedHandler: function() {
        this.updateProperties();
        this.listenTo( this.model, 'change:text', this.updateTextHandler );
        this.listenTo( this.model, 'change:selected', this.updateSelectedHandler );
        this.listenTo( this.model, 'change:canClose', this.updateCanClose );
        this.listenTo( this.model, 'change:enabled', this.updateProperties ); // нужно обновлять все свойства
    },

    /**
     * @protected
     */
    updateTextHandler: function() {
        var text = this.model.get( 'text' );

        this.ui.label.text( text );
    },

    /**
     * @protected
     */
    updateCanClose: function() {
        var canClose = this.model.get( 'canClose' );

        this.ui.close.toggleClass( 'hidden', !canClose );
    },

    /**
     * @protected
     */
    updateSelectedHandler: function() {
        var selected = this.model.get( 'selected' );

        this.$el.toggleClass( 'pl-active active', selected );
    },

    /**
     *
     */
    updateEnabled: function() {
        var isEnabled = this.model.get( 'enabled' );

        this.$el.toggleClass( 'pl-disabled', !isEnabled );
    },

    /**
     *
     * @param event
     */
    onClickHandler: function( event ) {
        this.trigger( 'selected' );
    },

    /**
     *
     * @param event
     */
    onClickCloseHandler: function( event ) {
        event.stopPropagation();
        this.trigger( 'close' );
    }

} );

_.extend( TabHeaderView.prototype, bindUIElementsMixin );

InfinniUI.TabHeaderView = TabHeaderView;
