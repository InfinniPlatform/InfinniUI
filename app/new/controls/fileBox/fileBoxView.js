/**
 * @augments ControlView
 * @mixes editorBaseViewMixin
 * @constructor
 */
var FileBoxView = ControlView.extend(/** @lends FileBoxView.prototype */ _.extend({}, editorBaseViewMixin, {

    template: InfinniUI.Template["new/controls/fileBox/template/fileBox.tpl.html"],

    className: 'pl-file-box',

    UI: _.extend({}, editorBaseViewMixin.UI, {
        label: '.pl-control-label',
        input: 'input',
        link: '.pl-filebox-link',
        download: '.pl-filebox-download',
        fileSize: '.pl-filebox-size',
        file: '.pl-filebox-file',
        remove: '.pl-filebox-remove',
        empty: '.pl-filebox-empty',
        info: '.pl-filebox-info',
        gripButton: '.pl-filebox-grip'
    }),

    events: {
        'change input': 'onChangeFileHandler',
        'click .pl-filebox-remove': 'onClickRemoveImageHandler'
    },

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);
        this.listenTo(this.model, 'change:labelText', this.updateLabelText);
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

    updateAcceptTypes: function () {
        var acceptTypes = this.model.get('acceptTypes');
        if (acceptTypes.length === 0) {
            this.ui.input.removeAttr('accept');
        } else {
            var accept = acceptTypes.toArray().join(',');
            this.ui.input.attr('accept', accept);
        }
    },

    updateText: function () {
        var text = this.model.get('text');
        this.ui.gripButton.text(text);
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
        var fileName = this.model.get('fileName');
        this.updateRemoveButtonState();
        this.ui.file.toggleClass('hidden', !isEnabled);
    },

    updateFileName: function () {
        //var fileName = this.model.get('fileName');
        //var enabled = this.model.get('enabled');
        //var value = this.model.get('value');
        //
        //if (value && (!fileName || fileName.length === 0)) {
        //    fileName = 'Скачать файл';
        //}
        //this.ui.download.text(fileName);
        //
        ////this.ui.empty.toggleClass('hidden', !!fileName);
        //this.ui.empty.toggleClass('hidden', !value);
        //this.ui.info.toggleClass('hidden', !fileName);
        this.updateFileInfo();
        this.updateRemoveButtonState();
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

    updateRemoveButtonState: function () {
        var enabled = this.model.get('enabled');
        var fileName = this.model.get('fileName');
        this.ui.remove.toggleClass('hidden', !enabled ||!fileName);
        this.ui.remove.prop('disabled', !enabled || !fileName);
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

        if (value && typeof value === 'object') {
            this.updateUrl(null);
        } else {
            this.updateUrl(value);
        }
    },

    updateUrl: function (url) {
        this.ui.download.attr('href', url);
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
