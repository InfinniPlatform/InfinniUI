function MetadataViewBuilder() {

    this.build = function (builder, parent, metadata) {

        if (metadata.OpenMode === 'Container' && metadata.Container === 'Content') {
            metadata.OpenMode = 'Page';
        }

        var linkView = new LinkView(parent, function (resultCallback) {
            if(parent.handleOnLoaded){
                parent.handleOnLoaded(function(){
                    createView(builder, parent, metadata, resultCallback);
                });
            }else{
                createView(builder, parent, metadata, resultCallback);
            }
        });
        linkView.setOpenMode(metadata.OpenMode);
        linkView.setContainer(metadata.Container);
        return linkView;
    };


    var createView = function (builder, parent, metadata, resultCallback) {
        var params = buildParameters(parent, metadata.Parameters, builder);

        window.providerRegister.build('MetadataDataSource', metadata).getViewMetadata(function (viewMetadata) {
            if (viewMetadata) {

                for (var key in viewMetadata.RequestParameters) {
                    var param = viewMetadata.RequestParameters[key];
                    if (metadata.Parameters[param.Name] != param.Value) {
                        //debugger;
                        param.Value = metadata.Parameters[param.Name];
                    }
                }

                var view = builder.buildType(parent, "View", viewMetadata, undefined, params);

                if (['Application', 'Page', 'Dialog'].indexOf(metadata.OpenMode) > -1) {
                    InfinniUI.views.appendView(metadata, viewMetadata, view);
                }

                resultCallback(view);
            } else {
                console.log(stringUtils.format('view metadata for {0} not found.', [metadata]));
            }
        });
    };

    var buildParameters = function(parentView, parametersMetadata, builder){
        var result = {},
            param;

        if (typeof parametersMetadata !== 'undefined' && parametersMetadata !== null) {
            for (var i = 0; i < parametersMetadata.length; i++) {
                if (parametersMetadata[i].Value !== undefined) {
                    param = builder.buildType(parentView, 'Parameter', parametersMetadata[i])
                    result[param.getName()] = param;
                }
            }
        }
        return result;
    };
}