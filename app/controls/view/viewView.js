/**
 * @constructor
 * @augments ContainerView
 */
var ViewView = ContainerView.extend( {

    className: 'pl-view',

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ContainerView.prototype.initialize.call( this, options );
    },

    /**
     *
     * @returns {ViewView}
     */
    render: function() {
        this.prerenderingActions();

        this.$el.empty();

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
        var that = this;
        var items = this.model.get( 'items' );
        var itemTemplate = this.model.get( 'itemTemplate' );
        var element;

        items.forEach( function( item, i ) {
            element = itemTemplate( undefined, { item: item, index: i } );
            if( element ) {
                that.$el
                    .append( element.render() );
            }
        } );
    },

    /**
     *
     */
    updateGrouping: function() {
    }

} );

InfinniUI.ViewView = ViewView;
