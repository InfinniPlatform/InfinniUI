var ListBoxView = ControlView.extend({

    template: {
        plain: InfinniUI.Template["new/controls/listBox/template/listBox.tpl.html"],
        grouped: InfinniUI.Template["new/controls/listBox/template/listBoxGrouped.tpl.html"]
    },


    class: 'pl-listbox',

    UI: {
        items: '.listbox-items'
    },

    initialize: function (options) {
        var that = this;

        //@TODO Реализовать обработку значений по умолчанию!
        ControlView.prototype.initialize.call(this, options);

        this.model.get('items').onChange(function(){
            that.rerender();
        });

        this.initGrouping();
    },

    initGrouping: function(){
        this.updateGrouping();
        this.listenTo(this.model, 'change:groupValueSelector', this.updateGrouping);
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

        this.$el.html(template(preparedItems));
        this.bindUIElements();

        this.strategy.appendItemsContent(preparedItems);

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
    }
});
