/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var ImageBoxView = ControlView.extend(/** @lends ImageBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/imageBox/template/imageBox.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        input: 'input'
    }),

    events: {

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

        return _.extend({},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this)
        );
    },

    OnChangeEnabledHandler: function (model, value) {
        this.ui.input.prop('disabled', !value);
    }

}));
