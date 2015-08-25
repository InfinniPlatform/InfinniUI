function TextBoxBuilder() {
}

_.inherit(TextBoxBuilder, ElementBuilder);

_.extend(TextBoxBuilder.prototype, {

    applyMetadata: function(params){
        var metadata = params.metadata,
            element = params.element;

        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initFormatProperty(params);
        this.initValueProperty(params, true);

        element.setMultiline(metadata.Multiline);
        element.setLineCount(metadata.LineCount);
        if(!metadata.InputType){
            metadata.InputType = 'text';
        }
        element.setInputType(metadata.InputType);

        this.initHorizontalTextAlignmentProperty(params);
        this.initForeground(params);
        this.initBackground(params);
        this.initTextStyle(params);
        this.initErrorText(params);
        this.initHintText(params);
        this.initLabelText(params);

        this.initEditMaskProperty(params);
        this.initBaseTextElementEvents(params);
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
    },

    createElement: function(params){
        var textBox = new TextBox(params.view);
        textBox.getHeight = function() {
            return 34;
        };
        return textBox;
    }

},
    builderHorizontalTextAlignmentPropertyMixin,
    builderValuePropertyMixin,
    builderFormatPropertyMixin,
    builderEditMaskPropertyMixin,
    builderBaseTextElementMixin,
    builderBackgroundMixin,
    builderForegroundMixin,
    builderTextStyleMixin,
    builderErrorTextMixin,
    builderHintTextMixin,
    builderLabelTextMixin
);
