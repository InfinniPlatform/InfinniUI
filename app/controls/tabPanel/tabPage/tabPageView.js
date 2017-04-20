/**
 * @class
 * @augments ControlView
 */
var TabPageView = ContainerView.extend( /** @lends TabPageView.prototype */ {

    className: 'pl-tabpage hidden',

    template: InfinniUI.Template[ 'controls/tabPanel/tabPage/template/tabPage.tpl.html' ],

    UI: {

    },

    initHandlersForProperties: function() {
        ContainerView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:selected', this.updateSelected );
    },

    updateProperties: function() {
        ContainerView.prototype.updateProperties.call( this );
        this.updateSelected();
    },

    render: function() {
        this.prerenderingActions();

        this.removeChildElements();

        this.$el.html( this.template( {
            items: this.model.get( 'items' )
        } ) );
        this.renderItemsContents();

        this.bindUIElements();

        this.postrenderingActions();

        this.trigger( 'render' );
        this.updateProperties();
        //devblockstart
        window.InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    renderItemsContents: function() {
        var $items = this.$el.find( '.pl-tabpage-i' ),
            items = this.model.get( 'items' ),
            itemTemplate = this.model.get( 'itemTemplate' ),
            that = this,
            element, item;

        $items.each( function( i, el ) {
            item = items.getByIndex( i );
            element = itemTemplate( undefined, { item: item, index: i } );
            that.addChildElement( element );
            $( el )
                .append( element.render() );
        } );
    },

    updateSelected: function() {
        var selected = this.model.get( 'selected' );
        this.$el.toggleClass( 'hidden', !selected );
    },

    /**
     * @protected
     */
    updateGrouping: function() {

    }

} );
