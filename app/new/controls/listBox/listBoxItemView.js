var ListBoxItemView = Backbone.View.extend({

    template: {
        radio: InfinniUI.Template["new/controls/listBox/template/listBoxItem.radio.tpl.html"],
        checkbox: InfinniUI.Template["new/controls/listBox/template/listBoxItem.checkbox.tpl.html"]
    },

    className: 'listbox_itemtemplate',

    TOGGLE_KEY_CODE: [32],

    UI: {
        content: '.listbox-item-content',
        input: 'input'
    },

    initialize: function (options) {
        this.options = options;
        this.listenTo(this.model, 'change:value', this.onChangeValueHandler, this);
    },

    events: {
        'mousedown': 'onMouseDownHandler',
        'keydown': 'onKeyDownHandler',
        'click': 'onClickHandler'
    },

    render: function () {
        var
            template,
            model = this.model,
            itemTemplate = model.get('itemTemplate'),
            itemsCollection = model.get('items'),
            item = this.options.item,
            $item = itemTemplate(undefined, {
                item: item,
                index: itemsCollection.indexOf(item)
            }).render();

        template = model.get('multiSelect') ? this.template.checkbox : this.template.radio;
        this.$el.html(template);
        this.bindUIElements();
        this.ui.content.append($item);
        return this;
    },

    onMouseDownHandler: function (event) {
        this.toggleItem();
    },

    onKeyDownHandler: function (event) {
        if (this.TOGGLE_KEY_CODE.indexOf(event.which) === -1) {
            return;
        }
        this.toggleItem();
    },

    onClickHandler: function (event) {
        if (event.target === this.ui.input[0]) {
            //Prevent auto check for checkbox
            event.preventDefault();
        }
    },

    onChangeValueHandler: function (model, value) {
        if (this.ui && this.ui.content) {
            var
                selected = model.hasValue(this.options.value);

            this.$el.toggleClass('selected', selected);
            this.ui.input.prop('checked', selected);
        }
    },

    toggleItem: function () {
        this.model.trigger('toggleValue', this.options.value);
    }

});

_.extend(ListBoxItemView.prototype, bindUIElementsMixin);