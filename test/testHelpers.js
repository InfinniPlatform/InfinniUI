function fakeView(view) {
    if (view === undefined) {
        view = {};
    }

    view.getContext = function () {
        return {};
    };

    view.getScript = function (name) {
        return view.scripts[name];
    };

    return view;
}

//Эта хрень по идее из платформы должна приходить, а она в лаунчере
window.providerRegister.register('MetadataDataSource', function (metadataValue) {
    return new MetadataProviderREST(new QueryConstructorMetadata('', metadataValue));
});

window.providerRegister.register('DocumentDataSource', function (metadataValue) {
    return new DataProviderREST(metadataValue, new QueryConstructorStandard('', metadataValue));
});