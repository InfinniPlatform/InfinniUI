function SelectActionBuilder() {
}

SelectActionBuilder.prototype.build = function (context, args) {

    var action = new BaseAction(args.view);
    action.setAction(function (callback) {
        this.executeAction(args.builder, args.view, args.metadata, callback);
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

