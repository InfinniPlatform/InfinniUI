/**
 * @constructor
 * @augments ContainerView
 */
var MenuBarView = ContainerView.extend( {

    tagName: 'nav',

    className: 'pl-menu-bar navbar navbar-default',

    template: InfinniUI.Template[ 'controls/menuBar/template/menuBar.tpl.html' ],

    UI: {},

    /**
     *
     * @returns {MenuBarView}
     */
    render: function() {
        this.prerenderingActions();

        this.removeChildElements();

        this.$el.html( this.template( {
            items: this.model.get( 'items' )
        } ) );
        this.renderItemsContents();

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
    renderItemsContents: function() {
        var $items = this.$el.find( '.pl-menu-bar-item' );
        var items = this.model.get( 'items' );
        var itemTemplate = this.model.get( 'itemTemplate' );
        var that = this;
        var element, item;

        $items.each( function( i, el ) {
            item = items.getByIndex( i );
            element = itemTemplate( undefined, { item: item, index: i } );
            that.addChildElement( element );
            $( el )
                .append( element.render() );
        } );
    },

    /**
     *
     */
    updateGrouping: function() {
    }

} );

InfinniUI.MenuBarView = MenuBarView;
