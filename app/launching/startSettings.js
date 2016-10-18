if(InfinniUI.config.configName != null) {
    document.title = InfinniUI.config.configName;
}

moment.locale(InfinniUI.config.lang && InfinniUI.config.lang.substr(0,2));

InfinniUI.providerRegister.register('ObjectDataSource', InfinniUI.Providers.ObjectDataProvider);

InfinniUI.providerRegister.register('MetadataDataSource', function (metadataValue) {
    InfinniUI.LayoutManager.slidingRecalculation();

    return new InfinniUI.Providers.MetadataProviderREST(new InfinniUI.Providers.QueryConstructorMetadata(InfinniUI.config.serverUrl, metadataValue));
});


InfinniUI.providerRegister.register('DocumentDataSource', InfinniUI.Providers.RestDataProvider);
InfinniUI.providerRegister.register('RestDataSource', InfinniUI.Providers.RestDataProvider);

InfinniUI.providerRegister.register('ServerActionProvider', function () {
    return new InfinniUI.Providers.ServerActionProvider();
});