var ListBoxView = ContainerView.extend({

    template: {
        plain: InfinniUI.Template["new/controls/listBox/template/listBox.tpl.html"],
        grouped: InfinniUI.Template["new/controls/listBox/template/listBoxGrouped.tpl.html"]
    },


    class: 'pl-listbox',

    events: {
        'change .pl-listbox-input': 'onChangeHandler'
    },

    UI: {
        items: '.pl-listbox-i',
        checkingInputs: '.pl-listbox-input input'
    },

    initialize: function (options) {
        var that = this;

        //@TODO Реализовать обработку значений по умолчанию!
        ContainerView.prototype.initialize.call(this, options);

        this.initGrouping();
        this.initValue();
        this.initSelectedItem();
    },

    initGrouping: function(){
        this.updateGrouping();
        this.listenTo(this.model, 'change:groupValueSelector', this.updateGrouping);
    },

    initValue: function(){
        this.updateValue();
        this.listenTo(this.model, 'change:value', this.updateValue);
    },

    initSelectedItem: function(){
        this.updateSelectedItem();
        this.listenTo(this.model, 'change:selectedItem', this.updateSelectedItem);
    },

    updateGrouping: function(){
        var isGrouped = this.model.get('groupValueSelector') != null;

        if(isGrouped){
            this.strategy = new ListBoxViewGroupStrategy(this);
        }else{
            this.strategy = new ListBoxViewPlainStrategy(this);
        }
    },

    render: function () {
        this.prerenderingActions();

        var preparedItems = this.strategy.prepareItemsForRendering();
        var template = this.strategy.getTemplate();

        this.removeChildElements();

        this.$el.html(template(preparedItems));
        this.bindUIElements();

        this.strategy.appendItemsContent(preparedItems);

        this.bindUIElements();

        this.updateValue(true);
        this.updateSelectedItem(true);

        this.postrenderingActions();
        return this;
    },

    getItems: function(){
        return this.model.get('items');
    },

    getItemTemplate: function(){
        return this.model.get('itemTemplate');
    },

    getGroupValueSelector: function(){
        return this.model.get('groupValueSelector');
    },

    isMultiselect: function(){
        return this.model.get('multiSelect');
    },

    getGroupItemTemplate: function(){
        return this.model.get('groupItemTemplate');
    },

    onChangeHandler: function(){
        var $checked = this.ui.checkingInputs.filter(':checked').parent().parent(),
            valueForModel = null,
            val;

        if(this.isMultiselect()){
            valueForModel = [];

            $checked.each(function(i, el){
                val = $(el).data('pl-data-item');
                valueForModel.push(val);
            });

        }else{
            if($checked.length > 0){
                valueForModel = $checked.data('pl-data-item');
            }
        }

        this.model.set('value', valueForModel);
    },

    updateValue: function(ignoreWasRendered){
        if(!this.wasRendered && ignoreWasRendered != true){
            return;
        }

        this.ui.items.removeClass('pl-listbox-i-chosen');
        this.ui.checkingInputs.prop('checked', false);

        var value = this.model.get('value'),
            indexOfChoosingItem;

        if(!this.isMultiselect() && value !== undefined && value !== null){
            value = [value];
        }

        if($.isArray(value)){
            for(var i= 0, ii=value.length; i < ii; i++){
                indexOfChoosingItem = this.model.itemIndexByValue(value[i]);
                if(indexOfChoosingItem != -1){
                    this.ui.items.eq(indexOfChoosingItem).addClass('pl-listbox-i-chosen');
                    this.ui.checkingInputs.eq(indexOfChoosingItem).prop('checked', true);
                }
            }
        }
    },

    updateSelectedItem: function(ignoreWasRendered){
        if(!this.wasRendered && ignoreWasRendered != true){
            return;
        }

        this.ui.items.removeClass('pl-listbox-i-selected');

        var selectedItem = this.model.get('selectedItem'),
            indexOfItem = this.model.itemIndexByItem(selectedItem);

        this.ui.items.eq(indexOfItem).addClass('pl-listbox-i-selected');
    }
});