/**
 * @param {string} host
 * @param {Object} params
 * @param {string} params.configId
 * @param {string} params.documentId
 * @constructor
 */
var DocumentUploadQueryConstructor = function (host, params) {
    this.host = host;
    this.configId = params.configId;
    this.documentId = params.documentId;
};

DocumentUploadQueryConstructor.prototype.template = {
    download: _.template('<%= host %>/RestfulApi/UrlEncodedData/configuration/downloadbinarycontent/?Form=<%= form %>'),
    upload: _.template('<%= host %>/RestfulApi/Upload/configuration/uploadbinarycontent/?linkedData=<%= data %>')
};

DocumentUploadQueryConstructor.prototype.normalizeFieldName = function (fieldName) {
    return String(fieldName).replace(/^[\d\$]+\./, '');
};

/**
 * @public
 * @param fieldName
 * @param instanceId
 * @param file
 * @returns {{requestUrl: {String}, args: (FormData|*)}}
 */
DocumentUploadQueryConstructor.prototype.constructUploadFileRequest = function (fieldName, instanceId, file) {
    return {
        requestUrl: this.getUploadUrl(fieldName, instanceId),
        args: this.getUploadParams(file)
    };
};

/**
 * @public
 * @description Возвращает ссылку на загруженный ранее файл
 * @param instanceId
 * @param fieldName
 * @returns {String}
 */
DocumentUploadQueryConstructor.prototype.getFileUrl = function (fieldName, instanceId, contentId) {

    if (typeof instanceId === 'undefined' || instanceId === null) {
        return null;
    }

    var data = {
        Configuration: this.configId,
        Metadata: this.documentId,
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

/**
 * @description Возвращает URL для запроса загрузки файла
 * @protected
 * @param instanceId
 * @param fieldName
 * @returns {String}
 */
DocumentUploadQueryConstructor.prototype.getUploadUrl = function (fieldName, instanceId) {
    var data = {
        "Configuration": this.configId,
        "Metadata": this.documentId,
        "DocumentId": instanceId,
        "FieldName": this.normalizeFieldName(fieldName)
    };

    var template = this.template.upload;

    return template({
        host: this.host,
        data: JSON.stringify(data)
    });
};


/**
 * @protected
 * @param file
 * @returns {FormData}
 */
DocumentUploadQueryConstructor.prototype.getUploadParams = function (file) {
    var data = new FormData();
    data.append('file', file);
    return data;
};

