function ValidationBuilder() {

    this.build = function (context, args) {
        var validatorFactory = createValidationBuilderFactory();
        return validatorFactory.build(args.metadata);
    }
}