function ViewBuilder() {
}

_.inherit(ViewBuilder, ElementBuilder);

_.extend(ViewBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        var metadata = params.metadata;
        var view = params.element;
        var parent = params.parent;

        view.setParentView(parent);

        function addParameters(collection){
            if (typeof collection !== 'undefined' && collection !== null) {
                for (var i = 0; i < collection.length; i++) {
                    //Передается родительская View т.к. ParameterBinding указывает на DataSource в parent
                    view.addParameter(params.builder.buildType(parent, 'Parameter', collection[i]));
                }
            }
        }

        addParameters(metadata.Parameters);
        addParameters(metadata.RequestParameters);

        view.setCaption(metadata.Caption);
        view.setDataSources(params.builder.buildMany(view, metadata.DataSources));
        view.setScripts(metadata.Scripts);

        if (metadata.OnClosing) {
            view.OnClosing(function () {
                new ScriptExecutor(view.getScriptsStorage()).executeScript(metadata.OnClosing.Name);
            });
        }

        _.each(metadata.ChildViews, function (childViewMetadata) {
            var linkView = params.builder.build(view, childViewMetadata.LinkView);
            view.addChildView(childViewMetadata.Name, linkView);
        });


        view.setLayoutPanel(params.builder.build(view, metadata.LayoutPanel));
    },

    createElement: function (params) {
        return new View(params.parent);
    }

}, builderValuePropertyMixin, builderFormatPropertyMixin);
