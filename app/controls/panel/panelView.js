/**
 * @class
 * @augments ControlView
 */
var PanelView = ContainerView.extend( /** @lends PanelView.prototype */ {

    className: 'pl-panel panel panel-default',

    template: InfinniUI.Template[ 'controls/panel/template/panel.tpl.html' ],

    UI: {
        header: '.pl-panel-header',
        items: '.panel-items'
    },

    events: {
        'click >.pl-panel-header': 'onClickHeaderHandler'
    },

    initialize: function( options ) {
        ContainerView.prototype.initialize.call( this, options );
    },

    render: function() {
        this.prerenderingActions();

        this.removeChildElements();

        this.$el.html( this.template( {
            items: this.model.get( 'items' )
        } ) );

        this.bindUIElements();

        this.renderItemsContents();

        this.trigger( 'render' );
        this.updateProperties();

        this.postrenderingActions();
        //devblockstart
        window.InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    initHandlersForProperties: function() {
        ContainerView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:collapsed', this.updateCollapsed );
        this.listenTo( this.model, 'change:collapsible', this.updateCollapsible );
        this.listenTo( this.model, 'change:header', this.updateHeader );
        this.listenTo( this.model, 'change:headerTemplate', this.updateHeader );
    },

    updateProperties: function() {
        ContainerView.prototype.updateProperties.call( this );
        this.updateCollapsed();
        this.updateCollapsible();
        this.updateHeader();
    },

    updateCollapsed: function() {
        this.ui.header.toggleClass( 'pl-collapsed', this.model.get( 'collapsed' ) );
    },

    updateCollapsible: function( model, value ) {
        this.ui.header.toggleClass( 'pl-collapsible', this.model.get( 'collapsible' ) );
    },

    updateHeader: function() {
        var model = this.model;

        this.ui.header.empty();
        var headerTemplate = model.get( 'headerTemplate' );
        if( typeof headerTemplate === 'function' ) {
            var header = model.get( 'header' ),
                $header = headerTemplate( null, { value: header } ).render();

            this.ui.header.show();
            this.ui.header.append( $header );

        } else {
            this.ui.header.hide();
        }
    },

    renderItemsContents: function() {
        var $items = this.$el.find( '.pl-panel-i' );
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

    updateGrouping: function() {

    },

    onEventCallback: function() {
        var collapsible = this.model.get( 'collapsible' );

        if( collapsible ) {
            var collapsed = this.model.get( 'collapsed' );
            this.model.set( 'collapsed', !collapsed );
            this.updateLayout();
        }
    },

    onClickHeaderHandler: function( event ) {
        var collapseChanger = this.model.get( 'collapseChanger' );

        if( collapseChanger !== '' ) {
            if( $( event.target ).closest( '[data-pl-name=' + collapseChanger + ']' ).length ) {
                this.onEventCallback();
            }
        } else {
            this.onEventCallback();
        }
    }

} );
