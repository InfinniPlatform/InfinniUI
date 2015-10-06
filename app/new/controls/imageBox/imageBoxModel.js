/**
 * @constructor
 * @augments ControlModel
 * @mixes editorBaseModelMixin
 */
var ImageBoxModel = ControlModel.extend( _.extend({

    initialize: function () {
        ControlModel.prototype.initialize.apply(this, arguments);
        this.initialize_editorBaseModel();
        this.on('change:file', this.onChangeFileHandler)
    },

    setFile: function (file) {
        if (file) {
            this.set('file', null, {silent: true}); //hello _.isEqual!
        }
        this.set('file', file);
    },

    removeFile: function () {
        this.setFile(null);
    },

    onChangeFileHandler: function (model, file) {
        this.stopLoadingFile();
        if (file) {
            var fileLoader = this.loadPreview(file);

            this.fileLoader = fileLoader;

            fileLoader.then(function (file, content) {
                model.set('url', content);
            }, function (err) {
                console.log(err);
            });
        } else {
            model.set('url', null);
        }
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
    }

}, editorBaseModelMixin));