function Label(parent, viewMode) {
    _.superClass(Label, this, parent, viewMode);
    this.initialize_editorBase();
}

_.inherit(Label, Element);


_.extend(Label.prototype, {

        createControl: function () {
            return new LabelControl();
        },

        getLineCount: function () {
            return this.control.get('lineCount');
        },

        setLineCount: function (value) {
            this.control.set('lineCount', value);
        },

        setTextWrapping: function (value) {
            if (typeof value === 'boolean') {
                this.control.set('textWrapping', value);
            }
        },

        getTextWrapping: function () {
            return this.control.get('textWrapping');
        },

        setTextTrimming: function (value) {
            if (typeof value === 'boolean') {
                this.control.set('textTrimming', value);
            }
        },

        getTextTrimming: function () {
            return this.control.get('textTrimming');
        },

        getDisplayFormat: function () {
            return this.control.get('displayFormat');
        },

        setDisplayFormat: function (value) {
            return this.control.set('displayFormat', value);
        },
        
        getDisplayValue: function () {
            return this.control.getDisplayValue();
        },

        /**
         * @description Возвращает режим отображения HTML разметки
         * @returns {Boolean}
         */
        getEscapeHtml: function () {
            return this.control.get('escapeHtml');
        },

        /**
         * @description Устанавливает режим отображения HTML разметки
         * @param {Boolean} value
         */
        setEscapeHtml: function (value) {
            if (_.isBoolean(value)) {
                this.control.set('escapeHtml', value);
            }
        }
    }

    ,
    editorBaseMixin
    //formatPropertyMixin,
    //elementHorizontalTextAlignmentMixin,
    //@TODO TextTrimming
    //elementBackgroundMixin,
    //elementForegroundMixin,
    //elementTextStyleMixin
);