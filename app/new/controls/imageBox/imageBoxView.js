/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var ImageBoxView = ControlView.extend(/** @lends ImageBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/imageBox/template/imageBox.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        input: 'input',
        img: 'img',
        remove: '.image-remove'
    }),

    events: {
        'change input': 'onChangeFileHandler',
        'click .image-remove': 'onClickRemoveImageHandler'
    },

    onClickRemoveImageHandler: function () {
        this.model.removeFile();
        this.ui.input.val('');
    },

    onChangeFileHandler: function () {
        console.log(arguments);
        var file = null;
        var files = this.ui.input[0].files;

        if (files && files[0]) {
            file = files[0];
        }
        this.model.setFile(file);
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
            .listenTo(this.model, 'change:url', this.onChangeUrlHandler)
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler);
    },

    onChangeUrlHandler: function (model, url) {
        this.ui.img.attr('src', url);
        var none = url === null || typeof url === 'undefined';
        this.ui.remove.toggle(!none);
        this.ui.img.toggle(!none);
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
