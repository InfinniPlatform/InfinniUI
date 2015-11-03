var ComboBoxView = ListEditorBaseView.extend({

    className: 'pl-combobox',

    template: InfinniUI.Template["new/controls/comboBox/template/combobox.tpl.html"],

    events: {
        'click .pl-combobox__grip': 'onClickGripHandler'
    },

    UI: _.defaults({
        //items: '.pl-listbox-i',
        //checkingInputs: '.pl-listbox-input input'
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
                    var dropdownView = new ComboBoxDropdownView({
                        model: model
                    });

                    var $dropdown = dropdownView.render();

                    var rect = view.$el[0].getBoundingClientRect();
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

        this.$el.html(this.template());
        this.bindUIElements();

        this.bindUIElements();

        //this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    },

    onClickGripHandler: function () {
        this.toggleDropdown();
    },

    updateGrouping: function(){
        this.toggleDropdown(false);
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

    renderValue: function () {
        var model = this.model,
            multiSelect = model.get('multiSelect'),
            value = this.model.get('value'),
            $value = [],
            valueTemplate = this.model.get('valueTemplate');

        if (multiSelect && Array.isArray(value)) {
            $value = value.map(function(val, i) {
                return valueTemplate(null, {value: val, index: i}).render();
            });
        } else {
            $value = valueTemplate(null, {value: value}).render();
        }
        this.ui.value.empty();
        this.ui.value.append($value);
    }

});