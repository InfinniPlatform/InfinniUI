/**
 * @constructor
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var ImageBoxModel = ControlModel.extend( _.extend({

    defaults: _.defaults({
            text: localized.strings.ImageBox.chooseImage
        },
        editorBaseModelMixin.defaults_editorBaseModel,
        ControlModel.prototype.defaults
    ),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();

        this.set('acceptTypes', new Collection());
        this.on('change:file', this.onChangeFileHandler);

        this.on("invalid", function(model, error) {
            this.set('errorText', error);
        });
    },

    validate: function (attrs, options) {
        var file = attrs.file;
        var maxSize = this.get('maxSize');
        var acceptTypes = this.get('acceptTypes');
        if (file) {
            if (maxSize) {
                if (file.size > maxSize) {
                    return localized.strings.ImageBox.imageSizeTooBig
                        .replace(/\{chosen-size\}/g, (file.size/(1024*1024)).toFixed(1))
                        .replace(/\{permitted-size\}/g, (maxSize/(1024*1024)).toFixed(1));
                }
            }

            if (acceptTypes.length && !acceptTypes.contains(file.type)) {
                return localized.strings.ImageBox.incorrectFormat;
            }
        }
    },

    setFile: function (file) {
        if (this.set('file', file, {validate: true})) {
            this.set('errorText', '');
        }
    },

    removeFile: function () {
        this.setFile(null);
    },

    onChangeFileHandler: function (model, file) {
        //this.stopLoadingFile();
        //if (file) {
        //    var fileLoader = this.loadPreview(file);
        //
        //    this.fileLoader = fileLoader;
        //
        //    fileLoader.then(function (file, content) {
        //        model.set('value', content);
        //    }, function (err) {
        //        console.log(err);
        //    });
        //} else {
        //    model.set('value', null);
        //}
    },

    //stopLoadingFile: function () {
    //    var fileLoader = this.fileLoader;
    //    if (fileLoader && fileLoader.state() === 'pending') {
    //        fileLoader.reject();
    //    }
    //},
    //
    //loadPreview: function (file) {
    //    var defer = $.Deferred();
    //    var reader = new FileReader();
    //    reader.onload = (function (file) {
    //        return function (event) {
    //            defer.resolve(file, event.target.result);
    //        };
    //    }(file));
    //    reader.onerror  = function (event) {
    //        defer.reject(event);
    //    };
    //    reader.readAsDataURL(file);
    //    return defer.promise();
    //}

}, editorBaseModelMixin));