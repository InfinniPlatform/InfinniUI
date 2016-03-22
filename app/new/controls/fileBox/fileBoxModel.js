/**
 * @constructor
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var FileBoxModel = ControlModel.extend( _.extend({

    defaults: _.defaults({

        },
        editorBaseModelMixin.defaults_editorBaseModel,
        ControlModel.prototype.defaults
    ),
    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();

        this.set('acceptTypes', new Collection());
        this.on('change:file', this.onChangeFileHandler);
        this.on('change:value', function (model, value) {
            if (value instanceof File) {
                model.set('fileName', value.name);
            }
        });

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
                    return 'Размер выбранного файла ' + (file.size/(1024*1024)).toFixed(1) + 'Мб больше допустимого размера ' + (maxSize/(1024*1024)).toFixed(1) + 'Мб';
                }
            }

            if (acceptTypes.length && !acceptTypes.contains(file.type)) {
                return 'Загрузка данного типа файла не разрешена';
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
        if (file) {
            model.set('fileName', file.name);
            model.set('fileSize', file.size);
        } else {
            model.set('fileName', null);
            model.set('fileSize', null);
        }
        model.set('value', file);
        //model.set('value', null);
    }

    //stopLoadingFile: function () {
    //    var fileLoader = this.fileLoader;
    //    if (fileLoader && fileLoader.state() === 'pending') {
    //        fileLoader.reject();
    //    }
    //},

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