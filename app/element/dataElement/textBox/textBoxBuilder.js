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

        this.initEditMaskProperty(params);
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
        var textBox = new TextBox(params.parent);
        textBox.getHeight = function() {
            return 34;
        };
        return textBox;
    }

},
    builderValuePropertyMixin,
    builderFormatPropertyMixin,
    builderEditMaskPropertyMixin
);
