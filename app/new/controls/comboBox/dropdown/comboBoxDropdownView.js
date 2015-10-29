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

    onChangeDropdownHandler: function (model, dropdown) {
        if (!dropdown) {
            this.remove();
        }
    }
});

_.extend(ComboBoxDropdownView.prototype, bindUIElementsMixin);