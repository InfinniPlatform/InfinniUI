function MetadataDataSourceProvider(urlConstructor, successCallback, failCallback) {

    this.getRegisteredConfigList = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback)
            .makeRequest(urlConstructor.constructGetRegisteredConfigListRequest());
    };

    this.getConfigurationMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetConfigurationMetadataRequest());
    };

    this.getDocumentListMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetDocumentListMetadataRequest());
    };

    this.getDocumentMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetDocumentMetadataRequest());
    };

    this.getDocumentElementListMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetDocumentElementListMetadataRequest());
    };

    this.getMenuListMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetMenuListMetadataRequest());
    };

    this.getMenuMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetMenuMetadataRequest());
    };

    this.getValidationWarningMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetValidationWarningMetadataRequest());
    };

    this.getValidationErrorMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructGetValidationErrorMetadataRequest());
    };
}
