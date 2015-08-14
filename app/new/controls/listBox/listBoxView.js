var ListBoxView = ControlView.extend({

    template: InfinniUI.Template["new/controls/listBox/template/listBox.tpl.html"],

    UI: {
        items: '.listbox-items'
    },

    initialize: function (options) {
        //@TODO Реализовать обработку значений по умолчанию!
        ControlView.prototype.initialize.call(this, options);
    },

    render: function () {
        this.prerenderingActions();
        this.$el.html(this.template());
        this.bindUIElements();

        //this.renderItemsStrategy = new ListEditorBasePlainRenderStrategy(this.model, this.ui.items, ListBoxItemView);
        this.renderItemsStrategy = new ListEditorBaseGroupedRenderStrategy(this.model, this.ui.items, ListBoxItemView);
        this.renderItemsStrategy.render();

        this.postrenderingActions();
        return this;
    }
});
