function NumericBoxBuilder() {
}

_.inherit(NumericBoxBuilder, ElementBuilder);

_.extend(NumericBoxBuilder.prototype, {
    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initFormatProperty(params);
        this.initEditMaskProperty(params);
        this.initValueProperty(params, true);
        this.initForeground(params);
        this.initBackground(params);
        this.initTextStyle(params);
        this.initHintText(params);
        this.initHorizontalTextAlignmentProperty(params);
        this.initErrorText(params);
        this.initLabelText(params);

        var element = params.element,
            metadata = params.metadata;

        element.setMinValue(metadata.MinValue);
        element.setMaxValue(metadata.MaxValue);
        element.setIncrement(metadata.Increment);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события

        if (params.parent && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.parent).executeScript(metadata.OnValueChanged.Name);
            });
        }

        this.initBaseTextElementEvents(params);
    },

    createElement: function(params){
        return new NumericBox(params.parent);
    }

},
    builderValuePropertyMixin,
    builderFormatPropertyMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderEditMaskPropertyMixin,
    builderBaseTextElementMixin,
    builderBackgroundMixin,
    builderForegroundMixin,
    builderTextStyleMixin,
    builderErrorTextMixin,
    builderHintTextMixin,
    builderLabelTextMixin
);