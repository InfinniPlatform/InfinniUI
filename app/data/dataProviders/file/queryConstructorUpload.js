/**
 * @class QueryConstructorUpload
 * @param host
 * @param metadata
 * @constructor
 */
var QueryConstructorUpload = function (host, metadata) {
    this.host = host;
    this.metadata = metadata;
};

/**
 * @public
 * @memberOf QueryConstructorUpload.prototype
 * @param fieldName
 * @param instanceId
 * @param file
 * @returns {{requestUrl: {String}, args: (FormData|*)}}
 */
QueryConstructorUpload.prototype.constructUploadFileRequest = function (fieldName, instanceId, file) {
    return {
        requestUrl: this.getUploadUrl(instanceId, fieldName),
        args: this.getUploadParams(file)
    };
};

/**
 * @public
 * @description Возвращает ссылкц на загруженный ранее файл
 * @memberOf QueryConstructorUpload.prototype
 * @param instanceId
 * @param fieldName
 * @returns {String}
 */
QueryConstructorUpload.prototype.getFileUrl = function (fieldName, instanceId) {

    if (typeof instanceId === 'undefined' || instanceId === null) {
        return null;
    }

    var data = {
        "Configuration": this.metadata.ConfigId,
        "Metadata": this.metadata.DocumentId,
        "DocumentId": instanceId,
        "FieldName": fieldName
    };
    var urlTemplate = '{0}/RestfulApi/UrlEncodedData/configuration/downloadbinarycontent/?Form={1}';

    return stringUtils.format(urlTemplate, [this.host, JSON.stringify(data)]);
};

/**
 * @protected
 * @memberOf QueryConstructorUpload.prototype
 * @param instanceId
 * @param fieldName
 * @returns {String}
 */
QueryConstructorUpload.prototype.getUploadUrl = function (instanceId, fieldName) {
    var data = {
        "Configuration": this.metadata.ConfigId,
        "Metadata": this.metadata.DocumentId,
        "DocumentId": instanceId,
        "FieldName": fieldName
    };
    var urlTemplate = '{0}/RestfulApi/Upload/configuration/uploadbinarycontent/?linkedData={1}';

    return stringUtils.format(urlTemplate, [this.host, JSON.stringify(data)]);
};


/**
 * @protected
 * @memberOf QueryConstructorUpload.prototype
 * @param file
 * @returns {FormData}
 */
QueryConstructorUpload.prototype.getUploadParams = function (file) {
    var data = new FormData();
    data.append('file', file);
    return data;
};

