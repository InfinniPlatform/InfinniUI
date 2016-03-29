function SaveActionBuilder() {
    this.build = function (context, args) {
        var parentView = args.parentView;
        var dataSource = parentView.getContext().dataSources[args.metadata.DestinationValue.Source];

        var action = new SaveAction(parentView);

        action.setProperty('dataSource', dataSource);
        action.setProperty('canClose', args.metadata.CanClose);

        return action;
    }
}