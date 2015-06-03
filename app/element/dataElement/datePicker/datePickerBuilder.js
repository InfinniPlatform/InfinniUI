function DatePickerBuilder() {
}

_.inherit(DatePickerBuilder, ElementBuilder);

_.extend(DatePickerBuilder.prototype, {
    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);
		this.initScriptsHandlers(params);

        params.metadata.Mode = params.metadata.Mode || 'Date';

        //params.metadata.DisplayFormat = {
        //    DateTimeFormat:{
        //        Format: 'f'
        //    }
        //};
        //params.metadata.EditMask = {
        //    DateTimeEditMask: {
        //        Mask: 'F'
        //    }
        //};

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
            params.metadata.DisplayFormat = {
                DateTimeFormat:{
                    Format: mask
                }
            };
        }

        if(params.metadata.DisplayFormat){
            switch (params.metadata.DisplayFormat.DateTimeFormat.Format){
                case 'f':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'dd MM yyyy hh:ii';
                    break;
                case 'F':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'dd MM yyyy hh:ii:ss';
                    break;
                case 'g':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'dd.mm.yyyy hh:ii';
                    break;
                case 'G':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'dd.mm.yyyy hh:ii:ss';
                    break;
                case 'd':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'dd.mm.yyyy';
                    break;
                case 'D':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'dd MM yyyy';
                    break;
                case 't':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'hh:ii';
                    break;
                case 'T':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'hh:ii:ss';
                    break;
                case 'y':
                case 'Y':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'MM yyyy';
                    break;
                case 'm':
                case 'M':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'MM dd';
                    break;
                case 's':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'yyyy-mm-ddThh:ii:ss';
                    break;
                case 'u':
                    params.metadata.DisplayFormat.DateTimeFormat.Format = 'yyyy-mm-dd hh:ii:ssZ';
                    break;

                default:

                    break
            }
        }

        this.initEditMaskProperty(params);
        this.initFormatProperty(params);
        this.initValueProperty(params, true);
        this.initForeground(params);
        this.initBackground(params);
        this.initTextStyle(params);
        this.initHorizontalTextAlignmentProperty(params);
        this.initHintText(params);
        this.initErrorText(params);
        this.initLabelText(params);


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

        this.initBaseTextElementEvents(params);
    },

    createElement: function (params) {
        return new DatePicker(params.parent);
    }

},
    builderValuePropertyMixin,
    builderFormatPropertyMixin,
    builderEditMaskPropertyMixin,
    builderBaseTextElementMixin,
    builderHorizontalTextAlignmentPropertyMixin,
    builderForegroundMixin,
    builderBackgroundMixin,
    builderTextStyleMixin,
    builderErrorTextMixin,
    builderHintTextMixin,
    builderLabelTextMixin
);

