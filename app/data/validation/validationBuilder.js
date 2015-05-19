function ValidationBuilder() {

    this.build = function (builder, parent, metadata) {
        var validatorFactory = createValidationBuilderFactory();
        return validatorFactory.build(metadata);
    }
}