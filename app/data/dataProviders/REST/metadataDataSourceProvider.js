function MetadataDataSourceProvider(urlConstructor, successCallback, failCallback) {

    this.getRegisteredConfigList = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback)
            .makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getConfigurationMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getDocumentListMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getDocumentMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getDocumentElementListMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getMenuListMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getMenuMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getValidationWarningMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };

    this.getValidationErrorMetadata = function (resultCallback) {
        new RequestExecutor(resultCallback, successCallback, failCallback).makeRequest(urlConstructor.constructMetadataRequest());
    };
}

window.InfinniUI.Providers.MetadataDataSourceProvider = MetadataDataSourceProvider;
