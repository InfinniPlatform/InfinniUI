function LinkLabelBuilder() {
}

_.inherit(LinkLabelBuilder, ElementBuilder);

_.extend(LinkLabelBuilder.prototype, {

    applyMetadata: function(params){
        var metadata = params.metadata;

        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initFormatProperty(params);
        this.initValueProperty(params);
        this.initPropertyBinding('Reference', params, function (value) {
            params.element.setReference(value);
        });
        this.initScriptsHandlers(params);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.parent && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (params.parent && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
            });
        }

        if (params.parent && metadata.OnClick){
            params.element.onClick(function() {
                var script = new ScriptExecutor(params.parent);
                return script.executeScript(metadata.OnClick.Name);
            });
        }
    },

    createElement: function(params){
        var linkLabel = new LinkLabel(params.parent);
        linkLabel.getHeight = function () {
            return 34;
        };
        return linkLabel;
    }

}, builderValuePropertyMixin, builderFormatPropertyMixin, builderPropertyBindingMixin);