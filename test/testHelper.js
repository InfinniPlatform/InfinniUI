var testHelper = {
    applyViewMetadata: function(metadata, onViewReady){
        metadata = {
            View: metadata
        };

        var appBuilder = new ApplicationBuilder();
        var linkView = (new InlineViewBuilder()).build(null, {builder: appBuilder, metadata: metadata});

        var view = linkView.createView(function (view) {
            view.open();
            onViewReady(view, $('#sandbox').children());
        });
    },

    checkMethod: function(element, name) {
        if (name.indexOf('!') === 0) {
            var methodName = name.substring(1);
            assert.isUndefined(element[methodName], methodName);
        } else {
            assert.isFunction(element[name], name);
        }
    },

    checkTextEditorBaseMethods: function(element) {
        ['getLabelText', 'setLabelText', 'getLabelFloating', 'setLabelFloating', 'getDisplayFormat',
            'setDisplayFormat', 'getEditMask', 'setEditMask']
            .forEach(function (methodName) {
                it(methodName, function () {
                    testHelper.checkMethod(element, methodName);
                });
            });
    },

    checkEditorBaseMethods: function(element) {
        ['getValue', 'setValue', 'getHintText', 'setHintText', 'getErrorText', 'setErrorText', 'getWarningText',
            'setWarningText']
            .forEach(function (methodName) {
                it(methodName, function () {
                    testHelper.checkMethod(element, methodName);
                });
            });
    },

    checkElementMethods: function(element) {
        ['getView', 'getParent', 'setParent', 'getName', 'setName', 'getText', 'setText',
            'getFocusable', 'setFocusable', 'getFocused', 'setFocused', 'getEnabled', 'setEnabled', 'getVisible',
            'setVisible', 'getHorizontalAlignment', 'setHorizontalAlignment', 'getVerticalAlignment',
            'setVerticalAlignment', 'getTextHorizontalAlignment', 'setTextHorizontalAlignment',
            '!getTextVerticalAlignment', '!setTextVerticalAlignment', 'getTextStyle', 'setTextStyle', 'getForeground',
            'setForeground', 'getBackground', 'setBackground', 'getTexture', 'setTexture', 'getChildElements',
            'getProperty', 'setProperty']
            .forEach(function (methodName) {
                it(methodName, function () {
                    testHelper.checkMethod(element, methodName);
                });

            });
    },

    checkContainerMethods: function(element) {
        ['getItemTemplate', 'setItemTemplate', 'getItems']
            .forEach(function (methodName) {
                it(methodName, function () {
                    testHelper.checkMethod(element, methodName);
                });

            });
    }
};