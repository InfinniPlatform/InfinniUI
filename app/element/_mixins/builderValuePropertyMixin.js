var builderValuePropertyMixin = {

    /**
     * @param {Object} params
     * @param {Boolean|false} useValidation Использовать валидацию
     * @returns {*}
     */
    initValueProperty: function (params, useValidation) {
        var metadata = params.metadata;
        var dataBinding;

        if (metadata.Value !== undefined) {
            dataBinding = params.builder.build(params.parent, metadata.Value, params.collectionProperty);
        }


        if (dataBinding) {
            dataBinding.setElement(params.element);
            dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                params.element.setValue(dataBinding.getPropertyValue());
            });

            var data = dataBinding.getPropertyValue();
            if (data !== null && typeof data !== 'undefined') {
                params.element.setValue(data);
            }

            params.element.onValueChanged(function (dataSourceName, value) {
                dataBinding.setPropertyValue(value);
            });

            if (useValidation) {
                params.element.onLostFocus(function () {
                    dataBinding.validate();
                });
            }
        }


        this.assignValueHandlers(dataBinding, params);
        return dataBinding;
    },

    assignValueHandlers: function (dataBinding, params) {
        var
            element = params.element,
            metadata = params.metadata;

        if (params.parent && metadata.OnValueChanged) {
            params.element.onValueChanged(function () {
                var message = this.getDataSourceMessage(params, dataBinding);
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name, message);
            }.bind(this));
        }

    }
};

