/**
 * @constructor
 * @augments ContainerView
 */
var RowView = ContainerView.extend( {

    className: 'pl-row row',

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ContainerView.prototype.initialize.call( this, options );
    },

    /**
     *
     * @returns {RowView}
     */
    render: function() {
        this.prerenderingActions();

        this.removeChildElements();

        this.renderItemsContents();

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
        var items = this.model.get( 'items' );
        var itemTemplate = this.model.get( 'itemTemplate' );
        var that = this;
        var element;

        items.forEach( function( item, i ) {
            element = itemTemplate( undefined, { item: item, index: i } );
            that.addChildElement( element );
            that.$el
                .append( element.render() );
        } );
    },

    /**
     *
     */
    updateGrouping: function() {
    }

} );

InfinniUI.RowView = RowView;
