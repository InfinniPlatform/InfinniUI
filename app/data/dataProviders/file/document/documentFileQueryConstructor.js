/**
 * @param {string} host
 * @constructor
 */
var DocumentUploadQueryConstructor = function (host) {
    this.host = host;
};

DocumentUploadQueryConstructor.prototype.template = {
    download: _.template('<%= host %>/RestfulApi/UrlEncodedData/configuration/downloadbinarycontent/?Form=<%= form %>')
};

DocumentUploadQueryConstructor.prototype.normalizeFieldName = function (fieldName) {
    return String(fieldName).replace(/^[\d\$]+\./, '');
};

/**
 * @public
 * @description Возвращает ссылку на загруженный ранее файл
 * @param fieldName
 * @param instanceId
 * @param contentId
 * @returns {String}
 */
DocumentUploadQueryConstructor.prototype.getFileUrl = function (fieldName, instanceId, contentId) {

    var data = {
        DocumentId: instanceId,
        ContentId: contentId,
        FieldName: this.normalizeFieldName(fieldName)
    };
    var template = this.template.download;

    return template({
        host: this.host,
        form: JSON.stringify((data))
    });
};

