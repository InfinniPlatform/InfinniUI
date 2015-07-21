function ChildViewBuilder() {
    this.build = function (context, args) {
        var linkView = args.parent.getChildView(args.metadata.Name);
        linkView.setOpenMode(args.metadata.OpenMode);
        linkView.setContainer(args.metadata.Container);
        if (['Application', 'Page', 'Dialog'].indexOf(args.metadata.OpenMode) > -1) {
            InfinniUI.views.appendView(null, args.metadata, linkView);
        }

        return linkView;
    };
}