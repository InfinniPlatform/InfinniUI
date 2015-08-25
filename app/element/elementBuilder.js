var ElementBuilder = function () {
};

//о боги, зачем все это???
_.extend(ElementBuilder.prototype, {

    build: function (context, args){
        var element = this.createElement(args);
        var params = _.extend(args, {element: element});

        this.applyMetadata(params);

        if (args.view && args.view.registerElement) {
            args.view.registerElement(element);
        }

        return element;
    },
    createElement: function () {
        throw ('Не перегружен абстрактный метод ElementBuilder.createElement()');
    },

    applyMetadata: function (params) {
        var metadata = params.metadata,
            element = params.element;

        if(metadata.Text && typeof metadata.Text == 'object'){
            this.initTextBinding(params, metadata.Text);
        }else{
            element.setText(metadata.Text);
        }

        //element.setVisible(metadata.Visible);
        this.initBindingToProperty(params, metadata.Visible, 'Visible', true);

        element.setHorizontalAlignment(metadata.HorizontalAlignment);
        element.setVerticalAlignment(metadata.VerticalAlignment);
        element.setName(metadata.Name);
        element.setEnabled(metadata.Enabled);

        element.setStyle(metadata.Style);

        if (metadata.OnLoaded) {
            element.onLoaded(function () {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (metadata.OnGotFocus){
            params.element.onGotFocus(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnGotFocus.Name);
            });
        }

        if (metadata.OnLostFocus){
            params.element.onLostFocus(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnLostFocus.Name);
            });
        }
    },

    initTextBinding: function(params, bindingMetadata){
        var metadata = params.metadata;

        var dataBinding = params.builder.build(params.view, metadata.Text, params.collectionProperty);

        dataBinding.setElement(params.element);

        if (dataBinding != null) {
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                params.element.setText(dataBinding.getPropertyValue());
            });

            var data = dataBinding.getPropertyValue();
            if (data) {
                params.element.setText(data);
            }
        }

        //dataBinding.refresh();
        return dataBinding;
    },

    initBindingToProperty: function(params, bindingMetadata, propertyName, isBooleanBinding){
        var metadata = params.metadata;

        if(!metadata[propertyName] || typeof metadata[propertyName] != 'object'){
            params.element['set' + propertyName](metadata[propertyName]);
            return null;
        }else{
            var dataBinding = params.builder.build(params.view, metadata[propertyName], params.collectionProperty);
            dataBinding.setSetterName('set' + propertyName);
            dataBinding.setElement(params.element);

            if (dataBinding != null) {
                dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                    if(isBooleanBinding){
                        params.element['set' + propertyName](!!dataBinding.getPropertyValue());
                    }else{
                        params.element['set' + propertyName](dataBinding.getPropertyValue());
                    }
                });

                var data = dataBinding.getPropertyValue();
                if(isBooleanBinding){
                    params.element['set' + propertyName](!!data);
                }else{
                    if (data) {
                        params.element['set' + propertyName](data);
                    }
                }

            }

            return dataBinding;
        }
    }

});