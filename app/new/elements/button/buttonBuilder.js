function ButtonBuilder() {
    _.superClass(ButtonBuilder, this);
}

_.inherit(ButtonBuilder, ElementBuilder);

_.extend(ButtonBuilder.prototype, {

    createElement: function (params) {
        return new Button(params.parent);
    },

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var element = params.element;
        var metadata = params.metadata;
        var builder = params.builder;

        var contentBuilder = new ButtonContentTemplateBuilder(params);
        element.setContent(contentBuilder.build());
        element.onPropertyChanged('text', function (context, args) {
            element.setContent(contentBuilder.buildTextTemplate());
        });

        if (metadata.Action) {
            var action = builder.build(metadata.Action, params);
            element.setAction(action);
        }

        if (params.view && metadata.OnClick){
            element.onClick(function() {
                new ScriptExecutor(params.parentView).executeScript(metadata.OnClick.Name);
            });
        }
    }
});

