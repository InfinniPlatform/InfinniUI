/**
 * @constructor
 * @augments ContainerView
 */
var ToolBarView = ContainerView.extend( {

    className: 'pl-tool-bar',

    template: InfinniUI.Template[ 'controls/toolBar/template/toolBar.tpl.html' ],

    itemTemplate: InfinniUI.Template[ 'controls/toolBar/template/toolBarItem.tpl.html' ],

    UI: {
        container: '.pl-tool-bar__container'
    },

    /**
     *
     * @return {ToolBarView}
     */
    render: function() {
        this.prerenderingActions();

        this.renderTemplate( this.template );
        this.ui.container.append( this.renderItems() );
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
     * @return {Array}
     */
    renderItems: function() {
        var model = this.model;
        var items = model.get( 'items' );
        var itemTemplate = model.get( 'itemTemplate' );

        this.removeChildElements();

        var $elements = [];

        items.forEach( function( item, index ) {
            var template = this.itemTemplate();
            var $template = $( template );

            var element = itemTemplate( null, {
                index: index,
                item: item
            } );
            this.addChildElement( element );
            $template.append( element.render() );
            $elements.push( $template );
        }, this );

        return $elements;
    },

    /**
     *
     */
    updateGrouping: function() {
    }

} );

InfinniUI.ToolBarView = ToolBarView;
