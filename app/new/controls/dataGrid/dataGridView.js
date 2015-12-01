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
            //listbox.addChildElement(itemEl);
            $items.append(itemEl.render());
            //$el.parent().data('pl-data-item', item);
        });

    }

});

