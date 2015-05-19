function NumericBoxBuilder() {
}

_.inherit(NumericBoxBuilder, ElementBuilder);

_.extend(NumericBoxBuilder.prototype, {
    applyMetadata: function(params){
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);
        this.initValueProperty(params, true);

        var element = params.element,
            metadata = params.metadata;

        /** Init EditMask **/
//        params.metadata.EditMask = {
//            NumberEditMask: {
//                Mask: 'n0'
//            }
//        };
        this.initEditMaskProperty(params);
        /** /Init EditMask **/

        element.setText(metadata.Text);
        element.setName(metadata.Name);
        element.setVisible(metadata.Visible);
        element.setEnabled(metadata.Enabled);
        element.setHorizontalAlignment(metadata.HorizontalAlignment);
//        element.setHorizontalTextAlignment(metadata.HorizontalTextAlignmen);

        element.setReadOnly(metadata.ReadOnly);
//        element.setFormat(metadata.Format);
        element.setMinValue(metadata.MinValue);
        element.setMaxValue(metadata.MaxValue);
        element.setIncrement(metadata.Increment);
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
        return new NumericBox(params.parent);
    }

},
    builderValuePropertyMixin,
    builderEditMaskPropertyMixin
);