var ComboBoxDropdownView = Backbone.View.extend({

    events: {
        'click .backdrop': 'onClickBackdropHandler'
    },

    UI: {
        items: '.pl-combobox-items'
    },

    initialize: function () {
        var isGrouped = this.model.get('groupValueSelector') != null;

        if (isGrouped) {
            this.strategy = new ComboBoxGroupViewStrategy(this);
        } else {
            this.strategy = new ComboBoxPlainViewStrategy(this);
        }

        this.listenTo(this.model, 'change:dropdown', this.onChangeDropdownHandler);
        this.listenTo(this.strategy, 'click', this.onClickItemHandler);
        this.model.onValueChanged(this.onChangeValueHandler.bind(this));
    },

    render: function () {
        var template = this.strategy.getTemplate();
        this.$el.html(template());
        this.bindUIElements();
        var $items = this.strategy.renderItems();
        this.$items = $items;
        //console.log($items);
        return this.$el;
    },

    setItemsContent: function (content) {
        var $items = this.ui.items;
        $items.empty();
        $items.append(content);
    },

    onClickBackdropHandler: function () {
        this.model.set('dropdown', false);
    },

    onChangeValueHandler: function () {
        debugger;
        var model = this.model;
        var value = model.getValue();

        if (!Array.isArray(this.$items)) {
            return;
        }

        var $items = this.$items;

        console.log('change:value', value);

        var isMultiSelect = !!model.get('multiSelect');
        var items = [];

        if (isMultiSelect && Array.isArray(value)) {
            items = value.map(function (val) {
                return model.itemByValue(val);
            });
        } else {
            items = [model.itemByValue(value)];
        }

        $items.forEach(function ($item) {
            var selected = items.indexOf($item.data('pl-data-item')) !== -1;
            $item.toggleClass('pl-combobox-selected', selected);
        });


    },

    onChangeDropdownHandler: function (model, dropdown) {
        if (!dropdown) {
            this.remove();
        }
    },

    onClickItemHandler: function (item) {
        this.model.toggleItem(item);
    }
});

_.extend(ComboBoxDropdownView.prototype, bindUIElementsMixin);