var TreeViewView = ControlView.extend({

    className: 'pl-treeview',

    template: InfinniUI.Template["controls/treeView/template/treeview.tpl.html"],

    UI: {
        container: 'div'
    },

    initialize: function () {
        this.listenTo(this.model, 'change:value', this.onUpdateValueHandler);
        this.listenTo(this.model, 'change:items', this.onUpdateItemsHandler);
        this.listenTo(this.model, 'change:readOnly', this.onUpdateMultipleHandler);
    },

    render: function () {
        this.prerenderingActions();
        var html = this.template();

        this.$el.html(html);
        this.bindUIElements();

        this.renderData();
        this.bindTreeEvent();

        this.postrenderingActions();
        return this;
    },

    /**
     * @descroption Конвертирует данные из источника данных в формат, подходящий для используемого плагина TreeView
     * @param {Array} data
     * @returns *
     */
    convertData: function (data) {
        var parentProperty = this.model.get('parentProperty');
        var keyProperty = this.model.get('keyProperty');
        var displayProperty = this.model.get('displayProperty');
        var disabled = this.model.get('readOnly');
        var roots = _.pluck(data, keyProperty);
        roots = _.unique(roots);

        return _.map(data, function (item) {
            var id = InfinniUI.ObjectUtils.getPropertyValue(item, keyProperty);
            var result = {
                id: id,
                parent: "#",
                text: this.getDisplayNameValue(item),//item[displayProperty],
                state: {
                    disabled: disabled
                }
            };
            var parentValue;

            if (typeof parentProperty !== 'undefined' && parentProperty !== null) {
                parentValue = InfinniUI.ObjectUtils.getPropertyValue(item, parentProperty);

                if (typeof parentValue !== 'undefined' && parentValue !== null && _.contains(roots, parentValue)) {
                    result.parent = parentValue;
                }
            }

            return result;
        }, this);
    },

    getSelectedItem: function () {
        var items = this.model.get('items');
        var value = this.model.get('value');
        var keyProperty = this.model.get('keyProperty');

        if (value === null || typeof value === 'undefined') {
            return;
        }

        var condition;
        var result;

        var f = function (value) {
            (condition = {})[keyProperty] = value.Id;
            return _.findWhere(items, condition);
        };

        result = (value.constructor === Array) ? _.map(value, f) : f(value);

        return result;
    },

    /**
     * @description Рендеринг дерева
     */
    renderData: function () {
        var $el = this.ui.container;
        var data = this.model.get('items');
        var multiple = this.model.get('multiSelect');

        var plugins = ['wholerow'];
        if (multiple) {
            plugins.push('checkbox');
        }
        $el.jstree({
            plugins: plugins,
            checkbox: {
                three_state: false
            },
            core: {
                multiple: multiple,
                data: this.convertData(data),
                themes: {
                    name: 'proton',
                    responsive: true
                }
            }
        });
        this.updateTree();
    },


    /**
     * @description Конвертирование информации об элементе из плагина jsTree в значение контрола
     * @param data
     * @returns {*}
     */
    buildValueFromTreeData: function (data) {
        var convertData = function (item) {
            var data;
            if (item !== null && typeof item !== 'undefined') {
                data = {
                    Id: item.id,
                    DisplayName: item.text
                };
            }

            return data;
        };

        return (_.isArray(data)) ? _.map(data, convertData) : convertData(data);
    },

    /**
     * @description Обработка выборки элемента
     */
    bindTreeEvent: function () {
        var $el = this.ui.container;

        $el.on('changed.jstree', function() {
            var model = this.model;
            var multiple = model.get('multiSelect');
            var value;

            var data;

            if (multiple) {
                data = $el.jstree("get_checked", true);
            } else {
                data = $el.jstree("get_selected", true);
                if (_.isArray(data) && data.length > 0) {
                    data = data[0];
                }
            }

            value = this.buildValueFromTreeData(data);

            model.set('value', value);
        }.bind(this));
    },


    /**
     * @description Обновляет дерево данными из модели
     */
    updateTree: function () {
        if (!this.wasRendered) {
            return;
        }

        var $el = this.ui.container;
        var data = this.model.get('items');

        if (typeof data === 'undefined' || data === null) {
            data = [];
        }
        $el.jstree(true).settings.core.data = this.convertData(data);
        $el.jstree(true).refresh();
        this.updateTreeState();
    },

    /**
     * @description Обработчик установки значения. Отмечает соотвествующие элементы в TreeView
     */
    onUpdateValueHandler: function (/*model, value*/) {
        this.updateTreeState();
    },

    /**
     * @description Возвращает текстовое значение элемента из дерева.
     * Приоритет: ItemTemplate, ItemFormat, DisplayProperty, toString()
     * @param {Object} item
     */
    getDisplayNameValue: function (item) {
        var itemFormat = this.model.get('itemFormat');
        var displayProperty = this.model.get('displayProperty');
        var result = '' + item;//Вариант по умолчанию - toString()

        /**
         * @TODO Необходимо реализовать поддержку ItemTemplate
         */
        if (typeof itemFormat !== 'undefined' && itemFormat !== null) {
            result = itemFormat.format(item);
        } else if (typeof displayProperty !== 'undefined' && displayProperty !== null){
            result = InfinniUI.ObjectUtils.getPropertyValue(item, displayProperty);
        }

        return result;
    },

    /**
     * @private
     * @description Отмечает выбранные элементы в дереве, по значениям Value компонента
     */
    updateTreeState: function () {
        if (!this.wasRendered) {
            return;
        }

        var value = this.model.get('value');
        var $el = this.ui.container;
        var selected = $el.jstree(true).get_selected();
        var data;
        var deselect;

        if (_.isArray(value)) {
            data = _.pluck(value, 'Id');

            deselect = _.difference(selected, data);
            var select = _.difference(data, selected);
            if (deselect.length > 0) {
                $el.jstree(true).deselect_node(deselect, true);
            }
            if (select.length > 0) {
                $el.jstree(true).select_node(select, true);
            }
        } else {
            deselect = _.without(selected, value);
            $el.jstree(true).deselect_node(deselect, true);

            if (typeof value !== 'undefined' && value !== null) {
                $el.jstree(true).select_node(value.Id, true);
            }
        }
    },

    onUpdateItemsHandler: function (/*model, value*/) {
        this.updateTree();
    },

    onUpdateMultipleHandler: function () {
        this.updateTree();
    }

});
