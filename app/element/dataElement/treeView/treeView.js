function TreeView() {
    _.superClass(TreeView, this);
}

_.inherit(TreeView, Element);

_.extend(TreeView.prototype, {

        createControl: function () {
            return new TreeViewControl();
        },

        /**
         * Возвращает значение, определяющее, разрешен ли выбор нескольких элементов.
         * @returns {Boolean}
         */
        getMultiSelect: function () {
            return this.control.get('multiSelect');
        },

        /**
         * Устанавливает значение, определяющее, разрешен ли выбор нескольких элементов.
         * @param {Boolean} value
         */
        setMultiSelect: function (value) {
            this.control.set('multiSelect', value);
        },

        /**
         * Возвращает значение, определяющее, запрещено ли редактирование значения.
         * @return {Boolean}
         */
        getReadOnly: function () {
            return this.control.get('readOnly');
        },

        /**
         * Устанавливает значение, определяющее, запрещено ли редактирование значения.
         * @param {Boolean} value
         */
        setReadOnly: function (value) {
            this.control.set('readOnly', value);
        },

        getValueProperty: function () {
            return this.control.get('valueProperty');
        },

        setValueProperty: function (value) {
            this.control.set('valueProperty', value);
        },

        getKeyProperty: function () {
            return this.control.get('keyProperty');
        },

        setKeyProperty: function (value) {
            this.control.set('keyProperty', value);
        },

        getParentProperty: function () {
            return this.control.get('parentProperty');
        },

        setParentProperty: function (value) {
            this.control.set('parentProperty', value);
        },

        getDisplayProperty: function () {
            return this.control.get('displayProperty');
        },

        setDisplayProperty: function (value) {
            this.control.set('displayProperty', value);
        },

        getFormat: function () {
            return this.control.get('itemFormat');
        },

        setFormat: function (itemFormat) {
            this.control.set('itemFormat', itemFormat);
        },

        getItemTemplate: function () {

        },

        setItemTemplate: function () {

        },

        addItem: function () {

        },

        removeItem: function () {

        },

        /**
         * Возвращает список элементов.
         * @returns {Object[]}
         */
        getItems: function () {
            return this.control.get('items');
        },

        /**
         * Устанавливает список элементов.
         * @param {Object[]}items
         */
        setItems: function (items) {
            this.control.set('items', items);
            this.control.controlView.trigger('afterchange:items');
        },

        getDataNavigation: function () {

        },

        setDataNavigation: function () {

        },

        getSelectedItem: function () {
            return this.control.controlView.getSelectedItem();
        }

    },
    valuePropertyMixin
);
