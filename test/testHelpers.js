function fakeView(view) {
    if (view === undefined) {
        view = {};
    }

    view.getExchange = function () {
        return messageBus.getExchange('test');
    };

    view.getContext = function () {
        return {};
    };

    view.getScript = function (name) {
        return view.scripts[name];
    };

    return view;
}


function checkMethod(element, name) {
    var method = element[name];
    if (name.indexOf('!') === 0) {
        assert.isUndefined(method, name.substring(1));
    } else {
        assert.isFunction(method, name);
    }
}

//Эта хрень по идее из платформы должна приходить, а она в лаунчере
window.providerRegister.register('MetadataDataSource', function (metadataValue) {
    return new MetadataProviderREST(new QueryConstructorMetadata('', metadataValue));
});

window.providerRegister.register('DocumentDataSource', function (metadataValue) {
    return new DataProviderREST(metadataValue, new QueryConstructorStandard('', metadataValue));
});