var CheckBoxModel = ControlModel.extend({

    defaults: {
        value: false
    },

    initialize: function () {
        editorBaseModelMixin.call(this);
    }

});