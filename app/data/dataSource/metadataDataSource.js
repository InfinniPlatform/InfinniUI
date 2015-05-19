function MetadataDataSource(view, metadata) {

    var  provider = window.providerRegister.build('MetadataInfoDataSource', metadata);

    var baseDataSource = new BaseDataSource(view, metadata.IdProperty, provider);

    baseDataSource.getRegisteredConfigList = function (resultCallback) {
        provider.getRegisteredConfigList(resultCallback);
    };

    baseDataSource.getConfigurationMetadata = function (resultCallback) {
        provider.getConfigurationMetadata(resultCallback);
    };

    baseDataSource.getDocumentListMetadata = function (resultCallback) {
        provider.getDocumentListMetadata(resultCallback);
    };

    baseDataSource.getDocumentMetadata = function (resultCallback) {
        provider.getDocumentMetadata(resultCallback);
    };

    baseDataSource.getDocumentElementListMetadata = function (resultCallback) {
        provider.getDocumentElementListMetadata(resultCallback);
    };

    baseDataSource.getMenuListMetadata = function (resultCallback) {
        provider.getMenuListMetadata(resultCallback);
    };

    baseDataSource.getMenuMetadata = function (resultCallback) {
        provider.getMenuMetadata(resultCallback);
    };

    baseDataSource.getValidationWarningMetadata = function (resultCallback) {
        provider.getValidationWarningMetadata(resultCallback);
    };

    baseDataSource.getValidationErrorMetadata = function (resultCallback) {
        provider.getValidationErrorMetadata(resultCallback);
    };



    return baseDataSource;
}
