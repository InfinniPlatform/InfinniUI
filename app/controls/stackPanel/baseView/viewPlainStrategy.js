function StackPanelViewPlainStrategy(stackPanel) {
    this.stackPanel = stackPanel;
};

_.extend(StackPanelViewPlainStrategy.prototype, {

    prepareItemsForRendering: function(){
        var items = this.stackPanel.getItems(),
            result = {
                items: items.toArray()
            };

        return result;
    },

    getTemplate: function(){
        return this.stackPanel.template.plain;
    },

    appendItemsContent: function(preparedItems, childElementsClass){
        var $stackPanel = this.stackPanel.$el,
            itemTemplate = this.stackPanel.getItemTemplate(),
            items = preparedItems.items,
            stackPanel = this.stackPanel,
            itemEl, $el;

        childElementsClass = childElementsClass || '.pl-stack-panel-i';

        $stackPanel.find(childElementsClass).each(function(i, el){
            $el = $(el);
            itemEl = itemTemplate(undefined, {index: i, item: items[i]});
            stackPanel.addChildElement(itemEl);
            $el.append(itemEl.render());

            $el.parent().data('pl-data-item', items[i]);
        });
    }
});
