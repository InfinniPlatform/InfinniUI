function SelectActionBuilder() {
}

SelectActionBuilder.prototype.build = function (builder, parent, metadata) {

    var action = new BaseAction(parent);
    action.setAction(function (callback) {
        this.executeAction(builder, parent, metadata, callback);
    }.bind(this));

    return action;
};

SelectActionBuilder.prototype.executeAction = function (builder, parent, metadata, callback) {

    var dstBinding = builder.build(parent, metadata.DestinationValue);

    builder.build(parent, metadata.View).createView(function (view) {

        var srcBinding = builder.build(view, metadata.SourceValue);
        view.onClosed(function (result) {
            if (result == dialogResult.accept) {
                var value = srcBinding.getPropertyValue();
                dstBinding.setPropertyValue(value);

                if (callback) {
                    callback(value);
                }
            }
        });

        view.open();
    });
};

