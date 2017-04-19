if(InfinniUI.config.configName != null) {
    document.title = InfinniUI.config.configName;
}

if( InfinniUI.config.cacheMetadata === false ) {
    $.ajaxSetup( { cache: false } );
}

moment.locale(InfinniUI.config.lang && InfinniUI.config.lang.substr(0,2));

InfinniUI.providerRegister.register('ObjectDataSource', InfinniUI.Providers.ObjectDataProvider);
InfinniUI.providerRegister.register('LocalStorageDataSource', InfinniUI.Providers.LocalStorageDataProvider);

InfinniUI.providerRegister.register('MetadataDataSource', function (args) {
    var applicationContainer = args.applicationView && args.applicationView.getContainer();
    InfinniUI.AutoHeightService.slidingRecalculation(applicationContainer);

    return new InfinniUI.Providers.MetadataProviderREST(new InfinniUI.Providers.QueryConstructorMetadata(InfinniUI.config.serverUrl, args.metadata));
});


InfinniUI.providerRegister.register('DocumentDataSource', InfinniUI.Providers.RestDataProvider);
InfinniUI.providerRegister.register('RestDataSource', InfinniUI.Providers.RestDataProvider);

InfinniUI.providerRegister.register('ServerActionProvider', function () {
    return new InfinniUI.Providers.ServerActionProvider();
});