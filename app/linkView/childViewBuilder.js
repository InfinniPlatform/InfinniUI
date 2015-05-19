function ChildViewBuilder() {
    this.build = function (context, parent, metadata) {
        var linkView = parent.getChildView(metadata.Name);
        linkView.setOpenMode(metadata.OpenMode);
        linkView.setContainer(metadata.Container);
        if (['Application', 'Page', 'Dialog'].indexOf(metadata.OpenMode) > -1) {
            InfinniUI.views.appendView(null, metadata, linkView);
        }

        return linkView;
    };
}