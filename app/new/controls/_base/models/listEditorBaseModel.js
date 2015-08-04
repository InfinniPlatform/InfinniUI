var ListEditorBaseModel = ControlModel.extend({

    initialize: function () {
        editorBaseModelMixin.call(this);

        this.on('change:selectedItem', function (model, value) {
            var message = {
                value: value
            };
            this.trigger('onValueChanging', message);
        }, this);
    },

    onSelectedItemChanged: function (handler) {
        this.on('onValueChanging', handler);
    }

});