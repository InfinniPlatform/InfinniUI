var ComboBoxView = ListEditorBaseView.extend({

    className: 'pl-combobox form-group',

    template: InfinniUI.Template["new/controls/comboBox/template/combobox.tpl.html"],

    events: {
        'click .pl-combobox__grip': 'onClickGripHandler',
        'click .pl-combobox__value': 'onClickValueHandler'
    },

    UI: _.defaults({
        label: '.pl-control-label',
        value: '.pl-combobox__value'
    }, ListEditorBaseView.prototype.UI),

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
        var model = this.model,
            view = this;
        this.on('render', function () {
            view.renderValue();
            model.on('change:dropdown', function (model, dropdown) {
                if (dropdown) {
                    model.set('search', '');//Сброс фильтра
                    if (view.dropDownView) {
                        view.dropDownView.remove();
                    }
                    var dropdownView = new ComboBoxDropdownView({
                        model: model
                    });
                    view.dropDownView = dropdownView;

                    this.listenTo(dropdownView, 'search', _.debounce(view.onSearchValueHandler.bind(view), 300));

                    var $dropdown = dropdownView.render();

                    var rect = view.$el[0].getBoundingClientRect();
                    //@TODO Вынести общие стили в css
                    var style = {
                        position: "absolute",
                        top: window.pageYOffset + rect.bottom,
                        left: window.pageXOffset + rect.left,
                        width: rect.width
                    };
                    //@TODO Добавить алгоритм определения куда расхлапывать список вверх/вниз
                    //Для расхлопывания вверх:
                    //bottom: pageYOffset - rect.height
                    //Для расхлопывания вниз:
                    //top: window.pageYOffset + rect.bottom

                    $dropdown.css(style);
                    $('body').append($dropdown);
                    if (!model.get('multiSelect')) {
                        dropdownView.setSearchFocus();
                    }
                }
            });
            model.onValueChanged(this.onChangeValueHandler.bind(this));

        }, this);
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

    onClickGripHandler: function () {
        var enabled = this.model.get('enabled');
        if (enabled) {
            this.toggleDropdown();
        }
    },

    updateProperties: function(){
        ListEditorBaseView.prototype.updateProperties.call(this);

        this.updateLabelText();
    },

    updateGrouping: function(){
        this.toggleDropdown(false);
    },

    updateLabelText: function () {
        var labelText = this.model.get('labelText');
        if (labelText && labelText !== '') {
            this.ui.label.text(labelText);
            this.ui.label.toggleClass('hidden', false);
        } else {
            this.ui.label.toggleClass('hidden', true);
        }

    },

    updateEnabled: function () {
        ListEditorBaseView.prototype.updateEnabled.call(this);

        var enabled = this.model.get('enabled');

    },

    updateValue: function(){

    },

    updateSelectedItem: function () {

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
        this.model.set('search', text);
    },

    onClickValueHandler: function (event) {
        var enabled = this.model.get('enabled');

        if (enabled) {
            this.toggleDropdown(true);
        }
    }

});