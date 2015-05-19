/**
 * @description Модель контрола DataGrid
 * @extends ControlModel
 * @class DataGridModel
 */
var DataGridModel = ControlModel.extend({

    defaults: _.defaults({
        horizontalAlignment: 'Stretch',
        verticalAlignment: 'Stretch',
        multiSelect: false,
        readOnly: false,
        groups: null,
        autoLoad: true
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
        this.set('items', []);
        this.set('columns', []);
        this.set('selectedItem', null);
    }
});
