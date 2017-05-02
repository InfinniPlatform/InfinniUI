/**
 *
 * @param {DocumentUploadQueryConstructor} urlConstructor
 * @param {Function} [successCallback]
 * @param {Function} [failCallback]
 * @constructor
 */
var DocumentFileProvider = function( urlConstructor, successCallback, failCallback ) {
    this.urlConstructor = urlConstructor;
    this.successCallback = successCallback;
    this.failCallback = failCallback;
};

InfinniUI.Providers.DocumentFileProvider = DocumentFileProvider;

/**
 * Возвращает URL ранее загруженного файла
 * @param {string} fieldName
 * @param {string} instanceId
 * @param {string} contentId
 * @returns {String}
 */
DocumentFileProvider.prototype.getFileUrl = function( fieldName, instanceId, contentId ) {
    return this.urlConstructor.getFileUrl( fieldName, instanceId, contentId );
};
