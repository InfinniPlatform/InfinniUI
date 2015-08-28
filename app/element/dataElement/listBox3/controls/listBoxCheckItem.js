var ListBoxCheckItem = Backbone.View.extend({

    template: InfinniUI.Template['element/dataElement/listBox3/controls/template/listBoxCheckItem.tpl.html'],

    UI: {
        content: '.item-content',
        input: '.check-listbox-item'
    },

    initialize: function (options) {
        this.options = {
            index: options.index,
            content: options.content
        };
        this.el.addEventListener('mousedown', this.onSelectHandler.bind(this), true);

        this.listenTo(this.model, 'change:valueItemsIndex', this.updateCheckState);
    },

    render: function () {
        this.$el.html(this.template({}));
        this.bindUIElements();
        this.ui.content.append(this.options.content);
        this.updateCheckState();
        return this;
    },

    onSelectHandler: function () {

    },

    onToggleHandler: function () {
        var model = this.model;

        if (!model.isEnabled()) {
            return;
        }

        var index = this.options.index;
        var items = model.get('items');
        var valueSelector = model.get('valueSelector');
        var value = valueSelector(model.getItemByIndex(index));
        model.set('value', value);
    },

    updateCheckState: function () {
        var valueItemsIndex = this.model.get('valueItemsIndex');
        this.applyCheckState(valueItemsIndex === this.options.index);
    },

    applyCheckState: function (checked) {
        this.ui.content.toggleClass('selected', checked);
    }
});

_.extend(ListBoxRadioItem.prototype, bindUIElementsMixin);