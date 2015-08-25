function CheckBoxBuilder() {
}

_.inherit(CheckBoxBuilder, ElementBuilder);

_.extend(CheckBoxBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initValueProperty(params, true);
        this.initForeground(params);
        this.initTextStyle(params);
        this.initHorizontalTextAlignmentProperty(params);
    },

    createElement: function (params) {
        return new CheckBox(params.view);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.view && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnLoaded.Name);
            });
        }

        if (params.view && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnValueChanged.Name);
            });
        }
    }

},
    builderValuePropertyMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderForegroundMixin,
    builderTextStyleMixin
);
