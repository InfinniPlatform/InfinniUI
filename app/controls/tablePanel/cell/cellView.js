/**
 * @class
 * @augments ControlView
 */
var CellView = ContainerView.extend(
    /** @lends CellView.prototype */
    {
        className: 'pl-cell',

        initialize: function( options ) {
            ContainerView.prototype.initialize.call( this, options );

            this.initColumnSpan();
        },

        render: function() {
            this.prerenderingActions();

            this.removeChildElements();

            this.renderItemsContents();

            this.updateProperties();
            this.trigger( 'render' );

            this.postrenderingActions();
            //devblockstart
            window.InfinniUI.global.messageBus.send( 'render', { element: this } );
            //devblockstop
            return this;
        },

        renderItemsContents: function() {
            var items = this.model.get( 'items' ),
                itemTemplate = this.model.get( 'itemTemplate' ),
                that = this,
                element, item;

            items.forEach( function( item, i ) {
                element = itemTemplate( undefined, { item: item, index: i } );
                that.addChildElement( element );
                that.$el
                    .append( element.render() );
            } );
        },

        initColumnSpan: function() {
            this.listenTo( this.model, 'change:columnSpan', this.updateColumnSpan );
            this.updateColumnSpan();
        },

        updateColumnSpan: function() {
            var columnSpan = this.model.get( 'columnSpan' ),
                currentColumnSpan = this.columnSpan;

            if( columnSpan != currentColumnSpan ) {

                if( currentColumnSpan ) {
                    this.$el
                        .removeClass( 'col-xs-' + currentColumnSpan );
                }

                this.$el
                    .addClass( 'col-xs-' + columnSpan );

                this.columnSpan = columnSpan;
            }
        },

        updateGrouping: function() {
        }
    }
);
