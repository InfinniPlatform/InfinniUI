var ParameterBindingBuilder = function () {

};


ParameterBindingBuilder.prototype.build = function (builder, parent, metadata) {

    this.parameter = metadata.Parameter;
    this.property = metadata.Property;

    var binding = new ParameterBinding(parent, this.parameter, this.property);

    var parameter = parent.getParameter(this.parameter);

    if(typeof parameter !== 'undefined' && parameter !== null){
        parameter.addDataBinding(binding);
    }

    return binding;
};
