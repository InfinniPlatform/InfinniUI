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
 * Возвращает URL ранее загруженного файла
 * @param {string} fieldName
 * @param {string} instanceId
 * @returns {String}
 */
DocumentFileProvider.prototype.getFileUrl = function (fieldName, instanceId, contentId) {
    return this.urlConstructor.getFileUrl(fieldName, instanceId, contentId);
};
