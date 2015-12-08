function StackPanelViewGroupStrategy(stackPanel) {
    this.stackPanel = stackPanel;
};

_.extend(StackPanelViewGroupStrategy.prototype, {

    prepareItemsForRendering: function(){
        var items = this.stackPanel.getItems(),
            inputName = 'listbox-' + guid(),
            result = {
                isMultiselect: this.stackPanel.isMultiselect(),
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
            result.groups.push({
                items: groups[k]
            })
        }

        return result;
    },

    getTemplate: function(){
        return this.stackPanel.template.grouped;
    },

    appendItemsContent: function(preparedItems){
        var $stackPanel = this.stackPanel.$el,
            $stackPanelItems = $stackPanel.find('.pl-stack-panel-i'),
            itemTemplate = this.stackPanel.getItemTemplate(),
            groupTitleTemplate = this.stackPanel.getGroupItemTemplate(),
            index = 0,
            groups = preparedItems.groups,
            stackPanel = this.stackPanel,
            itemEl, titleEl;

        $stackPanel.find('.pl-stack-panel-group-title').each(function(i, el){
            titleEl = groupTitleTemplate(undefined, {index: index, item: groups[i]});
            stackPanel.addChildElement(titleEl);
            $(el).append(titleEl.render());

            _.forEach( groups[i].items, function(item){
                itemEl = itemTemplate(undefined, {index: i, item: item});
                stackPanel.addChildElement(itemEl);
                $stackPanelItems.eq(index).append(itemEl.render());

                $stackPanelItems.eq(index).parent()
                    .data('pl-data-item', item);

                index++;
            });

        });
    }
});