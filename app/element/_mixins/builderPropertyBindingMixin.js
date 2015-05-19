var builderPropertyBindingMixin = {

    /**
     * @description Инициализация датабиндинга для заданного свойства
     * @param propertyName Атрибут в метаданных
     * @param params.metadata
     * @param params.parent
     * @param params.collectionProperty
     * @param params.builder
     * @param params.element
     * @param {function} callbackSetValue Функция для установки значения из DataBinding
     * @param {function|undefined} callbackGetValue Функция для установки значения в DataBinding
     * @returns {*}
     */
    initPropertyBinding: function (propertyName, params, callbackSetValue, callbackGetValue) {

        var setValue = function (value) {
            if (callbackSetValue === null || typeof callbackSetValue === 'undefined') {
                return;
            }
            callbackSetValue(value);
        };

        var getValue = function () {
            if (callbackGetValue === null || typeof callbackGetValue === 'undefined') {
                return;
            }
            return callbackGetValue();
        };



        var metadata = params.metadata;

        if (metadata !== undefined && metadata[propertyName]) {
            var dataBinding = params.builder.build(params.parent, metadata[propertyName], params.collectionProperty);


            if (dataBinding != null) {
                dataBinding.onPropertyValueChanged(function (dataSourceName, value) {
                    setValue(dataBinding.getPropertyValue());
                });

                setValue(dataBinding.getPropertyValue());
            }

            return dataBinding;
        }
    }

};