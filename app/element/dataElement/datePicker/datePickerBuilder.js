function DatePickerBuilder() {
}

_.inherit(DatePickerBuilder, ElementBuilder);

_.extend(DatePickerBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
		this.initScriptsHandlers(params);

        params.metadata.Mode = params.metadata.Mode || 'Date';

        if(!params.metadata.EditMask) {
            var mask;
            switch (params.metadata.Mode) {
                case 'Date':
                    mask = 'd';
                    break;
                case 'Time':
                    mask = 't';
                    break;
                case 'DateTime':
                    mask = 'g';
                    break;
            }
            params.metadata.EditMask = {
                DateTimeEditMask: {
                    Mask: mask
                }
            };
        }

        this.initEditMaskProperty(params);
        //this.initFormatProperty(params);
        this.initValueProperty(params, true);


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

