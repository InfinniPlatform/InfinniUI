function StackPanelViewGroupStrategy(stackPanel) {
    this.stackPanel = stackPanel;
}

_.extend(StackPanelViewGroupStrategy.prototype, {

    groupTemplate: InfinniUI.Template["new/controls/stackPanel/baseView/template/stackPanelGroup.tpl.html"],

    prepareItemsForRendering: function(){
        var items = this.stackPanel.getItems(),
            inputName = 'listbox-' + guid(),
            result = {
                inputName: inputName,
                groups: []
            },
            groups = {},
            groupingFunction = this.stackPanel.getGroupValueSelector();

        items.forEach(function(item, index){
            var groupKey = groupingFunction(undefined, {value:item});

            if(! (groupKey in groups)){
                groups[groupKey] = [];
            }

            groups[groupKey].push(item);
        });

        for(var k in groups){
            if (!groups.hasOwnProperty(k)) {
                continue;
            }
            result.groups.push({
                items: groups[k],
                indices: groups[k].map(function (item) {
                    return items.indexOf(item);
                })
            });
        }

        return result;
    },

    getTemplate: function(){
        return this.stackPanel.template.grouped;
    },

    /**
     *
     * @param {Object} preparedItems
     * @param {Array} preparedItems.groups
     */
    appendItemsContent: function (preparedItems) {
        var
            stackPanel = this.stackPanel,
            $stackPanel = stackPanel.$el,
            groupTemplate = this.groupTemplate,
            groupHeaderTemplate = this.stackPanel.getGroupItemTemplate(),
            itemTemplate = this.stackPanel.getItemTemplate(),
            $groups,
            groups = preparedItems.groups;

        $groups = groups.map(function (group, groupIndex) {

            var $items,
                items = group.items || [],
                indices = group.indices || [],
                $group = $(groupTemplate({items: items})),
                groupHeader = groupHeaderTemplate(null, {
                    index: indices[0],  //Индекс любого элемента в этой группе
                    item: group
                });

            stackPanel.addChildElement(groupHeader);

            $items = items.map(function (item, itemIndex) {
                var element = itemTemplate(null, {index: indices[itemIndex], item: item});
                stackPanel.addChildElement(element);
                return element.render();
            });

            $('.pl-stack-panel-group__header', $group).append(groupHeader.render());

            $('.pl-stack-panel-list__item', $group).each(function (i, el) {
                $(el).append($items[i]);
            });

            return $group;

        });

        $stackPanel.append($groups);
    }
});