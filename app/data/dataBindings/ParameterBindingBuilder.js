var ParameterBindingBuilder = function () {

};


ParameterBindingBuilder.prototype.build = function (context, args) {
    this.parameter = args.metadata.Parameter;
    this.property = args.metadata.Property;

    var binding = new ParameterBinding(args.parent, this.parameter, this.property);

    var parameter = args.parent.getParameter(this.parameter);

    if(typeof parameter !== 'undefined' && parameter !== null){
        parameter.addDataBinding(binding);
    }

    return binding;
};
