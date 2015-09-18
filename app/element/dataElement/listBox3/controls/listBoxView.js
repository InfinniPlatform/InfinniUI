var ListBoxView = ControlView.extend({
    className: 'pl-listbox',

    template: InfinniUI.Template['element/dataElement/listBox3/controls/template/listBox.tpl.html'],

    events: {},

    itemView: {
        radio: ListBoxRadioItem,
        check: ListBoxCheckItem
    },

    createItemView: function (data) {
        var name = this.model.get('multiSelect') ? 'check' : 'radio';
        return new this.itemView[name](data);
    },

    UI: {
        container: '.listbox-body'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.once('render', this.initUIHandler);
        this.listenTo(this.model, 'check', function (index) {

        })
    },

    render: function () {
        this.prerenderingActions();
        this.$el.html(this.template());
        this.bindUIElements();
        this.trigger('render');
        this.renderContent();
        this.postrenderingActions();
        return this;
    },

    initUIHandler: function () {
        this.listenTo(this.model, 'change:multiSelect', function () {
            this.renderContent();
        });

        this.listenTo(this.model, 'change:items', function () {
            this.renderContent();
        });
    },

    cleanViewItems: function () {
        if (!Array.isArray(this.itemsView)) {
            this.itemsView = [];
            return;
        }

        this.itemsView.forEach(function (itemView) {
            this.stopListening(itemView);
            itemView.remove();
        }.bind(this));

        this.itemsView = [];
    },

    renderContent: function (){
        var
            model = this.model,
            groupTemplate = model.get('groupTemplate'),
            items = model.get('items'),
            itemTemplate = model.get('itemTemplate');

        this.cleanViewItems();

        if (!Array.isArray(items)) {
            return;
        }
        
        if (groupTemplate) {
            //Группированный список
            var valueSelector = groupTemplate.valueSelector;
            var itemsGroup;
            var groupedItems = _.groupBy(items, function (item) {
                return valueSelector(item);
            });

            for (var groupValue in groupedItems) {
                if (!groupedItems.hasOwnProperty(groupValue)) {
                    continue;
                }
                var _index;
                itemsGroup = groupedItems[groupValue].map(function (item) {
                   return {
                       item: item,
                       index: items.indexOf(item)
                   };
                });

                var item = itemsGroup[0];
                var viewGroup = new ListBoxGroup({
                    header: groupTemplate.itemTemplate(item.item, item.index),
                    body: this.renderItems(itemsGroup),
                    collapsed: model.get('collapsed'),
                    collapsible: model.get('collapsible')
                });
                this.itemsView.push(viewGroup);

                var $group = viewGroup.render().$el;
                this.ui.container.append($group);
            }
        } else {
            //Простой список
            items = items.map(function (item, index) {
                return {
                    item: item,
                    index: index
                }
            });
            this.ui.container.append(this.renderItems(items));
        }

    },

    renderItems: function (items) {
        var
            model = this.model,
            itemTemplate = model.get('itemTemplate'),
            view = this,
            $items = [];

        if (Array.isArray(items)) {
            $items = items.map(function(data) {
                var content = itemTemplate(data.item, data.index);
                var itemView = view.createItemView({
                    content: content,
                    index: data.index,
                    model: model
                });

                view.listenTo(itemView, 'toggle',  view.onToggleItemHandler);
                view.itemsView.push(itemView);
                return itemView.render().$el;
            });
        }

        return $items;
    },

    onToggleItemHandler: function (index) {

    }


});
