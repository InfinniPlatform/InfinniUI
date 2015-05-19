function MetadataViewBuilder() {

    this.build = function (builder, parent, metadata) {

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
        return linkView;
    };


    var createView = function (builder, parent, metadata, resultCallback) {
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
                //

                resultCallback(builder.buildType(parent, "View", viewMetadata));
            } else {
                throw stringUtils.format('view metadata for {0} not found.', [metadata]);
            }
        });
    }
}