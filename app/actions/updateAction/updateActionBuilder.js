function UpdateActionBuilder() {
    this.build = function (context, args) {

        var dataSource = args.parentView.getContext().dataSources[args.metadata.DestinationValue.Source];

        var action = new UpdateAction(args.parentView);

        action.setProperty('dataSource', dataSource);

        return action;
    }
}