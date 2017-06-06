/**
 *
 * @param stackPanel
 * @constructor
 */
function StackPanelViewGroupStrategy( stackPanel ) {
    this.stackPanel = stackPanel;
}

_.extend( StackPanelViewGroupStrategy.prototype, {

    groupTemplate: InfinniUI.Template[ 'controls/stackPanel/baseView/template/stackPanelGroup.tpl.html' ],

    /**
     *
     * @returns {{inputName: string, groups: Array}}
     */
    prepareItemsForRendering: function() {
        var items = this.stackPanel.getItems();
        var inputName = 'listbox-' + guid();
        var result = {
            inputName: inputName,
            groups: []
        };
        var groups = {};
        var groupingFunction = this.stackPanel.getGroupValueSelector();

        items.forEach( function( item, index ) {
            var groupKey = groupingFunction( undefined, { value: item } );

            if( !( groupKey in groups ) ) {
                groups[ groupKey ] = [];
            }

            groups[ groupKey ].push( item );
        } );

        for( var k in groups ) {
            if( !groups.hasOwnProperty( k ) ) {
                continue;
            }
            result.groups.push( {
                items: groups[ k ],
                indices: groups[ k ].map( function( item ) {
                    return items.indexOf( item );
                } )
            } );
        }

        return result;
    },

    /**
     *
     * @returns {*}
     */
    getTemplate: function() {
        return this.stackPanel.template.grouped;
    },

    /**
     *
     * @param {Object} preparedItems
     * @param {Array} preparedItems.groups
     */
    appendItemsContent: function( preparedItems ) {
        var stackPanel = this.stackPanel;
        var $stackPanel = stackPanel.$el;
        var groupTemplate = this.groupTemplate;
        var groupHeaderTemplate = this.stackPanel.getGroupItemTemplate();
        var itemTemplate = this.stackPanel.getItemTemplate();
        var $groups;
        var groups = preparedItems.groups;

        $groups = groups.map( function( group, groupIndex ) {

            var $items;
            var items = group.items || [];
            var indices = group.indices || [];
            var $group = $( groupTemplate( { items: items } ) );
            var groupHeader = groupHeaderTemplate( null, {
                index: indices[ 0 ],  //Индекс любого элемента в этой группе
                item: group
            } );

            stackPanel.addChildElement( groupHeader );

            $items = items.map( function( item, itemIndex ) {
                var element = itemTemplate( null, { index: indices[ itemIndex ], item: item } );
                stackPanel.addChildElement( element );
                return element.render();
            } );

            $( '.pl-stack-panel-group__header', $group ).append( groupHeader.render() );

            $( '.pl-stack-panel-list__item', $group ).each( function( i, el ) {
                $( el ).append( $items[ i ] );
            } );

            return $group;
        } );

        $stackPanel.append( $groups );
    }

} );

InfinniUI.StackPanelViewGroupStrategy = StackPanelViewGroupStrategy;
