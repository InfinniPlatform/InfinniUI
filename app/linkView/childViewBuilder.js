function ChildViewBuilder() {
    this.build = function (context, parent, metadata) {
        var linkView = parent.getChildView(metadata.Name);
        linkView.setOpenMode(metadata.OpenMode);

        return linkView;
    };
}