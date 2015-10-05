/**
 *
 * @param {DocumentUploadQueryConstructor} urlConstructor
 * @param {Function} [successCallback]
 * @param {Function} [failCallback]
 * @constructor
 */
var DocumentUploadProvider = function (urlConstructor, successCallback, failCallback) {
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
DocumentUploadProvider.prototype.uploadFile = function (fieldName, instanceId, file, resultCallback) {
    var requestData = this.urlConstructor.constructUploadFileRequest(fieldName, instanceId, file);
    new RequestExecutor(resultCallback, this.successCallback, this.failCallback)
        .makeRequestRaw(requestData);
};

/**
 * Возвращает URL ранее загруженного файла
 * @param {string} fieldName
 * @param {string} instanceId
 * @returns {String}
 */
DocumentUploadProvider.prototype.getFileUrl = function (fieldName, instanceId) {
    return this.urlConstructor.getFileUrl(fieldName, instanceId);
};