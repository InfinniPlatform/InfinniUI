/**
 * @description Модель колонки контрола DataGrid
 * @class DataGridColumnModel
 * @extends Backbone.Model
 */
var DataGridColumnModel = Backbone.Model.extend({

    defaults: {
        resizable: true,
        visible: true,
        itemFormat: null,
        sortable: false,
        text: ''
    }

}, {
    SORTING_ASC: 'asc',
    SORTING_DESC: 'desc',
    SORTING_NONE: 'none'
});
