/**
 *
 * @param {DocumentUploadQueryConstructor} urlConstructor
 * @param {Function} [successCallback]
 * @param {Function} [failCallback]
 * @constructor
 */
var DocumentFileProvider = function (urlConstructor, successCallback, failCallback) {
    this.urlConstructor = urlConstructor;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
};

/**
 * @description Загружает файл для указанного поля документа
 * @param {string} fieldName
 * @param {string} instanceId
 * @param {*} file
 * @param {Function} resultCallback
 */
DocumentFileProvider.prototype.uploadFile = function (fieldName, instanceId, file, resultCallback) {
    var deferred = $.Deferred();
    var requestData = this.urlConstructor.constructUploadFileRequest(fieldName, instanceId, file);
    new RequestExecutor(resultCallback, function () {
        deferred.resolve();
        if (this.successCallback) {
            this.successCallback();
        }
    }, function (err) {
        deferred.reject(err);
        if (this.failCallback) {
            this.failCallback();
        }
    }).makeRequestRaw(requestData);

    return deferred.promise();
};

/**
 * Возвращает URL ранее загруженного файла
 * @param {string} fieldName
 * @param {string} instanceId
 * @returns {String}
 */
DocumentFileProvider.prototype.getFileUrl = function (fieldName, instanceId) {
    return this.urlConstructor.getFileUrl(fieldName, instanceId);
};
