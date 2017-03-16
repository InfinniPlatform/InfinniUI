function InlineScriptFactory(scriptBody, builder, builderParams) {
    
    return {
        get: get
    };

    function get(  ) {
        var scriptBuilderParams = {
            parentView: builderParams.parentView,
            parent: builderParams.parent,
            basePathOfProperty: builderParams.basePathOfProperty
        };

        var scriptMetadata = {
            Body: scriptBody,
            Name: 'InlineScript'
        };

        var script = builder.buildType('Script', scriptMetadata, scriptBuilderParams);

        return function (context, args) {
            script.call(null, context, args);
        }
    }
    
}