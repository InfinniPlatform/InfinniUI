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

function checkTextEditorBaseMethods(element) {
    ['getLabelText', 'setLabelText', 'getLabelFloating', 'setLabelFloating', 'getDisplayFormat',
        'setDisplayFormat', 'getEditMask', 'setEditMask']
        .forEach(function (methodName) {
            it(methodName, function () {
                checkMethod(element, methodName);
            });
        });
}

function checkEditorBaseMethods(element) {
    ['getValue', 'setValue', 'getHintText', 'setHintText', 'getErrorText', 'setErrorText', 'getWarningText',
        'setWarningText']
        .forEach(function (methodName) {
            it(methodName, function () {
                checkMethod(element, methodName);
            });
        });
}

function checkElementMethods(element) {
    ['getView', '!getParent', '!setParent', 'getName', 'setName', 'getText', 'setText',
        '!getFocusable', '!setFocusable', '!getFocused', '!setFocused', 'getEnabled', 'setEnabled', 'getVisible',
        'setVisible', 'getHorizontalAlignment', 'setHorizontalAlignment', 'getVerticalAlignment',
        'setVerticalAlignment', '!getTextHorizontalAlignment', '!setTextHorizontalAlignment',
        '!getTextVerticalAlignment', '!setTextVerticalAlignment', '!getTextStyle', '!setTextStyle', '!getForeground',
        '!setForeground', '!getBackground', '!setBackground', '!getTexture', '!setTexture', 'getChildElements',
        'getProperty', 'setProperty']
        .forEach(function (methodName) {
            it(methodName, function () {
                checkMethod(element, methodName);
            });

        });
}

//Эта хрень по идее из платформы должна приходить, а она в лаунчере
window.providerRegister.register('MetadataDataSource', function (metadataValue) {
    return new MetadataProviderREST(new QueryConstructorMetadata('', metadataValue));
});

window.providerRegister.register('DocumentDataSource', function (metadataValue) {
    return new DataProviderREST(metadataValue, new QueryConstructorStandard('', metadataValue));
});