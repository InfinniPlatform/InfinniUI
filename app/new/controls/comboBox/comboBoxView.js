var ComboBoxView = ListEditorBaseView.extend({

    className: 'pl-combobox',

    template: InfinniUI.Template["new/controls/comboBox/template/combobox.tpl.html"],

    events: {
        'click .pl-combobox__grip': 'onClickGripHandler'
    },

    UI: _.defaults({
        //items: '.pl-listbox-i',
        //checkingInputs: '.pl-listbox-input input'
    }, ListEditorBaseView.prototype.UI),

    initialize: function (options) {
        ListEditorBaseView.prototype.initialize.call(this, options);
        var model = this.model;
        this.on('render', function () {
            model.on('change:dropdown', function (model, dropdown) {
                if (dropdown) {
                    var dropdownView = new ComboBoxDropdownView({
                        model: model
                    });

                    $('body').append(dropdownView.render());
                }
            });
        });
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
    }


});