var RadioGroupModel = ControlModel.extend({

    defaults: _.defaults({
        "readOnly": false,
        "orientation": InfinniUI.Metadata.RadioGroupOrientation.Vertical
    }, ControlModel.prototype.defaults)

});