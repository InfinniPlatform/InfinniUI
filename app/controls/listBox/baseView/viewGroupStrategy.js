function ListBoxViewGroupStrategy( listbox ) {
    this.listbox = listbox;
}

_.extend( ListBoxViewGroupStrategy.prototype, {

    prepareItemsForRendering: function() {
        var items = this.listbox.getItems();
        var inputName = 'listbox-' + guid();
        var result = {
            isMultiselect: this.listbox.isMultiselect(),
            focusable: this.listbox.isFocusable(),
            inputName: inputName,
            groups: []
        };
        var groups = {};
        var groupingFunction = this.listbox.getGroupValueSelector();

        items.forEach( function( item, index ) {
            var groupKey = groupingFunction( undefined, { value: item } );

            if( !( groupKey in groups ) ) {
                groups[ groupKey ] = [];
            }

            groups[ groupKey ].push( { index: index, item: item } );
        } );

        for( var k in groups ) {
            result.groups.push( {
                items: groups[ k ]
            } );
        }

        return result;
    },

    getTemplate: function() {
        return this.listbox.template.grouped;
    },

    appendItemsContent: function( preparedItems ) {
        var $listbox = this.listbox.$el;
        var itemTemplate = this.listbox.getItemTemplate();
        var groupTitleTemplate = this.listbox.getGroupItemTemplate();
        var groups = preparedItems.groups;
        var listbox = this.listbox;
        var item, itemEl, titleEl, $el, group;

        $listbox.find( '.pl-listbox-group-i' ).each( function( i, el ) {
            group = groups[ i ];
            titleEl = groupTitleTemplate( undefined, { index: group.items[ 0 ].index, item: group } );
            listbox.addChildElement( titleEl );

            $el = $( el );
            $el.find( '.pl-listbox-group-title' ).append( titleEl.render() );

            $el.find( '.pl-listbox-body' ).each( function( j, bodyEl ) {
                item = group.items[ j ].item;
                itemEl = itemTemplate( undefined, { index: group.items[ j ].index, item: item } );

                listbox.addChildElement( itemEl );

                $( bodyEl ).append( itemEl.render() );
                $( bodyEl ).parent()
                    .data( 'pl-data-item', item );
            } );
        } );
    }

} );

InfinniUI.ListBoxViewGroupStrategy = ListBoxViewGroupStrategy;
