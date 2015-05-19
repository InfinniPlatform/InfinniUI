function ParameterBuilder() {

    this.build = function(builder,parent,metadata){

        var parameter = new Parameter();

        parameter.setName(metadata.Name);

        var dataBinding = builder.build(parent, metadata.Value);

        //если существует Builder для хранящегося в параметре значения
        //то создаем этим Builder'ом объект (PropertyBinding, ObjectBinding, ParameterBinding)
        //иначе устанвливаем в параметре значение из метаданных
        if(dataBinding != null) {

            // Установка обработчика изменения значения в источнике данных
            dataBinding.onPropertyValueChanged(function(dataSourceName,value){
                parameter.setValue(dataBinding.getPropertyValue());
            });

            var data = dataBinding.getPropertyValue();

            if (!data) {
                var ds = dataBinding.view.getDataSource(dataBinding.dataSource),
                    linkedBindings = ds.getDataBindings();
                if(linkedBindings.length > 0 && linkedBindings[0].getPropertyValue()){
                    data = linkedBindings[0].getPropertyValue();
                }
            }

            if (data) {
                parameter.setValue(data);
            }

            // При изменении значения параметра, уведомление DataSource ч/з DataBinding
            parameter.onValueChanged(function (dataSourceName, value) {
                dataBinding.setPropertyValue(value);
            });
        }
        else {
            parameter.setValue(metadata.Value);
        }

        return parameter;
    };
}