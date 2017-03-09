function ActionFactory(actionMetadata, builder, builderParams) {

    return {
        get: get
    };

    function get(  ) {
        return builder.build(actionMetadata, builderParams);
    }
}