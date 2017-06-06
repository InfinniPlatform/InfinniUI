/**
 * @class
 * @augments ControlView
 */
var ScrollPanelView = ContainerView.extend( {

    className: 'pl-scrollpanel panel panel-default',

    template: InfinniUI.Template[ 'controls/scrollPanel/template/scrollPanel.tpl.html' ],

    UI: {},

    initialize: function( options ) {
        ContainerView.prototype.initialize.call( this, options );
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

        ( function( $el ) {
            //Firefox сохраняет позицию прокрутки. Принудительно крутим в начало.
            setTimeout( function() {
                $el.scrollTop( 0 );
            }, 0 );
        } )( this.$el );
        //devblockstart
        InfinniUI.global.messageBus.send( 'render', { element: this } );
        //devblockstop
        return this;
    },

    initHandlersForProperties: function() {
        ContainerView.prototype.initHandlersForProperties.call( this );
        this.listenTo( this.model, 'change:horizontalScroll', this.updateHorizontalScroll );
        this.listenTo( this.model, 'change:verticalScroll', this.updateVerticalScroll );
    },

    updateProperties: function() {
        ContainerView.prototype.updateProperties.call( this );
        this.updateHorizontalScroll();
        this.initVerticalScroll();
    },

    /**
     * @protected
     * @description Set one of CSS class: "pl-horizontal-scroll-(visible|hidden|auto)",
     */
    updateHorizontalScroll: function() {
        var name = '';

        switch( this.model.get( 'horizontalScroll' ) ) {
            case InfinniUI.ScrollVisibility.visible:
                name = 'visible';
                break;
            case InfinniUI.ScrollVisibility.hidden:
                name = 'hidden';
                break;
            case InfinniUI.ScrollVisibility.auto:
            default:
                name = 'auto';
                break;
        }
        this.switchClass( 'pl-horizontal-scroll', name, this.$el );
    },

    /**
     * @protected
     * @description Set one of CSS class: "pl-vertical-scroll-(visible|hidden|auto)",
     */
    initVerticalScroll: function() {
        var verticalScrollType = this.model.get( 'verticalScroll' );

        if( verticalScrollType !== InfinniUI.ScrollVisibility.hidden ) {
            this.$el.addClass( 'pl-adaptable-by-height' );
        }

        // setVerticalScroll уже проверил, что значение валидно
        this.switchClass( 'pl-vertical-scroll', verticalScrollType.toLowerCase(), this.$el );
    },

    updateVerticalScroll: function() {
        this.$el.height( '' );
        this.$el.removeClass( 'pl-adaptable-by-height' );

        this.initVerticalScroll();

        var $parentView = this.$el.closest( '.pl-view' );
        InfinniUI.AutoHeightService.recalculation( $parentView );
    },

    renderItemsContents: function() {
        var $items = this.$el.find( '.pl-scrollpanel-i' );
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
    }

} );

InfinniUI.ScrollPanelView = ScrollPanelView;
