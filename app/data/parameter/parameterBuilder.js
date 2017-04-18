function ParameterBuilder() {

    this.build = function (context, args) {
        var metadata = args.metadata;
        var builder = args.builder;
        var parentView = args.parentView;
        var basePathOfProperty = args.basePathOfProperty;



        if('Value' in metadata){
            var parameter = new Parameter({view: parentView});
            parameter.setName(metadata['Name']);

            if(InfinniUI.Metadata.isBindingMetadata(metadata['Value'])){
                var dataBinding = builder.buildBinding(metadata['Value'], {parentView: parentView, basePathOfProperty: basePathOfProperty});
                dataBinding.bindElement(parameter, '');
            }else{
                parameter.setValue(metadata['Value']);
            }

            if (metadata.OnPropertyChanged) {
                parameter.onPropertyChanged('', function (context, args) {
                    var scriptExecutor = new ScriptExecutor(parentView);
                    return scriptExecutor.executeScript( metadata.OnPropertyChanged, args);
                });
            }
        }



        return parameter;
    };
}

window.InfinniUI.ParameterBuilder = ParameterBuilder;
