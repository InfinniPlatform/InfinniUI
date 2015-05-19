function ToggleButtonBuilder() {
}

_.inherit(ToggleButtonBuilder, ElementBuilder);

_.extend(ToggleButtonBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        var element = params.element,
            metadata = params.metadata;

        element.setText(metadata.Text);
        element.setName(metadata.Name);
        element.setVisible(metadata.Visible);
        element.setHorizontalAlignment(metadata.HorizontalAlignment);
        element.setEnabled(metadata.Enabled);

        element.setTextOn(metadata.TextOn);
        element.setTextOff(metadata.TextOff);
        element.setReadOnly(metadata.ReadOnly);

        this.initValueProperty(params, true);
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
