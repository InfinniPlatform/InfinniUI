/**
 * @constructor
 * @augments ControlView
 */
var StackPanelView = ContainerView.extend( {

    tagName: 'ul',

    className: 'pl-stack-panel pl-clearfix',

    template: {
        plain: InfinniUI.Template[ 'controls/stackPanel/baseView/template/stackPanel.tpl.html' ],
        grouped: InfinniUI.Template[ 'controls/stackPanel/baseView/template/stackPanelGrouped.tpl.html' ]
    },

    UI: {
        items: '.stackpanel-items'
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ContainerView.prototype.initialize.call( this, options );

        this.initOrientation();
    },

    /**
     *
     */
    updateGrouping: function() {
        var groupValueSelector = this.model.get( 'groupValueSelector' );
        var isGrouped = groupValueSelector !== null && typeof groupValueSelector !== 'undefined';

        if( isGrouped ) {
            this.strategy = new StackPanelViewGroupStrategy( this );
        } else {
            this.strategy = new StackPanelViewPlainStrategy( this );
        }
    },

    /**
     *
     * @returns {StackPanelView}
     */
    render: function() {
        this.prerenderingActions();

        this.removeChildElements();

        var preparedItems = this.strategy.prepareItemsForRendering();
        var template = this.strategy.getTemplate();

        this.$el.html( template( preparedItems ) );

        this.strategy.appendItemsContent( preparedItems );

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
    initOrientation: function() {
        this.listenTo( this.model, 'change:orientation', this.updateOrientation );
        this.updateOrientation();
    },

    /**
     *
     */
    updateOrientation: function() {
        var orientation = this.model.get( 'orientation' );
        this.$el.toggleClass( 'horizontal-orientation', orientation == 'Horizontal' );
        this.$el.toggleClass( 'pl-stack-panel_horizontal', orientation == 'Horizontal' );
    },

    /**
     * @returns {*}
     */
    getItems: function() {
        return this.model.get( 'items' );
    },

    /**
     * @returns {*}
     */
    getItemTemplate: function() {
        return this.model.get( 'itemTemplate' );
    },

    /**
     * @returns {*}
     */
    getGroupValueSelector: function() {
        return this.model.get( 'groupValueSelector' );
    },

    /**
     * @returns {*}
     */
    getGroupItemTemplate: function() {
        return this.model.get( 'groupItemTemplate' );
    }

} );

InfinniUI.StackPanelView = StackPanelView;
