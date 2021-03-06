/**
 *
 * @param stackPanel
 * @constructor
 */
function StackPanelViewPlainStrategy( stackPanel ) {
    this.stackPanel = stackPanel;
}

_.extend( StackPanelViewPlainStrategy.prototype, {

    /**
     *
     * @returns {{items}}
     */
    prepareItemsForRendering: function() {
        var items = this.stackPanel.getItems();
        var result = {
            items: items.toArray()
        };

        return result;
    },

    /**
     *
     * @returns {*}
     */
    getTemplate: function() {
        return this.stackPanel.template.plain;
    },

    /**
     *
     * @param preparedItems
     * @param childElementsClass
     */
    appendItemsContent: function( preparedItems, childElementsClass ) {
        var $stackPanel = this.stackPanel.$el;
        var itemTemplate = this.stackPanel.getItemTemplate();
        var items = preparedItems.items;
        var stackPanel = this.stackPanel;
        var itemEl, $el;

        childElementsClass = childElementsClass || '.pl-stack-panel-i';

        $stackPanel.find( childElementsClass ).each( function( i, el ) {
            $el = $( el );
            itemEl = itemTemplate( undefined, { index: i, item: items[ i ] } );
            stackPanel.addChildElement( itemEl );
            $el.append( itemEl.render() );

            $el.parent().data( 'pl-data-item', items[ i ] );
        } );
    }

} );

InfinniUI.StackPanelViewPlainStrategy = StackPanelViewPlainStrategy;
