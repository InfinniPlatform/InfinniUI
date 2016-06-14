function fakeView(view) {
    if (view === undefined) {
        view = {};
    }

    view.isView = true;

    view.getContext = function () {
        return {};
    };

    view.getScript = function (name) {
        return view.scripts[name];
    };

    return view;
}

function fakeApplicationView(){
    var view = fakeView();
    var $container = InfinniUI.config.$rootContainer || $('body');
    $container.data('view', null);

    view.getApplicationView = function () {
        return this;
    };

    return view;
}

//Эта хрень по идее из платформы должна приходить, а она в лаунчере
window.InfinniUI.providerRegister.register('MetadataDataSource', function (metadataValue) {
    return new MetadataProviderREST(new QueryConstructorMetadata('', metadataValue));
});

window.InfinniUI.providerRegister.register('DocumentDataSource', function (metadataValue) {
    return new DataProviderREST(metadataValue, new QueryConstructorStandard('', metadataValue));
});
