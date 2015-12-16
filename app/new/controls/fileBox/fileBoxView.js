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

    initHandlersForProperties: function(){
        ControlView.prototype.initHandlersForProperties.call(this);

        this.listenTo(this.model, 'change:fileName', this.updateFileName);
        this.listenTo(this.model, 'change:fileSize', this.updateFileSize);
        this.listenTo(this.model, 'change:url', this.updateUrl);

        this.listenTo(this.model, 'change:hintText', this.updateHintText);
        this.listenTo(this.model, 'change:errorText', this.updateErrorText);
        this.listenTo(this.model, 'change:warningText', this.updateWarningText);
    },

    updateProperties: function(){
        ControlView.prototype.updateProperties.call(this);

        this.updateHintText();
        this.updateErrorText();
        this.updateWarningText();
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
    },

    updateFileName: function () {
        var fileName = this.model.get('fileName');
        this.ui.name.text(fileName);
        this.ui.file.toggle(typeof fileName !== 'undefined' && fileName !== null && fileName.length);
    },

    updateFileSize: function () {
        var fileSize = this.model.get('fileSize');

        var text = '';
        if (typeof fileSize !== 'undefined' && fileSize !== null) {
            text = InfinniUI.format.humanFileSize(fileSize);
        }
        this.ui.size.text(text);
    },

    updateUrl: function () {
        //var url = this.model.get('url');


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
