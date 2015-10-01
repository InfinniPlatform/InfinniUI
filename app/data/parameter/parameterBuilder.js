function ParameterBuilder() {

    this.build = function(builder,parent,metadata, collectionProperty){

        if(metadata.Value !== undefined){
            var parameter = new Parameter();

            parameter.setName(metadata.Name);

            

            //если существует Builder для хранящегося в параметре значения
            //то создаем этим Builder'ом объект (PropertyBinding, ObjectBinding, ParameterBinding)
            //иначе устанвливаем в параметре значение из метаданных
            if($.isPlainObject(metadata.Value)) {
				var dataBinding = builder.build(parent, metadata.Value, collectionProperty);
                // Установка обработчика изменения значения в источнике данных
                dataBinding.onPropertyValueChanged(function(dataSourceName,value){
                    parameter.setValue(dataBinding.getPropertyValue());
                });

                var data = dataBinding.getPropertyValue();
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
        }else{

        }


        return parameter;
    };
}