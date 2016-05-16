/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var ImageBoxView = ControlView.extend(/** @lends ImageBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    className: 'pl-imagebox',

    template: InfinniUI.Template["new/controls/imageBox/template/imageBox.tpl.html"],

    UI: _.extend({}, editorBaseViewMixin.UI, {
        input: 'input',
        img: 'img',
        file: '.pl-image-file',
        remove: '.pl-image-remove',
        uploadButton: '.pl-image-file-upload-button'
    }),

    events: {
        'change input': 'onChangeFileHandler',
        'click .pl-image-remove': 'onClickRemoveImageHandler'
    },


    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:value', this.updateValue);
        this.listenTo(this.model, 'change:hintText', this.updateHintText);
        this.listenTo(this.model, 'change:errorText', this.updateErrorText);
        this.listenTo(this.model, 'change:warningText', this.updateWarningText);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);

        this.updateValue();
        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (focusable) {
            this.ui.file.attr('tabindex', 0);
        } else {
            this.ui.file.removeAttr('tabindex');
        }
    },

    updateText: function () {
        var text = this.model.get('text');
        this.ui.uploadButton.text(text);
    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.call(this);
        var isEnabled = this.model.get('enabled');
        this.ui.input.prop('disabled', !isEnabled);
    },

    updateValue: function () {
        var model = this.model;
        var value = model.get('value');

        if (value && typeof value === 'object') {
            //Native FileAPI File instance, start loading preview
            this.stopLoadingFile();
            var fileLoader = this.loadPreview(value);

            this.fileLoader = fileLoader;

            fileLoader.then(function (file, content) {
                this.updateUrl(content);
            }.bind(this), function (err) {
                console.log(err);
            });
        } else {
            this.updateUrl(value);
        }
    },

    updateUrl: function (url) {
        this.ui.img.attr('src', url);
        var none = url === null || typeof url === 'undefined';
        this.$el.toggleClass('pl-empty', none);
    },

    stopLoadingFile: function () {
        var fileLoader = this.fileLoader;
        if (fileLoader && fileLoader.state() === 'pending') {
            fileLoader.reject();
        }
    },

    loadPreview: function (file) {
        var defer = $.Deferred();
        var reader = new FileReader();
        reader.onload = (function (file) {
            return function (event) {
                defer.resolve(file, event.target.result);
            };
        }(file));
        reader.onerror  = function (event) {
            defer.reject(event);
        };
        reader.readAsDataURL(file);
        return defer.promise();
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
        this.updateProperties();

        this.trigger('render');

        this.postrenderingActions();
        return this;
    }

}));
