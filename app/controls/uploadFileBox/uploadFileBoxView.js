var UploadFileBoxView = ControlView.extend({
    className: 'pl-upload-file-box',

    blobNameDefault: 'Скачать',

    template: InfinniUI.Template["controls/uploadFileBox/template/uploadFileBox.tpl.html"],

    UI: {
        input: 'input[type=file]',
        preview: '.file-link-preview',
        link: '.file-link-url',
        empty: '.file-link-none'
    },

    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:value', this.updateValueHandler);
        this.listenTo(this.model, 'change:readOnly', this.updateReadOnly);
        this.listenTo(this.model, 'change:acceptTypes', this.applyAcceptTypes);
        this.listenTo(this.model, 'change:url', this.onChangeUrl);
    },

    render: function () {

        this.prerenderingActions();

        this.$el.html(this.template({}));

        this.bindUIElements();

        var self = this;


        this.ui.input.change(function (e) {
            if (this.files.length == 0) return;
            var file = this.files[0];
            self.readFileValue(file);
        });

        this.applyAcceptTypes();
        this.updateReadOnly();
        this.applyBlobData();

        this.postrenderingActions();
        return this;
    },

    readFileValue : function (file) {
        var maxSize = this.model.get('maxSize');
        var model = this.model;

        if(typeof maxSize !== 'undefined' && maxSize !== null && file.size >= maxSize){
            alert('размер выбранного файла больше максимального ' + file.size);
            this.ui.input.val(null);
            return;
        }

        var blobData = InfinniUI.BlobUtils.createFromFile(file);
        model.set({value: blobData, file: file});
    },

    updateValueHandler: function(model, value){
        if (!this.wasRendered) {
            return;
        }

        this.applyBlobData();
    },

    applyAcceptTypes: function () {
        if (!this.wasRendered) {
            return;
        }
        var accept = this.model.get("acceptTypes");
        if(typeof accept !== 'undefined' && accept != null){
            this.ui.input.attr("accept", accept.join(','));
        }
    },

    applyBlobData: function () {
        var value = this.model.get('value');
        var that = this;

        var blobData = InfinniUI.ObjectUtils.getPropertyValue(value, 'Info');

        if (typeof blobData === 'undefined' || blobData === null) {
            //Файл не выбран. Очистить, если он был показан.
            this.ui.empty.removeClass('hidden');
            this.ui.link.addClass('hidden');
        } else {
            this.ui.empty.addClass('hidden');

            var id = InfinniUI.ObjectUtils.getPropertyValue(blobData, 'ContentId');

            if (typeof id !== 'undefined' && id !== null) {

                //this.ui.link.attr('href', this.model.get('url'));
                
                var blobName = blobData.Name;
                if (typeof blobName === 'undefined' || blobName === null) {
                    blobName = this.blobNameDefault;
                }

                this.ui.link
                    .text(blobName);

                this.sendRequest(this.model.get('url'), function(data){
                        var blob = new Blob([data], {type: "octet/stream"}),
                            url = window.URL.createObjectURL(blob);
                        that.ui.link.attr('href', url);
                        that.ui.link.attr('download', blobName);
                        that.ui.link.removeClass('hidden');
                    }
                );
            }
        }
    },

    applyUrl: function () {
        if (!this.wasRendered) {
            return;
        }

        this.ui.link.attr('href', url);
    },

    updateReadOnly: function(){
        if(!this.wasRendered) {
            return;
        }
        var readOnly = this.model.get('readOnly');
        this.ui.input.toggleClass('hidden', readOnly);
        this.ui.input.prop('disabled', readOnly);
    },

    onChangeUrl: function (model, url) {
        // @TODO Изменить ссылку на представлении
        this.applyBlobData();
    },

    sendRequest: function(url, handler){
        var xmlhttp = this.getXmlHttp();

        xmlhttp.open('GET', url, true);
        xmlhttp.withCredentials = true;
        xmlhttp.responseType = 'arraybuffer';
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    handler(xmlhttp.response);
                }
            }
        };
        xmlhttp.send();
    },

    getXmlHttp: function(){
        var xmlhttp;
        try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e1) {
                xmlhttp = false;
            }
        }

        if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
        }

        return xmlhttp;
    }
});
