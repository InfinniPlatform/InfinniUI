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

        this.bindUIElements();

        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;


    }

});

