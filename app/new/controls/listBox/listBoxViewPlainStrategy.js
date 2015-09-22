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
            itemEl;

        $listbox.find('.pl-listbox-body').each(function(i, el){
            itemEl = itemTemplate(undefined, {index: i, item: items[i]});
            $(el).append(itemEl.render());
        });
    },

    updateValue: function(ignoreWasRendered){
        var listbox = this.listbox;


        if(!listbox.wasRendered && ignoreWasRendered != true){
            return;
        }

        var value = listbox.model.get('value'),
            indexOfChoosingItem = listbox.model.itemIndexByValue(value);

        listbox.ui.items.removeClass('pl-listbox-i-chosen');
        listbox.ui.checkingInputs.prop('checked', false);

        if(indexOfChoosingItem != -1){
            listbox.ui.items.eq(indexOfChoosingItem).addClass('pl-listbox-i-chosen');
            listbox.ui.checkingInputs.eq(indexOfChoosingItem).prop('checked', true);
        }
    }
});