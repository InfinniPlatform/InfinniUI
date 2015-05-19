function InlineViewBuilder() {
    this.build = function (context, parent, metadata) {
        var linkView = new LinkView(parent, function (resultCallback) {
            resultCallback(context.buildType(parent, 'View', metadata.View));
        });
        linkView.setOpenMode(metadata.OpenMode);
        return linkView;
    };
}