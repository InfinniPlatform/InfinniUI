/**
 * @constructor
 * @augments StackPanelView
 */
var FormView = StackPanelView.extend( {

    className: 'pl-form',

    tagName: 'form',

    template: {
        plain: InfinniUI.Template[ 'controls/form/template/form.tpl.html' ]
    },

    events: {
        'submit': 'onSubmit'
    },

    /**
     *
     * @param e
     */
    onSubmit: function( e ) {
        e.preventDefault();
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        StackPanelView.prototype.initialize.call( this, options );

        this.listenTo( this.model, 'change:method', this.updateMethod );
        this.listenTo( this.model, 'change:action', this.updateAction );
    },

    /**
     *
     */
    updateGrouping: function() {
        this.strategy = new StackPanelViewPlainStrategy( this );
    },

    /**
     *
     * @returns {FormView}
     */
    render: function() {
        this.prerenderingActions();

        this.removeChildElements();

        var preparedItems = this.strategy.prepareItemsForRendering();
        var template = this.strategy.getTemplate();

        this.$el.html( template( preparedItems ) );

        this.strategy.appendItemsContent( preparedItems, '.pl-form-i' );

        this.bindUIElements();
        this.updateProperties();
        this.trigger( 'render' );

        this.postrenderingActions();

        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop

        return this;
    },

    /**
     *
     */
    updateProperties: function() {
        StackPanelView.prototype.updateProperties.call( this );

        this.updateMethod();
        this.updateAction();
    },

    /**
     *
     */
    updateMethod: function() {
        var method = this.model.get( 'method' );

        this.$el.attr( 'method', method );
    },

    /**
     *
     */
    updateAction: function() {
        var action = this.model.get( 'action' );

        this.$el.attr( 'action', action );
    }

} );

InfinniUI.FormView = FormView;
