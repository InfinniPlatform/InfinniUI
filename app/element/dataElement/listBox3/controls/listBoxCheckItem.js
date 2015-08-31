var ListBoxCheckItem = Backbone.View.extend({

    template: InfinniUI.Template['element/dataElement/listBox3/controls/template/listBoxCheckItem.tpl.html'],

    UI: {
        content: '.item-content',
        input: '.check-listbox-item'
    },

    events: {
        'mousedown .check-listbox-item': 'onClickHandler',
        'click .check-listbox-item': 'preventDefault'
    },

    initialize: function (options) {
        this.options = {
            index: options.index,
            content: options.content
        };
        this.el.addEventListener('mousedown', this.selectItemOnClick.bind(this), true);
        this.listenTo(this.model, 'change:valueItemsIndex', this.updateCheckState);
        this.listenTo(this.model, 'change:selectedItem', this.updateSelectedState);
    },

    render: function () {
        this.$el.html(this.template({}));
        this.bindUIElements();
        this.ui.content.append(this.options.content);
        this.updateCheckState();
        this.updateSelectedState();
        return this;
    },

    /**
     * Сдедать текущий элемент выделенным
     */
    selectItemOnClick: function () {
        var model = this.model;

        if (!model.isEnabled()) {
            return;
        }

        var selectedItem = model.getItemByIndex(this.options.index);
        model.set('selectedItem', selectedItem);
    },

    preventDefault: function (event) {
        event.preventDefault();
        return false;
    },

    /**
     * Переключить значение ListBox
     */
    onClickHandler: function () {
        var model = this.model;

        if (!model.isEnabled()) {
            return;
        }

        var index = this.options.index;
        var items = model.get('items');
        var valueSelector = model.get('valueSelector');
        var value = valueSelector(model.getItemByIndex(index));
        model.toggleValue(value);
    },

    updateCheckState: function () {
        var valueItemsIndex = this.model.get('valueItemsIndex');
        var checked = false;
        if (Array.isArray(valueItemsIndex)) {
            checked = valueItemsIndex.indexOf(this.options.index) !== -1;
        }
        this.applyCheckState(checked);
    },

    updateSelectedState: function () {
        var selected = this.model.isSelectedIndex(this.options.index);
        this.applySelectedState(selected);
    },

    applySelectedState: function (selected) {
        this.ui.content.toggleClass('selected', selected);
    },

    applyCheckState: function (checked) {
        this.ui.input.prop('checked', checked);
    }
});

_.extend(ListBoxCheckItem.prototype, bindUIElementsMixin);