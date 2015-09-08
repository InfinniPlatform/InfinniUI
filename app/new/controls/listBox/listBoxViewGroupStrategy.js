function ListBoxViewPlainStrategy(listbox) {
    this.listbox = listbox;
};

_.extend(ListBoxViewPlainStrategy.prototype, {

    prepareItemsForRendering: function(){
        var items = this.listbox.getItems(),
            inputName = 'listbox-' + guid(),
            result = {
                inputName: inputName,
                items: items.toArray()
            };

        return result;
    },

    getTemplate: function(){
        return this.listbox.template.plain;
    },

    appendItemsContent: function(preparedItems){
        var $listbox = this.listbox.$el,
            itemTemplate = this.listbox.getItemTemplate(),
            item;

        $listbox.find('.pl-listbox-body').each(function(i, el){
            item = itemTemplate(undefined, {index: i, item: preparedItems[i]});
            $(el).append(item.render());
        });
    }
});