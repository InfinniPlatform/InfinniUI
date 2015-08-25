function MetadataViewBuilder() {

    this.build = function (context, args){
        var metadata = args.metadata;

        if (metadata.OpenMode === 'Container' && metadata.Container === 'Content') {
            metadata.OpenMode = 'Page';
        }

        var linkView = new LinkView(args.view, function (resultCallback) {
            if(args.view.handleOnLoaded){
                args.view.handleOnLoaded(function(){
                    createView(args.builder, args.view, metadata, resultCallback);
                });
            }else{
                createView(args.builder, args.view, metadata, resultCallback);
            }
        });
        linkView.setOpenMode(metadata.OpenMode);
        linkView.setContainer(metadata.Container);
        return linkView;
    };


    var createView = function (builder, parent, metadata, resultCallback) {
        var params = buildParameters(parent, metadata.Parameters, builder);

        window.providerRegister.build('MetadataDataSource', metadata).getViewMetadata(function (viewMetadata) {
            if (viewMetadata !== null) {

                // Ваша платформа - говно
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
                throw stringUtils.format('view metadata for {0} not found.', [metadata]);
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