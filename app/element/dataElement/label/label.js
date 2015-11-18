function Label() {
    _.superClass(Label, this);
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

        getText: function(){
            return this.control.get('text') || this.control.getLabelText();
        }

    },
    valuePropertyMixin,
    formatPropertyMixin,
    elementHorizontalTextAlignmentMixin,
    //@TODO TextTrimming
    elementBackgroundMixin,
    elementForegroundMixin,
    elementTextStyleMixin
);