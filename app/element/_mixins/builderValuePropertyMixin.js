var builderValuePropertyMixin = {

    initValueProperty: function (params) {
        var metadata = params.metadata;

        if (metadata.Value !== undefined) {
            var dataBinding = params.builder.build(params.parent, metadata.Value, params.collectionProperty);

            dataBinding.setElement(params.element);

            if (dataBinding != null) {
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
            }

            //dataBinding.refresh();
            return dataBinding;
        }
    }

};