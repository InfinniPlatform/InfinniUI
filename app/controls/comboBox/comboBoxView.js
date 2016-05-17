var ComboBoxView = ListEditorBaseView.extend({

    className: 'pl-combobox form-group',

    template: InfinniUI.Template["controls/comboBox/template/combobox.tpl.html"],

    events: {
        'click .pl-combobox__grip': 'onClickGripHandler',
        'click .pl-combobox__value': 'onClickValueHandler',
        'click .pl-combobox__clear': 'onClickClearHandler',
        'click .pl-control': 'onClickValueHandler',
        'keydown .pl-control': 'onKeyDownControlHandler'
    },

    UI: _.defaults({
        control: '.pl-control',
        label: '.pl-control-label',
        value: '.pl-combobox__value',
        clear: '.pl-combobox__clear'
    }, ListEditorBaseView.prototype.UI),

    isControlElement: function (el) {
        var res = ListEditorBaseView.prototype.isControlElement.call(this, el);

        if (res) {
            return res;
        }

        if (!this.dropDownView) {
            return false;
        }

        return $.contains(this.dropDownView.el, el);
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');
        var enabled = this.model.get('enabled');

        if (focusable && enabled) {
            this.ui.control.attr('tabindex', 0);
        } else {
            this.ui.control.removeAttr('tabindex');
        }
    },

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
        var model = this.model,
            view = this;

        //this.on('beforeClick', this.activateControl);

        this.on('render', function () {
            view.renderValue();

            model.on('change:dropdown', function (model, dropdown) {
                if (dropdown) {
                    model.set('autocompleteValue', '');//Сброс фильтра
                    model.set('focused', true);
                    if (view.dropDownView) {
                        view.dropDownView.remove();
                    }
                    var dropdownView = new ComboBoxDropdownView({
                        model: model
                    });
                    view.dropDownView = dropdownView;

                    this.listenTo(dropdownView, 'search', _.debounce(view.onSearchValueHandler.bind(view), 300));

                    var $dropdown = dropdownView.render();
                    $('body').append($dropdown);
                    setTimeout(dropdownView.updatePosition(view.el));

                    if (model.get('autocomplete')) {
                        dropdownView.setSearchFocus();
                    } else {
                        view.ui.control.focus();
                    }
                    setTimeout(dropdownView.ensureVisibleSelectedItem.bind(dropdownView), 0);
                } else {
                    view.ui.control.focus();
                }
            });
            model.onValueChanged(this.onChangeValueHandler.bind(this));

        }, this);
    },

    initHandlersForProperties: function(){
        ListEditorBaseView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:showClear', this.updateShowClear);
        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
    },

    render: function () {
        this.prerenderingActions();

        //var preparedItems = this.strategy.prepareItemsForRendering();
        //var template = this.strategy.getTemplate();

        //this.removeChildElements();

        this.renderTemplate(this.getTemplate());

        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    getTemplate: function () {
        return this.template;
    },

    onKeyDownControlHandler: function (event) {
        var enabled = this.model.get('enabled');

        if (!enabled) {
            event.preventDefault();
            return;
        }

        if (event.ctrlKey || event.altKey) {
            return;
        }

        if (this.isDropdown()) {
            return this.dropDownView.onKeyDownHandler.call(this.dropDownView, event);
        }
        switch (event.which) {
            case 40:    //Down Arrow
            case 13:    //Ennter
                event.preventDefault();
                this.toggleDropdown();
                break;
        }
    },

    onClickClearHandler: function () {
        var enabled = this.model.get('enabled');
        if (enabled) {
            this.model.set('value', null);
            this.ui.control.focus();
        }
    },

    onClickGripHandler: function () {
        var enabled = this.model.get('enabled');
        if (enabled) {
            this.toggleDropdown();
        }
    },

    updateProperties: function(){
        ListEditorBaseView.prototype.updateProperties.call(this);

        this.updateLabelText();
        this.updateShowClear();
    },

    updateGrouping: function(){
        this.toggleDropdown(false);
    },

    updateLabelText: function () {
        var labelText = this.model.get('labelText');
        if (labelText && labelText !== '') {
            this.ui.label.toggleClass('hidden', false);
        } else {
            this.ui.label.toggleClass('hidden', true);
        }

        this.ui.label.text(labelText);
    },

    updateEnabled: function () {
        ListEditorBaseView.prototype.updateEnabled.call(this);

        var enabled = this.model.get('enabled');

        if (!enabled) {
            //Prevent got focus
            this.ui.control.removeAttr('tabindex');
        } else {
            this.updateFocusable();
        }

    },

    updateValue: function(){
        this.updateShowClear();
    },

    updateShowClear: function () {
        var
            model = this.model,
            showClear = model.get('showClear'),
            value = model.get('value'),
            noValue = value === null || typeof value === 'undefined';

        this.ui.clear.toggleClass('hidden', !showClear || noValue);
    },

    updateSelectedItem: function () {

    },

    isDropdown: function () {
        var model = this.model;
        return !!model.get('dropdown');
    },

    toggleDropdown: function (toggle) {
        var model = this.model;
        if (typeof toggle === 'undefined') {
            toggle = !model.get('dropdown');
        }
        model.set('dropdown', toggle);
    },

    onChangeValueHandler: function () {
        this.renderValue();
    },

    rerender: function () {

    },

    renderValue: function () {
        var model = this.model,
            multiSelect = model.get('multiSelect'),
            value = this.model.get('value'),
            $value = [],
            valueTemplate = this.model.get('valueTemplate');

        if (multiSelect && Array.isArray(value)) {
            var valueView = new ComboBoxValues({
                items: value.map(function(val, i) {
                    return {
                        "$value": valueTemplate(null, {value: val, index: i}).render(),
                        "value": val,
                        "index": i
                    };
                })
            });
            valueView.listenTo(model, 'toggle', valueView.setFocus);
            this.listenTo(valueView, 'remove', this.onRemoveValueHandler);
            this.listenTo(valueView, 'search', _.debounce(this.onSearchValueHandler.bind(this), 300));
            $value = valueView.render();
        } else {
            $value = valueTemplate(null, {value: value}).render();
        }
        this.ui.value.empty();
        this.ui.value.append($value);

        editorBaseViewMixin.updateValueState.call(this);
    },

    onRemoveValueHandler: function (value) {
        this.model.toggleValue(value, false);
    },

    /**
     * @description Устанока фильтра быстрого выбора элемента из списка
     * @param {string} text
     */
    onSearchValueHandler: function (text) {
        this.toggleDropdown(true);
        this.model.set('autocompleteValue', text);
    },

    onClickValueHandler: function (event) {
        var enabled = this.model.get('enabled');

        if (enabled) {
            this.toggleDropdown(true);
        }
    }

});