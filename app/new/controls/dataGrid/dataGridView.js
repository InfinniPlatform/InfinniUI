/**
 * @constructor
 * @augments ListEditorBaseView
 */
var DataGridView = ListEditorBaseView.extend({

    template: InfinniUI.Template["new/controls/dataGrid/template/dataGrid.tpl.html"],

    className: 'pl-datagrid',

    events: {},

    UI: _.defaults({
        header: 'tr',
        items: 'tbody'
    }, ListEditorBaseView.prototype.UI),

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
        this.childElements = new HashMap();
    },

    updateGrouping: function () {

    },

    updateValue: function () {
        var
            model = this.model,
            value = model.get('value'),
            indices = [],
            items = model.get('items');

        if(!model.get('multiSelect') && value !== undefined && value !== null){
            value = [value];
        }

        if (Array.isArray(value)) {
            indices = value.map(function (val) {
                    return model.itemIndexByValue(val);
                })
                .filter(function (index) {
                    return index !== -1;
                });
        }

        this.childElements.forEach(function (rowElement, item) {
            var index = items.indexOf(item);
            var toggle = indices.indexOf(index) !== -1;
            rowElement.toggle(toggle);
        });

        console.log('update value', this.model.get('value'));
    },

    updateSelectedItem: function () {
        var
            model = this.model,
            selectedItem = model.get('selectedItem');

        this.childElements.forEach(function (rowElement, item) {
            rowElement.setSelected(item === selectedItem);
        });

        console.log('update selected Item', this.model.get('value'));
    },

    render: function () {
        this.prerenderingActions();

        this.$el.html(this.template());

        console.log(this.model.toJSON());
        this.bindUIElements();

        this.renderHeaders();
        this.renderItems();
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;


    },

    renderHeaders: function () {
        var columns = this.model.get('columns');

        var $headers = columns.toArray().map(function (column) {
            var $th = $('<th></th>');

            var headerTemplate = column.getHeaderTemplate();
            var header = column.getHeader();

            var headerElement;

            if (headerTemplate) {
                headerElement = headerTemplate(null, {value: header});
                $th.append(headerElement.render());

            } else {
                $th.append(header);
            }
            return $th;
        });

        this.ui.header.append($headers);
    },

    renderItems: function () {
        var
            model = this.model,
            itemTemplate = model.get('itemTemplate'),
            items = model.get('items'),
            $items = this.ui.items;

        this.removeChildElements();
        items.forEach(function (item, index) {
            var element = itemTemplate(undefined, {index: index, item: item});

            element.onBeforeClick(function() {
                model.set('selectedItem', item);
            });
            element.onToggle(function() {
                model.toggleValue(item);
            });
            this.addChildElement(item, element);
            $items.append(element.render());
        }, this);

    },

    addChildElement: function(item, element){
        this.childElements.add(item, element);
    },

    removeChildElements: function () {
        this.childElements.clear(function (element) {
            element.remove();
        });
    }


});


