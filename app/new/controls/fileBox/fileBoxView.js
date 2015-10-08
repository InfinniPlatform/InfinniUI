/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var FileBoxView = ControlView.extend(/** @lends FileBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/fileBox/template/fileBox.tpl.html"],

    className: 'pl-file-box',

    UI: _.extend({}, editorBaseViewMixin.UI, {
        input: 'input',
        name: '.file_name',
        size: '.file_size',
        file: '.file',
        remove: '.file-remove'
    }),

    events: {
        'change input': 'onChangeFileHandler',
        'click .file-remove': 'onClickRemoveImageHandler'
    },

    onClickRemoveImageHandler: function () {
        this.model.removeFile();
        this.ui.input.val('');
    },

    onChangeFileHandler: function () {
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
            .listenTo(this.model, 'change:fileName', this.onChangeFileNameHandler)
            .listenTo(this.model, 'change:fileSize', this.onChangeFileSizeHandler)
            .listenTo(this.model, 'change:url', this.onChangeUrlHandler)
            .listenTo(this.model, 'change:enabled', this.OnChangeEnabledHandler);
    },

    onChangeFileNameHandler: function (model, value) {
        this.ui.name.text(value);
        this.ui.file.toggle(typeof value !== 'undefined' && value !== null && value.length);
    },

    onChangeFileSizeHandler: function (model, value) {
        var text = '';
        if (typeof value !== 'undefined' && value !== null) {
            text = InfinniUI.format.humanFileSize(value);
        }
        this.ui.size.text(text);
    },

    getData: function () {

        return _.extend({},
            ControlView.prototype.getData.call(this),
            editorBaseViewMixin.getData.call(this)
        );
    },

    OnChangeEnabledHandler: function (model, value) {
        this.ui.input.prop('disabled', !value);
    },

    onChangeUrlHandler: function (model, value) {

    }

}));
