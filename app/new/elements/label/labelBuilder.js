function LabelBuilder() {
    _.superClass(TextEditorBaseBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(LabelBuilder, ElementBuilder);

_.extend(LabelBuilder.prototype, {

    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);
        this.applyMetadata_editorBaseBuilder(params);

        params.element.setLineCount(params.metadata.LineCount);
        params.element.setTextWrapping(params.metadata.TextWrapping);
        this.initScriptsHandlers(params);
        this.initFormatProperty(params);
        this.initHorizontalTextAlignmentProperty(params);
        this.initForeground(params);
        this.initBackground(params);
        this.initTextStyle(params);

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
        var label = new Label(params.view);
        label.getHeight = function () {
            return 34;
        };
        return label;
    }

},
    editorBaseBuilderMixin,
    builderFormatPropertyMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderBackgroundMixin,
    builderForegroundMixin,
    builderTextStyleMixin
);