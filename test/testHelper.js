var testHelper = {
    applyViewMetadata: function(metadata, onViewReady){
        metadata = {
            View: metadata
        };

        var appBuilder = new ApplicationBuilder();
        var linkView = (new InlineViewBuilder()).build(null, {builder: appBuilder, metadata: metadata});

        var view = linkView.createView(function (view) {
            view.open();
            onViewReady(view, $('#sandbox').children());
        });
    }
};