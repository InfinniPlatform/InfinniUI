function DatePickerBuilder() {
}

_.inherit(DatePickerBuilder, ElementBuilder);

_.extend(DatePickerBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
		this.initScriptsHandlers(params);

        if(!params.metadata.EditMask) {
            params.metadata.EditMask = {
                DateTimeEditMask: {
                    Mask: 'dd.MM.yyyy'
                }
            };
        }

        this.initEditMaskProperty(params);
        //this.initFormatProperty(params);
        this.initValueProperty(params);


        params.element.setMode(params.metadata.Mode);
        params.element.setMinDate(params.metadata.MinDate);
        params.element.setMaxDate(params.metadata.MaxDate);
        params.element.setReadOnly(params.metadata.ReadOnly);



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

    createElement: function (params) {
        return new DatePicker(params.parent);
    }

},
    builderValuePropertyMixin,
    builderEditMaskPropertyMixin
    /*, builderFormatPropertyMixin*/
);

