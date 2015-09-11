function LinkLabel() {
    _.superClass(LinkLabel, this);
}

_.inherit(LinkLabel, Element);

_.extend(LinkLabel.prototype, {

        createControl: function () {
            return new LinkLabelControl();
        },

        getReference: function () {
            return this.control.get('reference');
        },

        setReference: function (value) {
            this.control.set('reference', value);
        },

        getTextTrimming: function () {
            return this.control.get('textTrimming');
        },

        setTextTrimming: function (value) {
            this.control.set('textTrimming', value);
        },

        getTextWrapping: function () {
            return this.control.get('textWrapping');
        },

        setTextWrapping: function (value) {
            this.control.set('textWrapping', value);
        },

        getLineCount: function () {
            return this.control.get('lineCount');
        },

        setLineCount: function (value) {
            this.control.set('lineCount', value);
        },
        getAction: function () {
            return this.control.get('action');
        },

        setAction: function (action) {
            this.control.set('action', action);

            this.onClick(function () {
                var action = this.getAction();
                if (action) {
                    action.execute();
                }
            }.bind(this));
        }

    },
    valuePropertyMixin,
    formatPropertyMixin,
    elementHorizontalTextAlignmentMixin,
    elementBackgroundMixin,
    elementForegroundMixin,
    elementTextStyleMixin
);