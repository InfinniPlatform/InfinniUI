function LabelBuilder() {
}

_.inherit(LabelBuilder, ElementBuilder);

_.extend(LabelBuilder.prototype, {

    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        params.element.setLineCount(params.metadata.LineCount);
        params.element.setTextWrapping(params.metadata.TextWrapping);
        this.initScriptsHandlers(params);
        this.initFormatProperty(params);
        this.initValueProperty(params);
        this.initHorizontalTextAlignmentProperty(params);
        this.initForeground(params);
        this.initBackground(params);
        this.initTextStyle(params);

    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события

        if (params.parent && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
            });
        }
    },

    createElement: function(params){
        var label = new Label(params.parent);
        label.getHeight = function () {
            return 34;
        };
        return label;
    }

},
    builderValuePropertyMixin,
    builderFormatPropertyMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderBackgroundMixin,
    builderForegroundMixin,
    builderTextStyleMixin
);