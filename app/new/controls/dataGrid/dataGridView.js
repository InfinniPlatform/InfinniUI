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
    },

    updateGrouping: function () {

    },

    updateValue: function () {

    },

    updateSelectedItem: function () {
        console.log('updateSelectedItem');
        var CLASS_SELECTED = 'info';
        var $items = this.ui.items.children();

        $items.removeClass(CLASS_SELECTED);

        var selectedItem = this.model.get('selectedItem');
        var items = this.model.get('items');
        var index = items.indexOf(selectedItem);
        if (index !== -1 && index < $items.length ) {
            $($items[index]).toggleClass(CLASS_SELECTED, true);
        }
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
            itemEl,
            $items = this.ui.items;

        items.forEach(function (item, index) {
            itemEl = itemTemplate(undefined, {index: index, item: item});
            itemEl.onBeforeClick(function() {
                model.set('selectedItem', item);
            });
            //listbox.addChildElement(itemEl);
            $items.append(itemEl.render());
            //$el.parent().data('pl-data-item', item);
        });

    }

});

