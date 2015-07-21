/**
 * @class ComboBoxView
 * @property {object[]} listData Список значений для плагина Select2
 * @property {ComboBoxModel} model
 * @property {ComboBoxMultiSelectStrategy|ComboBoxSingleSelectStrategy} multiSelectStrategy
 * @extends ControlView
 */
var ComboBoxView = ControlView.extend({
    className: 'pl-combo-box',

    template: InfinniUI.Template["controls/comboBox/template/combobox.tpl.html"],
    selectViewTemplate: InfinniUI.Template["controls/comboBox/template/selectView.tpl.html"],

    UI: {
        control: 'input',
        selectedViewValue: '.select-view-value',
        clearValue: '.clear-value',
        btnSelectView: 'button.select-view'
    },

    events: {
        'change input': 'onChangeInputHandler',
        'select2-focus input': 'onFocusHandler',
        'select2-blur input': 'onBlurHandler',
        'click .select-view': 'onSelectViewSearch',
        'click .clear-value': 'onClearValueHandler',
        'mouseenter': 'onMouseenterHandler',
        'mouseleave': 'onMouseleaveHandler'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:value', this.onUpdateValueHandler);
        this.listenTo(this.model, 'change:items', this.onUpdateItemsHandler);
        this.listenTo(this.model, 'change:multiSelect', this.onChangeMultiSelect);
        this.listenTo(this.model, 'change:readOnly', this.onChangeReadOnly);
        this.listenTo(this.model, 'change:enabled', this.onChangeEnabledHandler);
        this.listenTo(this.model, 'change:placeholder', this.onChangePlaceholderHandler);

        //Список значений выпадающего списка.
        //элементы списка в select2 беруться по ссылке на этот массив
        //  Items in such an array must have id and text keys!!! Из документации select2

        this.listData = [];

        this.openListFunction = null;

        this.isListWasFirstOpened = false;
        this.isOpen = false;

        this.initMultiSelectStrategy();
    },

    initMultiSelectStrategy: function () {
        var multiSelect = this.model.get('multiSelect');

        if (multiSelect === true) {
            this.multiSelectStrategy = new ComboBoxMultiSelectStrategy();
        } else {
            this.multiSelectStrategy = new ComboBoxSingleSelectStrategy();
        }
    },

    render: function () {
        this.prerenderingActions();
        var data = this.model.toJSON(),
            needSearch = this.model.get('autocomplete') == 'Client' || this.model.get('autocomplete') == 'Server',
            that = this,
            options = {
                readonly: data.readOnly,
                placeholder: data.placeholder,
                multiple: data.multiSelect,
                allowClear: data.showClear,
                width: "off",
                minimumResultsForSearch: needSearch ? 5 : -1,
                initSelection: this.initSelection.bind(this)
            };

        var autocomplete = this.model.get('autocomplete');

        if(autocomplete !== 'Server'){
            options.data = this.listData;
        }else{
            options.query = this.select2Query.bind(this);
        }

        if(this.model.get('selectView')){
            this.$el.html(this.selectViewTemplate(data));
        }else {
            this.$el.html(this.template(data));
        }

        this.bindUIElements();
        this.ui.control.select2(options);

        this.setEnabled(data.enabled);


        this.ui.control.on('select2-opening', function(event){
            if (that.model.get('showPopup') !== true) {
                event.preventDefault();
            }

            that.isOpen = true;
            if(!that.isListWasFirstOpened){
                that.isListWasFirstOpened = true;
                that.trigger('firstOpening');
            }
        });

        this.ui.control.on('select2-close', function(){
            that.isOpen = false;
        });


        this.setSelectedValue();

        this.postrenderingActions();
        return this;
    },

    /**
     * @private
     * @description Запрос списка значений выпадающего списка
     * @param options
     */
    select2Query: function (options) {
        if(options.term == this.model.get('term')){
            this.select2callback(options.callback)
        }else{
            var that = this;
            var autocomplete = this.model.get('autocomplete');
            var delay = autocomplete === 'Server' ? 400 : 0;

            if(this.lastQueryId){
                clearTimeout(this.lastQueryId);
            }

            this.lastQueryId = setTimeout(function(){
                that.lastQueryId = null;

                var term = that.model.get('term');

                that.callback2query = that.callback2query || {};
                that.callback2query[options.term] = options.callback;
                that.model.set('term', options.term);
                that.select2callback(options.callback);
            } , delay);
        }
    },

    /**
     * @private
     * @description Вызов функции обраьтного вызова плагина select2 для списка значений
     * @param callback
     */
    select2callback: function (callback) {
        if (typeof callback === 'undefined' || callback === null) {
            return;
        }

        callback({
            results: this.listData,
            more: false
        });
    },

    /**
     * @protected
     * Обработчик изменения value в модели.
     * Отображает в элементе выбранные значения, если они были изменены
     */
    onUpdateValueHandler: function () {
        var value = this.model.get('value');

        if (!this.wasRendered) {
            return;
        }

        this.setSelectedValue();

    },

    setSelectedValue: function () {
        var value = this.model.get('value');
        this.ui.control.select2('val', this.buildSelectedFromValue(value));
    },

    initSelection: function (element, callback) {
        var model = this.model;
        var value = model.get('value');
        var valueProperty = model.get('valueProperty');
        var getDisplayValue = this.getDisplayValue.bind(this);
        var data = this.multiSelectStrategy.initSelectionData(value, valueProperty, getDisplayValue);
        callback(data);
    },


    onUpdateItemsHandler: function (model, value) {
        var valueProperty = model.get('valueProperty');
        var displayProperty = model.get('displayProperty');
        var list = this.listData;
        var items = [];
        var that = this;

        if (_.isEmpty(valueProperty)) {
            valueProperty = 'Id';
        }

        list.length = 0;

        if (typeof value === 'undefined' || value === '') {
            return;
        }
        //При изменении списка значений, переформируем список значений для плагина Select2
        items = _.map(value, function (item) {
            return {
                id: InfinniUI.ObjectUtils.getPropertyValue(item, valueProperty),
                text: that.getDisplayValue(item) || '-Не найдено поле [' + displayProperty + '] -'
            };
        });

        Array.prototype.push.apply(list, items);

        //Если задан термин для автокомплита - пропускаем результаты ч/з callback select2
        var term = this.model.get('term');
        if (this.callback2query && this.callback2query[term]) {
            this.select2callback(this.callback2query[term]);
        }

        if (this.wasRendered) {
            this.setSelectedValue();
        }

        if(this.isOpen){
            if(this.model.get('autocomplete') == 'None') {
                this.ui.control.select2('close');
                this.ui.control.select2('open');
            }

            //Триггеринг события, для вызова метода обновления списка значений select2.updateResults
            // т.к. прямой вызов этого метода невозможен в плагине select2
            this.ui.control.select2('dropdown').find('input.select2-input').trigger('input');
        }
    },

    getDisplayValue: function(fullValue){
        var value = '';

        if(fullValue === undefined || fullValue === null){
            return '';
        }

        var itemFormat = this.model.get('itemFormat'),
            displayProperty = this.model.get('displayProperty');

        var props = _.reduce(_.keys(fullValue), function (amount, name) {
            return (['Id', 'DisplayName'].indexOf(name) === -1) ? amount + 1 : amount;
        }, 0);

        if (props && itemFormat) {
            //Если fullValue содержит атрибуты кроме Id и DisplayName + задан ItemFormat
            value = itemFormat.format(fullValue);
            if (typeof value !== 'undefined' && value !== null && value !== '') {
                return value;
            }
        }

        if(displayProperty){
            value = InfinniUI.ObjectUtils.getPropertyValue(fullValue, displayProperty);
            if (value !== null && typeof value !== 'undefined') {
                return value;
            }
        }

        return InfinniUI.ObjectUtils.getPropertyValue(fullValue, 'DisplayName');

        //return '---';
    },

    onChangeMultiSelect: function (/*model, value*/) {

        this.initMultiSelectStrategy();

        if (!this.wasRendered) return;

        throw ('В runtime нельзя изменить MultiSelect');
    },

    onChangeReadOnly: function (model, value) {
        if (!this.wasRendered) return;
        this.ui.control.select2('readonly', value);
        this.ui.btnSelectView.prop('disabled', value);
    },

    onChangeEnabledHandler: function (model, value) {
        if (!this.wasRendered) return;
        this.setEnabled(value);
    },

    setEnabled: function (value) {
        this.ui.control.select2('enable', value);
        this.ui.btnSelectView.prop('disabled', value !== true);

        if(!value){this.ui.clearValue.hide()}
    },

    /**
     * Обработчик выбора элемента в выпадающем списке
     * @param event
     */
    onChangeInputHandler: function (event) {
        var selected = event.val;
        var model = this.model;

        model.set('value', this.buildValueFromSelected(selected, this.listData));
    },

    onChangePlaceholderHandler: function (model, value) {
        if (!this.wasRendered) {
            return;
        }

        value = (typeof value === 'undefined' || value === null) ? '' : value;
        this.ui.control.select2({
            placeholder: value
        });
    },

    //initSelection: function (element, callback) {
    //    var id = element.val();
    //    var value = this.model.get('value');
    //    var data = this.buildSelection(id, value, this.listData);
    //    callback(data);
    //},


    /**
     * @description Формирует значения для выделения выбранных значений в выпадающем списке
     * @param {Object} value
     * @param {Number} value.Id
     * @param {String} value.DisplayName
     * @returns {*}
     */
    buildSelectedFromValue: function (value) {
        return this.multiSelectStrategy.buildSelectedFromValue(value);
    },

    /**
     * @description Формирует список значений контрола по списку выбранных значений в выпадающем списке
     * @returns {*}
     */
    buildValueFromSelected: function (selected, list) {
        return this.multiSelectStrategy.buildValueFromSelected(selected, list);
    },

    buildSelection: function (selected, value, list) {
        return this.multiSelectStrategy.buildSelection(selected, value, list);
    },

    setOpenListFunction: function(f){
        this.openListFunction = f;
    },

    onSelectViewSearch: function(){
        this.openListFunction();
    },

    onClearValueHandler: function(e){
        var model = this.model;
        if (model.get('enabled') && !model.get('readOnly')) {
            this.model.set('value', null);
            this.ui.clearValue.hide();
        }
    },

    onMouseenterHandler: function () {
        if(this.model.get('value') && this.model.get('showClear') && this.model.get('enabled')){
            this.ui.clearValue.show();
        }
    },

    onMouseleaveHandler: function () {
        this.ui.clearValue.hide();
    },

    /**
     * @description Возвращает объект из исходного списка значений для выбранного значения
     * @returns {*}
     */
    getSelectedItems: function () {
        var multiSelect = this.model.get('multiSelect');
        var value = this.model.get('value');
        var items = this.model.get('items');
        var result = null;

        if (typeof value === 'undefined' || value === null) {
            return multiSelect ? [] : null;
        }

        if (multiSelect) {
            result = _.map(value, function (valueItem) {
                return _.findWhere(items, {Id: valueItem.Id});
            });
        } else if (typeof value.Id !== 'undefined' && value.Id !== null) {
            result = _.findWhere(items, {Id: value.Id});
        }

        return result;
    },

    /**
     * @private
     */
    onFocusHandler: function () {
        $("#select2-drop-mask").click();
        this.callEventHandler('OnGotFocus');
    },

    /**
     * @private
     */
    onBlurHandler: function () {
        this.callEventHandler('OnLostFocus');
    }

});
