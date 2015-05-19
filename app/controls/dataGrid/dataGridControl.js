/**
 * @description Контрол для отображения данных в виде таблицы
 * @extends Control
 * @mixes controlValuePropertyMixin
 * @class DataGridControl
 */

var DataGridControl = function () {
    _.superClass(DataGridControl, this);
};

_.inherit(DataGridControl, Control);

_.extend(DataGridControl.prototype, {

        /**
         * @description Создает экземпляр модели
         * @memberOf DataGridControl.prototype
         * @returns {DataGridModel}
         */
        createControlModel: function () {
            return new DataGridModel();
        },

        /**
         * @description Создает экземпляр представления
         * @memberOf DataGridControl.prototype
         * @param {DataGridModel} model
         * @returns {DataGridView}
         */
        createControlView: function (model) {
            return new DataGridView({model: model});
        },

        onScrollToTheEnd: function(handler){
            this.controlView.on('scrollToTheEnd', handler);
        },

        onDoubleClick: function(handler){
            this.controlView.on('dblclick', handler);
        },

        //setSelectedItem: function (value) {
        //    this.controlModel.set('selectedItem', value);
        //},
        //
        //getSelectedItem: function () {
        //    return this.controlModel.get('selectedItem');
        //},

        onSelectedItemChanged: function (handler) {
            this.controlModel.on('change:selectedItem', handler);

        }

    }, controlValuePropertyMixin
);
