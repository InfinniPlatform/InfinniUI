/**
 * @param {string} host
 * @constructor
 */
var DocumentUploadQueryConstructor = function (host) {
    this.host = host;
};

window.InfinniUI.DocumentUploadQueryConstructor = DocumentUploadQueryConstructor;

/**
 * @public
 * @description Возвращает ссылку на загруженный ранее файл
 * @param fieldName
 * @param instanceId
 * @param contentId
 * @returns {String}
 */
DocumentUploadQueryConstructor.prototype.getFileUrl = function (fieldName, instanceId, contentId) {
    return stringUtils.format('{0}/blob/{1}', [this.host, contentId]);
};

