var ComboBoxDropdownView = Backbone.View.extend({

    events: {
        'click .backdrop': 'onClickBackdropHandler'
    },

    UI: {
        items: '.pl-combobox-items'
    },

    initialize: function () {
        var isGrouped = this.model.get('groupValueSelector') != null;

        if(isGrouped){
            this.strategy = new ComboBoxGroupViewStrategy(this);
        }else{
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
        this.strategy.renderItems();
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
        var value = this.model.getValue();
        console.log('change:value', value);
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