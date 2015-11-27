/**
 * @constructor
 * @augments ListEditorBaseView
 */
var DataGridView = ListEditorBaseView.extend({

    template: InfinniUI.Template["new/controls/dataGrid/template/dataGrid.tpl.html"],

    className: 'pl-datagrid',

    events: {

    },

    UI: _.defaults({
        items: '.pl-datagrid-i'
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

        this.renderItems();
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;


    },

    renderItems: function () {
        var
            model = this.model,
            $listbox = this.$el,
            itemTemplate = model.get('itemTemplate'),
            items = model.get('items'),
            itemEl, $el;

        items.forEach(function (item, index) {
            itemEl = itemTemplate(undefined, {index: index, item: item});
            //listbox.addChildElement(itemEl);
            $el.append(itemEl.render());

            $el.parent().data('pl-data-item', item);
        });

    }

});

