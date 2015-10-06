/**
 *
 * @mixin dataSourceFileProviderMixin
 */
var dataSourceFileProviderMixin = {

    setFileProvider: function (fileProvider) {
        this.set('fileProvider', fileProvider);
    },

    getFileProvider: function () {
        return this.get('fileProvider');
    },

    setFile: function (file, propertyName) {
        var queue = this.get('queueFiles');
        var item;
        if (!queue) {
            queue = [];
            this.set('queueFiles', queue);
        }

        var items = queue.filter(function(item) {
            return item.name === propertyName;
        });

        if (items.length) {
            var item = items[0];
            item.file = file;
        } else {
            queue.push({
                name: propertyName,
                file: file
            });
        }
    },

    uploadFiles: function (instanceId) {
        var promises = [];
        var fileProvider = this.getFileProvider();
        var ds = this;
        var queue = this.get('queueFiles');
        if (fileProvider  && queue && queue.length) {
            promises = queue.map(function (item, index) {
                return fileProvider.uploadFile(item.name, instanceId, item.file)
                    .then(function () {
                        //@TODO Как обрабатывать ошибки загрузки файлов?
                        var i = queue.indexOf(item);
                        queue.splice(i, 1);
                        ds.trigger('onFileUploaded', ds.getContext, {value: item.file});
                        return true;
                    });
            }, this);
        }

        return $.when.apply($, promises);
    }
};