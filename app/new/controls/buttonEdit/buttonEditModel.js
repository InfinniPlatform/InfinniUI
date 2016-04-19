var ButtonEditModel = TextBoxModel.extend({

    defaults: _.defaults({
        showClear: true,
        readOnly: true
    }, TextBoxModel.prototype.defaults),

    initialize: function () {
        TextBoxModel.prototype.initialize.apply(this, arguments);
    },

    clearValue: function () {
        var enabled = this.get('enabled');

        if (enabled) {
            this.set('value', null);
        }
    }

});