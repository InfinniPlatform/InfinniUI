function ComboBox() {
    _.superClass(ComboBox, this);
}

_.inherit(ComboBox, Element);

_.extend(ComboBox.prototype, {

        createControl: function () {
            return new ComboBoxControl();
        },

        /**
         * Возвращает значение, определяющее, показывается ли кнопка раскрытия списка
         * @return {Boolean}
         */
        getShowPopup: function () {

        },

        /**
         * Устанавливает значение, определяющее, показывается ли кнопка раскрытия списка
         * @param {Boolean} value
         * @constructor
         */
        setShowPopup: function (value) {

        },

        /**
         * Возвращает значение, определяющее, показывается ли кнопка выбора значения (…).
         * @returns {Boolean}
         */
        getShowSelect: function () {

        },

        /**
         * Устанавливает значение, определяющее, показывается ли кнопка выбора значения (…).
         * @param {Boolean} value
         */
        setShowSelect: function (value) {

        },

        /**
         * Возвращает способ автозаполнения при вводе с клавиатуры.
         * @returns {String} @see {@link http://demo.infinnity.ru:8081/display/MC/Autocomplete}
         */
        getAutocomplete: function () {

        },

        /**
         * Устанавливает способ автозаполнения при вводе с клавиатуры.
         * @param value @see {@link http://demo.infinnity.ru:8081/display/MC/Autocomplete}
         */
        setAutocomplete: function (value) {
            this.control.set('autocomplete', value);
        },

        getSelectView: function () {
            return this.control.get('selectView');
        },

        setSelectView: function (selectViewValue) {
            this.control.set('selectView', selectViewValue);
        },

        setOpenListFunction: function(f){
            this.control.setOpenListFunction(f);
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

        /**
         * @description Установка подсказывающего текста
         * @param {String} value
         */
        setPlaceholder: function (value) {
            value = (typeof value === 'undefined' || value === null) ? '' : value;
            this.control.set('placeholder', value);
        },

        /**
         * @description Получение подсказывающего текста
         * @returns {String}
         */
        getPlaceholder: function () {
            return this.control.get('placeholder');
        },

        /**
         * @description Установка видимости кнопки очистки комбобокса
         * @param {Boolean} value
         */
        setShowClear: function (value) {
            if(typeof value === 'boolean') {
                this.control.set('showClear', value);
            };
        },

        /**
         * @description Получение видимости кнопки очистки комбобокса
         * @returns {Boolean}
         */
        getShowClear: function () {
            return this.control.get('showClear');
        },

        /**
         * @description Обработка изменения значения в строке поиска выпадающего списка
         * @param {Function} handler
         */
        onChangeTerm: function (handler) {
            this.control.onChangeTerm(handler);
        },

        onFirstOpening: function(handler){
            this.control.onFirstOpening(handler);
        },

        /**
         * @description Возвращает элементы списка значений соответствующие выбранному значению
         */
        getSelectedItems: function () {
            return this.control.getSelectedItems();
        },

        getDisplayValue: function (value) {
            return this.control.getDisplayValue(value);
        }


    },
    valuePropertyMixin
);
