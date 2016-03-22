/**
 *
 * @param {string} host
 * @param {Object} metadata
 * @param {string} metadata.ConfigId
 * @param {string} metadata.DocumentId
 * @param {string} [metadata.CreateAction = 'CreateDocument']
 * @param {string} [metadata.ReadAction = 'GetDocument']
 * @param {string} [metadata.UpdateAction = 'SetDocument']
 * @param {string} [metadata.DeleteAction = 'DeleteDocument']
 * @constructor
 */
function QueryConstructorStandard(host) {

    this._host = host;

    //this._configId = metadata.ConfigId;
    //this._documentId = metadata.DocumentId;

    this._actions = {
        CreateAction: 'CreateDocument',
        ReadAction: 'GetDocument',
        UpdateAction: 'SetDocument',
        DeleteAction: 'DeleteDocument'
    };

    this.isCustom = false;
    //this.setCreateAction(metadata.CreateAction);
    //this.setReadAction(metadata.ReadAction);
    //this.setUpdateAction(metadata.UpdateAction);
    //this.setDeleteAction(metadata.DeleteAction);
}

_.extend(QueryConstructorStandard.prototype, /** @lends QueryConstructorStandard.prototype */{

    urlTemplate: _.template('<%=host%>/<%=api%>/StandardApi/<%=document%>/<%=action%>'),

    setCreateAction: function (value) {
        if (value && this._actions.CreateAction != value) {
            this._actions.CreateAction = value;
            this.isCustom = true;
        }
    },

    getCreateAction: function () {
        return this._actions.CreateAction;
    },

    setReadAction: function (value) {
        if (value && this._actions.ReadAction != value) {
            this._actions.ReadAction = value;
            this.isCustom = true;
        }
    },

    getReadAction: function () {
        return this._actions.ReadAction;
    },

    setUpdateAction: function (value) {
        if (value && this._actions.UpdateAction != value) {
            this._actions.UpdateAction = value;
            this.isCustom = true;
        }
    },

    getUpdateAction: function () {
        return this._actions.UpdateAction;
    },

    setDeleteAction: function (value) {
        if (value && this._actions.DeleteAction != value) {
            this._actions.DeleteAction = value;
            this.isCustom = true;
        }
    },

    getDeleteAction: function () {
        return this._actions.DeleteAction;
    },

    setConfigId: function(configId){
        this._configId = configId;
    },

    setDocumentId: function(documentId){
        this._documentId = documentId;
    },

    constructCreateDocumentRequest: function () {
        return {
            requestUrl: this._constructUrl('CreateAction'),
            args: this._makeCreateDocumentRequestParams()
        };
    },

    constructReadDocumentRequest: function (filter, pageNumber, pageSize, sorting) {
        return {
            requestUrl: this._constructUrl('ReadAction'),
            args: this._makeReadDocumentRequestParams(filter, pageNumber, pageSize, sorting)
        };
    },

    constructUpdateDocumentRequest: function (document, warnings) {
        return {
            requestUrl: this._constructUrl('UpdateAction'),
            args: this._makeUpdateDocumentRequestParams(document, warnings)
        };
    },

    constructDeleteDocumentRequest: function (instanceId) {
        return {
            requestUrl: this._constructUrl('DeleteAction'),
            args: this._makeDeleteDocumentRequestParams(instanceId)
        };
    },

    _constructUrl: function (action) {
        return this.urlTemplate({
            host: this._host,
            api: this.isCustom ? this._configId : 'RestfulApi', //this._configId,
            document: this.isCustom ? this._documentId : 'configuration', //this._documentId,
            action: this._actions[action]
        });
        //var urlTemplate = '{0}/{1}/StandardApi/{2}/{3}',
        //    document = 'configuration',
        //    api = 'RestfulApi';
        //
        //if (_.contains(['CreateDocument', 'GetDocument', 'SetDocument', 'DeleteDocument', 'GetDocumentCrossConfig'], action) == false) {
        //    document = documentId;
        //    api = configId;
        //}

        //return stringUtils.format(urlTemplate, [host, api, document, action]);
    },

    _makeCreateDocumentRequestParams: function () {
        return {
            id: null,
            changesObject: {
                Configuration: this._configId,
                Metadata: this._documentId
            },
            replace: false
        };
    },

    _makeReadDocumentRequestParams: function (filter, pageNumber, pageSize, sorting) {
        var params;

        params = {
            id: null,
            changesObject: {
                Configuration: this._configId,
                Metadata: this._documentId,
                Filter: filter,
                PageNumber: pageNumber,
                PageSize: pageSize
            },
            replace: false
        };

        if (typeof sorting !== 'undefined' && sorting !== null && sorting.length > 0) {
            params.changesObject.Sorting = sorting;
        }

        return params;
    },

    _makeUpdateDocumentRequestParams: function (document, warnings) {
        var ignoreWarnings = warnings ? warnings : false;
        return {
            id: null,
            changesObject: {
                Configuration: this._configId,
                Metadata: this._documentId,
                Document: document,
                IgnoreWarnings: ignoreWarnings
            },
            replace: false
        };
    },

    _makeDeleteDocumentRequestParams: function (instanceId) {
        return {
            id: null,
            changesObject: {
                Configuration: this._configId,
                Metadata: this._documentId,
                Id: instanceId
            },
            replace: false
        };
    }

});
