var ListEditorBaseModel = ContainerModel.extend({

    initialize: function () {
        ContainerModel.prototype.initialize.apply(this, Array.prototype.slice.call(arguments));
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