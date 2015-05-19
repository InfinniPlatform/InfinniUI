function QueryConstructorStandard(host, metadata) {

    var configId = metadata.ConfigId;
    var documentId = metadata.DocumentId;
    var createAction = metadata.CreateAction || 'CreateDocument';
    var getAction = metadata.GetAction || 'GetDocument';
    var updateAction = metadata.UpdateAction || 'SetDocument';
    var deleteAction = metadata.DeleteAction || 'DeleteDocument';

    if (documentId.indexOf(',') != -1) {
        getAction = 'GetDocumentCrossConfig';
    }

    var makeCreateDocumentRequestParams = function () {
        return {
            "id": null,
            "changesObject": {
                "Configuration": configId,
                "Metadata": documentId
            },
            "replace": false
        };
    };

    var makeGetDocumentRequestParams = function (filter, pageNumber, pageSize, sorting) {
        var params;

        if (getAction == 'GetDocumentCrossConfig') {
            params = {
                "id": null,
                "changesObject": {
                    "Configurations": configId.split(','),
                    "Documents": documentId.split(','),
                    "Filter": filter,
                    "PageNumber": pageNumber,
                    "PageSize": pageSize
                },
                "replace": false
            };
        } else {
            params = {
                "id": null,
                "changesObject": {
                    "Configuration": configId,
                    "Metadata": documentId,
                    "Filter": filter,
                    "PageNumber": pageNumber,
                    "PageSize": pageSize
                },
                "replace": false
            };
        }

        if (typeof sorting !== 'undefined' && sorting !== null && sorting.length > 0) {
            params.changesObject.Sorting = sorting;
        }

        return params;
    };

    var makeSetDocumentRequestParams = function (document, warnings) {
        var ignoreWarnings = warnings ? warnings : false;
        return {
            "id": null,
            "changesObject": {
                "Configuration": configId,
                "Metadata": documentId,
                "Document": document,
                "IgnoreWarnings": ignoreWarnings
            },
            "replace": false
        };
    };

    var makeDeleteDocumentRequestParams = function (instanceId) {
        return {
            "id": null,
            "changesObject": {
                "Configuration": configId,
                "Metadata": documentId,
                "Id": instanceId
            },
            "replace": false
        };
    };

    var constructUrl = function (host, action) {
        var urlTemplate = '{0}/{1}/StandardApi/{2}/{3}',
            document = 'configuration',
            api = 'RestfulApi';

        if (_.contains(['CreateDocument', 'GetDocument', 'SetDocument', 'DeleteDocument', 'GetDocumentCrossConfig'], action) == false) {
            document = documentId;
            api = configId;
        }

        return stringUtils.format(urlTemplate, [host, api, document, action]);
    };

    this.constructCreateDocumentRequest = function () {
        return {
            requestUrl: constructUrl(host, createAction),
            args: makeCreateDocumentRequestParams()
        };
    };

    this.constructGetDocumentRequest = function (filter, pageNumber, pageSize, sorting) {
        return {
            requestUrl: constructUrl(host, getAction),
            args: makeGetDocumentRequestParams(filter, pageNumber, pageSize, sorting)
        };
    };

    this.constructSetDocumentRequest = function (document, warnings) {
        return {
            requestUrl: constructUrl(host, updateAction),
            args: makeSetDocumentRequestParams(document, warnings)
        };
    };

    this.constructDeleteDocumentRequest = function (instanceId) {
        return {
            requestUrl: constructUrl(host, deleteAction),
            args: makeDeleteDocumentRequestParams(instanceId)
        };
    };
}