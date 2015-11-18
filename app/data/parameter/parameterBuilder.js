function ParameterBuilder() {

    this.build = function (context, args) {
        var metadata = args.metadata;
        var builder = args.builder;
        var parentView = args.parentView;



        if('Value' in metadata){
            var parameter = new Parameter({view: parentView});
            parameter.setName(metadata['Name']);

            var dataBinding = builder.buildBinding(metadata['Value'], {parentView: parentView});

            //если существует Builder для хранящегося в параметре значения
            //то создаем этим Builder'ом объект (PropertyBinding, ObjectBinding, ParameterBinding)
            //иначе устанвливаем в параметре значение из метаданных
            if(dataBinding != null) {
                dataBinding.bindElement(parameter, '');

            }
            else {
                parameter.setValue(metadata['Value']);
            }
        }

        return parameter;
    };
}