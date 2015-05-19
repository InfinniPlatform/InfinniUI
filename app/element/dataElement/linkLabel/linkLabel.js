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

    onClick: function (handler) {
        this.control.controlView.addEventHandler('OnClick', handler);
    }

}, valuePropertyMixin, formatPropertyMixin);