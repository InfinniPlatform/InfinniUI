/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var FileBoxView = ControlView.extend(/** @lends FileBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/fileBox/template/template.tpl.html"],

    className: 'pl-file-box',

    UI: _.extend({}, editorBaseViewMixin.UI, {
        label: '.pl-control-label',
        btnRemove: '.pl-filebox-btn-remove',
        btnPick: '.pl-filebox-btn-pick',
        fileEmpty: '.pl-filebox-file-empty',
        fileUpload: '.pl-filebox-file-upload',
        fileDownload: '.pl-filebox-file-download',
        fileDownloadUrl: '.pl-filebox-file-download-url',
        edit: '.pl-filebox-edit',
        readonly: '.pl-filebox-readonly',
        control: '.form-control',

        input: 'input'
    }),

    events: {
        'change input': 'onChangeFileHandler',
        'click .pl-filebox-btn-remove': 'onClickRemoveImageHandler'
    },

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
        this.listenTo(this.model, 'change:readOnly', this.updateReadOnly);
        this.listenTo(this.model, 'change:fileName', this.updateFileName);
        this.listenTo(this.model, 'change:fileSize', this.updateFileSize);
        this.listenTo(this.model, 'change:fileTime', this.updateFileTime);
        this.listenTo(this.model, 'change:fileType', this.updateFileType);
        this.listenTo(this.model, 'change:value', this.updateValue);

        this.listenTo(this.model, 'change:hintText', this.updateHintText);
        this.listenTo(this.model, 'change:errorText', this.updateErrorText);
        this.listenTo(this.model, 'change:warningText', this.updateWarningText);

        var acceptTypes = this.model.get('acceptTypes');
        acceptTypes.onChange(this.updateAcceptTypes.bind(this));
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);

        this.updateReadOnly();
        this.updateLabelText();
        this.updateFileName();
        this.updateFileSize();
        this.updateFileType();
        this.updateFileTime();
        this.updateAcceptTypes();
        this.updateValue();

        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
    },

    updateLabelText: function () {
        var labelText = this.model.get('labelText');
        this.ui.label.text(labelText);
    },

    updateReadOnly: function () {
        var model = this.model;
        var readOnly = model.get('readOnly');
        this.ui.edit.toggleClass('hidden', readOnly === true);
        this.ui.readonly.toggleClass('hidden', readOnly !== true);
    },

    updateAcceptTypes: function () {
        var acceptTypes = this.model.get('acceptTypes');
        if (acceptTypes.length === 0) {
            this.ui.input.removeAttr('accept');
        } else {
            var accept = acceptTypes.toArray().join(',');
            this.ui.input.attr('accept', accept);
        }
    },

    updateFocusable: function () {
        var focusable = this.model.get('focusable');

        if (focusable) {
            this.ui.control.attr('tabindex', 0);
        } else {
            this.ui.control.removeAttr('tabindex');
        }
    },

    updateText: function () {
        var text = this.model.get('text');
        this.ui.btnPick.attr('title', text);
    },

    updateHintText: function(){
        var hintText = this.model.get('hintText');
        if(hintText){
            this.ui.hintText
                .text(hintText)
                .removeClass('hidden');
        }else{
            this.ui.hintText
                .text('')
                .addClass('hidden');
        }

    },

    updateErrorText: function(){
        var errorText = this.model.get('errorText');
        if(errorText){
            this.ui.errorText
                .text(errorText)
                .removeClass('hidden');
        }else{
            this.ui.errorText
                .text('')
                .addClass('hidden');
        }

    },

    updateWarningText: function(){
        var warningText = this.model.get('warningText');
        if(warningText){
            this.ui.warningText
                .text(warningText)
                .removeClass('hidden');
        }else{
            this.ui.warningText
                .text('')
                .addClass('hidden');
        }

    },

    updateEnabled: function () {
        ControlView.prototype.updateEnabled.call(this);

        var isEnabled = this.model.get('enabled');

        this.ui.input.prop('disabled', !isEnabled);
        this.ui.btnRemove.prop('disabled', !isEnabled);
        this.ui.btnPick.toggleClass('disabled', !isEnabled);

    },

    updateFileName: function () {
        var fileName = this.model.get('fileName');
        this.ui.fileUpload.text(fileName);
        this.ui.fileDownloadUrl.text(fileName);
    },

    updateFileSize: function () {
        //var fileSize = this.model.get('fileSize');
        //
        //var text = '';
        //if (typeof fileSize !== 'undefined' && fileSize !== null) {
        //    text = InfinniUI.format.humanFileSize(fileSize);
        //}
        //this.ui.fileSize.text(text);
    },

    updateFileInfo: function() {
        return;
        var model = this.model;
        var
            value = model.get('value'),
            fileName = model.get('fileName');

        if (!value || value.length === 0) {
            this.ui.info.toggleClass('hidden', true);
            this.ui.empty.toggleClass('hidden', false);
        } else {
            if (!fileName || fileName.length === 0) {
                fileName = 'Скачать файл';
            }
            this.ui.download.text(fileName);
            this.ui.info.toggleClass('hidden', false);
            this.ui.empty.toggleClass('hidden', true);
        }
    },

    updateFileTime: function () {
        var time = this.model.get('fileTime');

        //@TODO Update file's datetime on view
    },

    updateFileType: function () {
        var fileType = this.model.get('fileType');

        //@TODO Update file's mime type on view
    },

    updateValue: function () {
        var model = this.model;
        var value = model.get('value');

        var fileEmpty = false,
            fileUpload = false,
            fileDownload = false;

        if (value === null || typeof value === 'undefined') {
            //No file
            fileEmpty = value === null || typeof value === 'undefined';
            this.updateUrl(null);
        } else if (value && typeof value === 'object') {
            //File instance
            fileUpload = value && typeof value === 'object';
            this.updateUrl(null);
        } else {
            //Url
            fileDownload = true;
            this.updateUrl(value);
        }

        this.ui.fileEmpty.toggleClass('hidden', !fileEmpty);
        this.ui.fileUpload.toggleClass('hidden', !fileUpload);
        this.ui.fileDownload.toggleClass('hidden', !fileDownload);

        this.ui.btnRemove.toggleClass('hidden', fileEmpty);
        this.ui.btnPick.toggleClass('hidden', !fileEmpty);
    },

    updateUrl: function (url) {
        this.ui.fileDownloadUrl.attr('href', url);
        var none = url === null || typeof url === 'undefined';
        this.$el.toggleClass('pl-empty', none);
        this.updateFileInfo();
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
