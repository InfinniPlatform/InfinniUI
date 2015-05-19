/**
 * @description Стратегия работы с выделенными элементами выпадающего списка
 * @class ComboBoxMultiSelectAbstractStrategy
 */
var ComboBoxMultiSelectAbstractStrategy = function () {

};

_.extend(ComboBoxMultiSelectAbstractStrategy.prototype, {
    buildSelectedFromValue: function (value) {},

    /**
     * Возвращает элемент из списка выбора по указанным идентификаторам
     * @param id
     * @param {Object[]} list
     * @returns {*}
     */
    getListDataItem: function (id, list) {
        var item;

        if (typeof id !== 'undefined' && id !== null) {
            item = _.find(list, function (item) {
                return item.id == id;
            });

        }
        return item;
    },
    buildValueFromSelected: function (selected, list) {},
    buildSelection: function (selected, value, list) {},

    _initSelectionData: function (value,  valueProperty, getDisplayValue) {
        var data;

        if (value !== null && typeof value !== 'undefined') {

            var id = value.Id || InfinniUI.ObjectUtils.getPropertyValue(value, valueProperty);
            var text = getDisplayValue(value);

            if (typeof text === 'undefined' || text === null) {
                text = value.DisplayName;
            }

            data = {
                id: id,
                text: text
            }
        }
        return data;
    }
});

/**
 * @description Реализация для выпадающего списка с множественным выбором значений
 * @class ComboBoxMultiSelectStrategy
 */
var ComboBoxMultiSelectStrategy = function () {

};

_.inherit(ComboBoxMultiSelectStrategy, ComboBoxMultiSelectAbstractStrategy);

_.extend(ComboBoxMultiSelectStrategy.prototype, {
    /**
     * @description Формирует значения для выделения выбранных значений в выпадающем списке
     * @param {Object[]} value  = [{Id: Number, DisplayName: String}]
     * @returns {Array|null}
     */
    buildSelectedFromValue: function (value) {
        var id = null;

        if (typeof value !== 'undefined' && value !== null) {
            id = _.map(value, function (item) {
                return item.Id;
            });
        }

        return id;
    },

    /**
     * @description Возвращает элементы из списка выбора по указанным идентификаторам
     * @param {Number[]} id
     * @param {Object[]} list
     * @returns {Object[]|null}
     */
    getListDataItems: function (id, list) {
        var items = null;

        if (typeof id !== 'undefined' && id !== null) {

            items = _.map(id, function (id) {
                return this.getListDataItem(id, list);
            }, this);

            items = _.compact(items);
        }
        return items;
    },

    /**
     * @description Формирует список значений контрола по списку выбранных значений в выпадающем списке
     * @param {Number[]}selected
     * @param {Object[]}list
     * @returns {Object[]|null}
     */
    buildValueFromSelected: function (selected, list) {
        var items = this.getListDataItems(selected, list);

        return (typeof items === 'undefined') ? null : _.map(items, function (item) {
            return {Id: item.id, DisplayName: item.text};
        });
    },

    /**
     * Формирует список выбранных значений для выпадающего спсика
     * @param {Number[]} selected
     * @param {Object[]} value
     * @param {Object[]} list
     * @returns {Object[]|null}
     */
    buildSelection: function (selected, value, list) {
        var data;

        if (typeof value === 'undefined' || value === null) {
            value = [];
        }

        data = _.map(selected, function (id) {
            var item = this.getListDataItem(id, list);
            var data = null;

            if (typeof item === 'undefined') {    // В списке допустимых значений нет такого элемента
                // ищем значение в списке текущих значений
                item = _.find(value, function (item) {
                    return item.Id == id;
                });

                if (typeof item !== 'undefined') {
                    data = {id: item.Id, text: item.DisplayName};
                }
            } else {    //Есть такой элемент в списке значений
                data = item;
            }

            return data;
        }, this);

        if (_.isArray(data)) {
            data = _.compact(data);
        } else if (typeof data === 'undefined') {
            data = null;
        }

        return data;
    },

    initSelectionData: function (value,  valueProperty, getDisplayValue) {
        var data = [];
        if (_.isArray(value)) {
            data = _.map(value, function (val) {
                return this._initSelectionData(value, getDisplayValue);
            }, this)
        }
        return data;
    }
});

/**
 * @description Реализация для выпадающего списка с единственным выбором значения
 * @class ComboBoxSingleSelectStrategy
 */
var ComboBoxSingleSelectStrategy = function () {

};

_.inherit(ComboBoxSingleSelectStrategy, ComboBoxMultiSelectAbstractStrategy);

_.extend(ComboBoxSingleSelectStrategy.prototype, {

    /**
     * @description Формирует значения для выделения выбранных значений в выпадающем списке
     * @param {Object} value  = {Id: Number, DisplayName: String}
     * @returns {*}
     */
    buildSelectedFromValue: function (value) {
        var id = null;

        if (typeof value !== 'undefined' && value !== null) {
            id = value.Id;
        }

        return id;
    },

    /**
     * Формирует список значений контрола по списку выбранных значений в выпадающем списке
     * @returns {null}
     */
    buildValueFromSelected: function (selected, list) {
        var item = this.getListDataItem(selected, list);

        return (typeof item === 'undefined') ? null : {Id: item.id, DisplayName: item.text};
    },

    buildSelection: function (selected, value, list) {
        var item = this.getListDataItem(selected, list);
        var data = null;

        if (typeof item === 'undefined') {
            // Элемент не найдено в списке значений
            if (typeof value !== 'undefined' && value !== null && value.Id == selected) {
                data = {
                    id: value.Id,
                    text: value.DisplayName
                };
            }
        } else {
            data = item;
        }
        return data;
    },

    initSelectionData: function (value,  valueProperty, getDisplayValue) {
        return this._initSelectionData(value, valueProperty, getDisplayValue);
    }

});
