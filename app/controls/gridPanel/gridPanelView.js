/**
 * @constructor
 * @augments ContainerView
 */
var GridPanelView = ContainerView.extend( {

    className: 'pl-grid-panel pl-clearfix',

    columnCount: 12,

    template: {
        row: InfinniUI.Template[ 'controls/gridPanel/template/row.tpl.html' ]
    },

    /**
     *
     * @param options
     */
    initialize: function( options ) {
        ContainerView.prototype.initialize.call( this, options );
    },

    /**
     *
     * @returns {GridPanelView}
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
        var view = this;
        var row = [];
        var rowSize = 0;
        var element;

        items.forEach( function( item, i ) {
            element = itemTemplate( undefined, { item: item, index: i } );
            var span = element.getColumnSpan();
            if( rowSize + span > view.columnCount ) {
                view.renderRow( row );
                row.length = 0;
                rowSize = 0;
            }

            row.push( element );
            rowSize += span;
        } );

        if( row.length ) {
            view.renderRow( row );
        }
    },

    /**
     *
     * @param row
     */
    renderRow: function( row ) {
        var view = this;
        var $row = $( '<div class="pl-clearfix"></div>' );

        $row.append( row.map( function( element ) {
            view.addChildElement( element );
            return element.render();
        } ) );
        this.$el.append( $row );
    },

    /**
     *
     */
    updateGrouping: function() {
    }

} );

InfinniUI.GridPanelView = GridPanelView;
