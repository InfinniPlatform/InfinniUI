function ListBoxViewPlainStrategy(listbox) {
    this.listbox = listbox;
};

_.extend(ListBoxViewPlainStrategy.prototype, {

    prepareItemsForRendering: function(){
        var items = this.listbox.getItems(),
            inputName = 'listbox-' + guid(),
            result = {
                isMultiselect: this.listbox.isMultiselect(),
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
            items = preparedItems.items,
            listbox = this.listbox,
            itemEl, $el;

        $listbox.find('.pl-listbox-body').each(function(i, el){
            $el = $(el);
            itemEl = itemTemplate(undefined, {index: i, item: items[i]});
            listbox.addChildElement(itemEl);
            $el.append(itemEl.render());

            $el.parent().data('pl-data-item', items[i]);
        });
    }
});