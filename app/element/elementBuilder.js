var ElementBuilder = function () {
};

//о боги, зачем все это???
_.extend(ElementBuilder.prototype, {

    build: function (builder, parent, metadata, collectionProperty, params) {
        var parentElement = params && params.parentElement;
        var params = {
                builder: builder,
                parent: parent,
                metadata: metadata,
                collectionProperty: collectionProperty,
                params: params
            },
            element = this.createElement(params);

        if (parentElement) {
            parentElement.children.add(element);
        }

        params.element = element;

        this.applyMetadata(params);

        if (parent && parent.registerElement) {
            parent.registerElement(element);
        }

        return element;
    },
    createElement: function () {
        throw ('Не перегружен абстрактный метод ElementBuilder.createElement()');
    },

    applyMetadata: function (params) {
        var metadata = params.metadata,
            element = params.element,
            parent = params.parent,
            collectionProperty = params.collectionProperty;

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
                var message = this.getBaseMessage(params);
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnLoaded.Name, message);
            }.bind(this));
        }

        if (metadata.OnGotFocus){
            params.element.onGotFocus(function() {
                var message = this.getBaseMessage(params);
                new ScriptExecutor(params.parent).executeScript(metadata.OnGotFocus.Name, message);
            }.bind(this));
        }

        if (metadata.OnLostFocus){
            params.element.onLostFocus(function() {
                var message = this.getBaseMessage(params);
                new ScriptExecutor(params.parent).executeScript(metadata.OnLostFocus.Name, message);
            });
        }
    },

    getBaseMessage: function (params) {
        return params.builder.buildType(params.parent, 'BaseMessage', null, null, {
            source: params.element
        });
    },

    getDataSourceMessage: function (params, dataBinding) {
        return params.builder.buildType(params.parent, 'DataSourceMessage', null, null, {
            source: params.element,
            value: params.element.getValue(),
            dataSource: dataBinding.getDataSource && dataBinding.getDataSource(),
            property: dataBinding.getProperty && dataBinding.getProperty()
        });
    },

    initTextBinding: function(params, bindingMetadata){
        var metadata = params.metadata;

        var dataBinding = params.builder.build(params.parent, metadata.Text, params.collectionProperty);

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
            var dataBinding = params.builder.build(params.parent, metadata[propertyName], params.collectionProperty);
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