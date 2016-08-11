/**
 *
 * @constructor
 * @augments ElementBuilder
 * @mixes displayFormatBuilderMixin
 * @mixes editorBaseBuilderMixin
 */
function LabelBuilder() {
    _.superClass(TextEditorBaseBuilder, this);
    this.initialize_editorBaseBuilder();
}

_.inherit(LabelBuilder, ElementBuilder);
_.extend(LabelBuilder.prototype, {
    applyMetadata: function(params){
        /** @type Label **/
        var element = params.element;
        ElementBuilder.prototype.applyMetadata.call(this, params);
        this.applyMetadata_editorBaseBuilder(params);

        element.setTextWrapping(params.metadata.TextWrapping);
        element.setTextTrimming(params.metadata.TextTrimming);
        element.setEscapeHtml(params.metadata.EscapeHtml);
        
        this.initDisplayFormat(params);
        this.initScriptsHandlers(params);

    },

    initDisplayFormat: function (params) {
        var metadata = params.metadata;
        var format = this.buildDisplayFormat(metadata.DisplayFormat, params);
        params.element.setDisplayFormat(format);
    },

    initScriptsHandlers: function(params){
        var metadata = params.metadata;

        //Скриптовые обработчики на события
        if (params.view && metadata.OnLoaded){
            params.element.onLoaded(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnLoaded.Name || metadata.OnLoaded);
            });
        }

        if (params.view && metadata.OnValueChanged){
            params.element.onValueChanged(function() {
                new ScriptExecutor(params.view).executeScript(metadata.OnValueChanged.Name || metadata.OnValueChanged);
            });
        }
    },

    createElement: function(params){
        var label = new Label(params.parent, params.metadata['ViewMode']);
        label.getHeight = function () {
            return 34;
        };
        return label;
    }

},
    editorBaseBuilderMixin,
    displayFormatBuilderMixin
);