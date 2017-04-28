/**
 *
 * @param listbox
 * @constructor
 */
function ListBoxViewPlainStrategy( listbox ) {
    this.listbox = listbox;
}

_.extend( ListBoxViewPlainStrategy.prototype, {

    /**
     *
     * @returns {{isMultiselect: *, focusable: *, inputName: string, items}}
     */
    prepareItemsForRendering: function() {
        var items = this.listbox.getItems();
        var inputName = 'listbox-' + guid();
        var result = {
            isMultiselect: this.listbox.isMultiselect(),
            focusable: this.listbox.isFocusable(),
            inputName: inputName,
            items: items.toArray()
        };

        return result;
    },

    /**
     *
     * @returns {*}
     */
    getTemplate: function() {
        return this.listbox.template.plain;
    },

    /**
     *
     * @param preparedItems
     */
    appendItemsContent: function( preparedItems ) {
        var $listbox = this.listbox.$el;
        var itemTemplate = this.listbox.getItemTemplate();
        var items = preparedItems.items;
        var listbox = this.listbox;
        var itemEl, $el;

        $listbox.find( '.pl-listbox-body' ).each( function( i, el ) {
            $el = $( el );
            itemEl = itemTemplate( undefined, { index: i, item: items[ i ] } );
            listbox.addChildElement( itemEl );
            $el.append( itemEl.render() );

            $el.parent().data( 'pl-data-item', items[ i ] );
        } );
    }

} );

InfinniUI.ListBoxViewPlainStrategy = ListBoxViewPlainStrategy;
