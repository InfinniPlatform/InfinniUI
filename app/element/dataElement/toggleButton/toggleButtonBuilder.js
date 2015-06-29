function ToggleButtonBuilder() {
}

_.inherit(ToggleButtonBuilder, ElementBuilder);

_.extend(ToggleButtonBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initValueProperty(params, true);

        var element = params.element,
            metadata = params.metadata;

        element.setTextOn(metadata.TextOn);
        element.setTextOff(metadata.TextOff);
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
    },

    createElement: function(params){
        return new ToggleButton(params.parent);
    }
},
    builderValuePropertyMixin
);
