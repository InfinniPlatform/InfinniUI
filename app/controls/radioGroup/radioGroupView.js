var RadioGroupView = ControlView.extend({
    className: 'pl-radio-group',

    template: InfinniUI.Template["controls/radioGroup/template/template.tpl.html"],
    templateItem: InfinniUI.Template["controls/radioGroup/template/item.text.tpl.html"],

    UI: {
        items: '.pl-radio-group-items'
    },

    initialize: function () {

        this.listenTo(this.model, 'change:items', this.onChangeItemsHandler);
        this.listenTo(this.model, 'change:readOnly', this.onChangeReadOnlyHandler);
        this.listenTo(this.model, 'change:enabled', this.onChangeEnabledHandler);
        this.listenTo(this.model, 'change:orientation', this.onChangeOrientationHandler);
    },

    onChangeOrientationHandler: function () {
        this.applyOrientation();
    },

    applyOrientation: function () {
        var orientation = this.model.get('orientation');

        var horizontal = orientation === InfinniUI.Metadata.RadioGroupOrientation.Horizontal;
        this.$el.toggleClass('pl-radio-group_horizontal', horizontal);
        this.$el.toggleClass('pl-radio-group_vertical', !horizontal);
    },

    onChangeReadOnlyHandler: function () {
        this.notifyAllItems('enabled', this.model.get('readOnly'));
    },

    onChangeEnabledHandler: function () {
        this.notifyAllItems('enabled', this.model.get('enabled'));
    },

    notifyAllItems: function (name, value) {
        var viewItems = this.model.get('viewItems');

        if (_.isArray(viewItems)) {
            viewItems.forEach(function(view) {
                view.trigger(name, value);
            });
        }
    },

    render: function () {
        this.prerenderingActions();
        this.$el.html(this.template());
        this.bindUIElements();
        this.applyOrientation();
        this.renderItems();
        this.postrenderingActions();
        return this;
    },

    onChangeItemsHandler: function () {
        if (this.wasRendered) {
            this.renderItems();
        }
    },

    cleanViewItems: function () {
        var views = this.model.get('viewItems');

        if (_.isEmpty(views)) {
            return;
        }

        views.forEach(function (view) {
            view.remove();
        });

        this.model.set('viewItems', null);
    },

    renderItems: function () {
        this.cleanViewItems();
        var model = this.model;
        var value = model.get('value');
        var items = model.get('items');
        if (_.isArray(items) === false) {
            return;
        }


        var itemRenderStrategy = this.getItemRenderStrategy();

        var views = items.map(function (item, index) {
            var viewItem = new RadioGroupItemView({
                item: item,
                index: index,
                readOnly: model.get('readOnly'),
                enabled: model.get('enabled'),
                name: model.get('name')
            });
            viewItem.setRenderStrategy(itemRenderStrategy);
            this.ui.items.append(viewItem.render().$el);
            this.listenTo(viewItem, 'check', this.onCheckItemHandler);
            viewItem.listenTo(model, 'change:value', function (model, value) {
                var item = this.getItemByValue(value);
                viewItem.trigger('toggle', item);
            }.bind(this));

            //Отмечаем пункт, соответсвующий текущему значению.
            var itemValue = InfinniUI.ValueProperty.getValue(item, model.get('valueProperty'));
            if (_.isEqual(value, itemValue)) {
                viewItem.trigger('toggle', item);
            }
            return viewItem;
        }, this);

        model.set('viewItems', views);
    },

    getItemByValue: function (value) {
        var items = this.model.get('items');
        var item;
        var valueProperty = this.model.get('valueProperty');

        if (_.isArray(items)) {
            item = _.find(items, function (item) {
                var val = InfinniUI.ValueProperty.getValue(item, valueProperty);
                return _.isEqual(val, value);
            });
        }

        return item;
    },

    onCheckItemHandler: function (item, index) {
        var model = this.model;
        var value = InfinniUI.ValueProperty.getValue(item, model.get('valueProperty'));
        var oldValue = model.get('value');

        if (!_.isEqual(value, oldValue)) {
            model.set('value', value);
            model.set('item', item);
        }
    },

    getItemRenderStrategy: function () {
        var strategy;

        var itemTemplate = this.model.get('itemTemplate');
        var itemFormat = this.model.get('itemFormat');
        var displayProperty = this.model.get('displayProperty');

        if (typeof itemTemplate === 'function') {
            strategy = new ItemTemplateRenderStrategy(itemTemplate);
        } else if (typeof itemFormat !== 'undefined' && itemFormat !== null) {
            strategy = new ItemFormatRenderStrategy(itemFormat)
        } else if (_.isEmpty(displayProperty) === false) {
            strategy = new DisplayPropertyRenderStrategy(displayProperty);
        } else {
            strategy = new DefaultRenderStrategy();
        }

        return strategy;
    }

});