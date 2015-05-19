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

    setLineCount: function(value) {
        this.control.set('lineCount', value);
    }

}, valuePropertyMixin, formatPropertyMixin, horizontalTextAlignmentPropertyMixin);