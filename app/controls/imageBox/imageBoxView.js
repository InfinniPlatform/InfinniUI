var ImageBoxView = ControlView.extend({
    className: 'pl-image-box',

    template: InfinniUI.Template["controls/imageBox/template/imagebox.tpl.html"],

    UI: {
        input: 'input[type=file]',
        image: 'img',
        thumbnail: '.pl-thumbnail'
    },


    initialize: function () {
        ControlView.prototype.initialize.apply(this);
        this.listenTo(this.model, 'change:value', this.updateValueHandler);
        this.listenTo(this.model, 'change:readOnly', this.updateReadOnly);
        this.listenTo(this.model, 'change:acceptTypes', this.applyAcceptTypes);
        this.listenTo(this.model, 'change:url', this.onChangeUrlHandler);

        this.fileLoader = null;
    },

    render: function () {

        this.prerenderingActions();

        this.$el
            .html(this.template({}));

        this.bindUIElements();
        this.setPreviewUrl(this.model.get('url'));
        var self = this;

        this.ui.input.change(function (e) {
            if (this.files.length == 0) return;
            var file = this.files[0];
            self.readValue(file);
        });

        this.applyAcceptTypes();
        this.applyBlobData();

        this.postrenderingActions();
        this.updateReadOnly();
        return this;
    },

    readValue : function (file) {
        this.cancelLoadPreview();
        var maxSize = this.model.get('maxSize');
        var model = this.model;

        if(typeof maxSize !== 'undefined' && maxSize > 0 && file.size >= this.model.get('maxSize')){
            alert('размер выбранного файла больше максимального ' + file.size);
            return;
        }

        var blobData = InfinniUI.BlobUtils.createFromFile(file);
        model.set({value: blobData, file: file});
        this.loadPreview(file);
    },

    /**
     * @private
     * @description Отменяет активную загрузку изображения для предпросмотра
     */
    cancelLoadPreview: function () {
        if (this.fileLoader !== null && this.fileLoader.state() === 'pending') {
            //Если в данный момент идет загрузка выбранного файла - отменяем его
            this.fileLoader.reject();
        }
    },

    /**
     * @private
     * @description Загрузка выбранного для загрузки изображения для предпросмотра
     * @param file
     */
    loadPreview: function (file) {
        var model = this.model;
        var defer = $.Deferred();

        this.fileLoader = defer.promise();
        this.fileLoader
            .done(function (file, content) {
                model.set('url', content);
            })
            .fail(function (err) {
                console.log(err);
            });

        var reader = new FileReader();
        reader.onload = (function (file) {
            return function (evt) {

                defer.resolve(file, evt.target.result);
            };
        }(file));

        reader.onerror  = function (event) {
            defer.reject(event);
        };

        reader.readAsDataURL(file);
    },

    updateValueHandler: function(){

        if (!this.wasRendered) {
            return;
        }
        this.applyBlobData();
    },

    applyBlobData: function () {
        if (typeof value === 'undefined' || value === null) {
            //Файл не выбран. Очистить, если он был показан.
            return;
        }

        if(typeof value.Id !== 'undefined' || value.Id !== null){
            //Файл был загружен ранее, для отображения нужно запросить URL у binding
        }else{
            //Файл был загружен, для отображения надо обработать DataUrl

        }
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

    updateReadOnly: function(){
        if(!this.wasRendered) {
            return;
        }

        this.ui.input.toggleClass('hidden', !!this.model.get('readOnly'));
        this.ui.thumbnail.toggleClass('thumbnail', !this.model.get('readOnly'));
    },

    onChangeUrlHandler: function (model, url) {
        this.setPreviewUrl(url);
    },

    setPreviewUrl: function (url) {
        if (!this.wasRendered) {
            return;
        }
        if (typeof url === 'string' && url.length > 0) {
            this.ui.image.attr('src', url);
        } else {
            var file = this.model.get('file');
            if(file && typeof file.name === 'string'){
                this.loadPreview(file);
            }else{
                this.ui.image.attr('src', null);
            }

        }
    }


});
