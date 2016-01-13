function ParameterBuilder() {

    this.build = function (context, args) {
        var metadata = args.metadata;
        var builder = args.builder;
        var parentView = args.parentView;
        var basePathOfProperty = args.basePathOfProperty;



        if('Value' in metadata){
            var parameter = new Parameter({view: parentView});
            parameter.setName(metadata['Name']);

            if(this.isBindingMetadata(metadata['Value'])){
                var dataBinding = builder.buildBinding(metadata['Value'], {parentView: parentView, basePathOfProperty: basePathOfProperty});
                dataBinding.bindElement(parameter, '');
            }else{
                parameter.setValue(metadata['Value']);
            }
        }

        return parameter;
    };

    this.isBindingMetadata = function(metadata){
        return $.isPlainObject(metadata) && 'Source' in metadata;
    };
}