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

        if (metadata.OnClick){
            element.onClick(function() {
                new ScriptExecutor(element.getScriptsStorage()).executeScript(metadata.OnClick.Name);
            });
        }
    },

    buildContentTemplate: function (templateMetadata, params) {
        var element = params.element;
        var builder = params.builder;
        var basePathOfProperty = params.basePathOfProperty;

        return function(context, args) {
            var argumentForBuilder = {
                parent: params.element,
                parentView: params.parentView,
                basePathOfProperty: basePathOfProperty
            };

            return builder.build(templateMetadata, argumentForBuilder);
        };
    },
});

