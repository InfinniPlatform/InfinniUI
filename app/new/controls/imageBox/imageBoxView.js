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

        this.listenTo(this.model, 'change:value', this.updateUrl);
        this.listenTo(this.model, 'change:hintText', this.updateHintText);
        this.listenTo(this.model, 'change:errorText', this.updateErrorText);
        this.listenTo(this.model, 'change:warningText', this.updateWarningText);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);

        this.updateUrl();
        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
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

    updateUrl: function () {
        var url = this.model.get('value');

        this.ui.img.attr('src', url);
        var none = url === null || typeof url === 'undefined';
        this.$el.toggleClass('pl-empty', none);
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
