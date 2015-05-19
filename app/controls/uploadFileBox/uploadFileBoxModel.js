var UploadFileBoxModel = ControlModel.extend({
    defaults: _.extend({
        value: null,
        url: null,
        file: null,
        maxSize: 0,
        readOnly: false,
        acceptTypes: []
    }, ControlModel.prototype.defaults),

    initialize: function () {
        ControlModel.prototype.initialize.apply(this);
    }
});