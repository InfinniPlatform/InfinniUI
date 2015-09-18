/**
 * @class CheckBoxView
 * @augments ControlView
 * @mixes editorBaseViewMixin
 */
var CheckBoxView = ControlView.extend(/** @lends CheckBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/checkBox/template/checkBox.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        input: 'input'
    }),

    events: {
        'click input': 'onClickHandler'
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
        editorBaseViewMixin.initOnChangeHandler.call(this);

        this
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler);
    },

    getData: function () {
        //var model = this.model;

        return _.extend({},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this)
        );
    },


    onClickHandler: function (event) {
        var checked = this.ui.input.prop('checked');
        this.model.set('value', checked);
        this.ui.input.prop('checked', this.model.get('value'));
    },

    OnChangeEnabledHandler: function (model, value) {
        this.ui.input.prop('disabled', !value);
    },

    onChangeValueHandler: function (model, value) {
        this.ui.input.prop('checked', !!value);
    }

}));
