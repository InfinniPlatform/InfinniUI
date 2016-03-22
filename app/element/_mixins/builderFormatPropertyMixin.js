var builderFormatPropertyMixin = {

    initFormatProperty: function(params){
        var metadata = params.metadata;
        var builder = params.builder;
        var formatField = metadata.DisplayFormat || metadata.ItemFormat;

        if(formatField !== undefined){
            var format = builder.build(params.view, formatField);
            params.element.setFormat(format);
        }
    }

};