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
        //Отмечаем элемент данных как измененный при установке файла на загрузку
        this._includeItemToModifiedSet(this.getSelectedItem());

        var items = queue.filter(function (item) {
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
        this.setProperty(propertyName, file);
    },

    extractFiles: function (item, callback) {

        var files = Object.create(null);
        var itemWithoutFiles = extractFile(item, []);


        if (typeof callback === 'function') {
            callback.call(null, files, itemWithoutFiles);
        }

        function extractFile (item, path) {
            var value, result = Array.isArray(item) ? [] : {}, currentPath;
            for (var i in item) {
                if (!item.hasOwnProperty(i)) {
                    continue;
                }

                currentPath = path.slice();
                currentPath.push(i);
                value = item[i];
                if (value !== null && typeof (value) === 'object') {
                    if (value.constructor === Date) {
                        result[i] = value
                    } else if (value.constructor === Object || value.constructor === Array)  {
                        //Plain object
                        result[i] = extractFile(value, currentPath);
                    } else {
                        //Object instance
                        files[currentPath.join('.')] = value;
                        continue;
                    }
                } else {
                    result[i] = value;
                }

            }

            return result;
        }
    },

    uploadFiles: function (instanceId, files) {
        var promises = [];
        var promise;
        var fileProvider = this.getFileProvider();
        var ds = this;

        for (var path in files) {
            promise = fileProvider.uploadFile(path, instanceId, files[path])
                .then(function () {
                    //@TODO Как обрабатывать ошибки загрузки файлов?
                    ds.trigger('onFileUploaded', ds.getContext(), {value: files[path]});
                    return true;
                });

            promises.push(promise);
        }

        return $.when.apply($, promises);
    }
};