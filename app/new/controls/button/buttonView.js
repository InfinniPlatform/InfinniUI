/**
 * @class ButtonView
 * @augments ControlView
 */
var ButtonView = ControlView.extend({

    template: InfinniUI.Template["new/controls/button/template/button.tpl.html"],

    UI: {
        button: 'button'
    },

    events: {
        'click button': 'onClickHandler'
    },

    render: function () {
        this.prerenderingActions();
        this.renderTemplate(this.template);
        this.postrenderingActions();
        this.trigger('render');
        return this;
    },

    initOnChangeHandler: function () {
        ControlView.prototype.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler)
            .listenTo(this.model, 'change:content', this.onChangeContentHandler);
    },

    getData: function () {
        var model = this.model;
        var content = model.get('content');

        return _.extend({},
            ControlView.prototype.getData.call(this),
            {
                content: content()
            }
        );
    },

    click: function () {
        if (this.ui.button) {
            this.ui.button.click();
        }
    },

    onClickHandler: function (event) {

    },

    OnChangeEnabledHandler: function (model, value) {
        this.ui.button.prop('disabled', !value);
    },

    onChangeContentHandler: function (model, value) {
        this.ui.button.html(value);
    }

});
