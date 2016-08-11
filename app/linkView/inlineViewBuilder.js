function InlineViewBuilder() {
    this.build = function (context, args){
        var that = this,
            metadata = args.metadata;

        var parentView = this.getParentViewByOpenMode(args, metadata.OpenMode);

        var linkView = new LinkView(parentView);

        linkView.setViewTemplate(function(onViewReadyHandler){

            that.buildViewByMetadata(args, args.metadata['View'], parentView, function (view) {
                return onViewReadyHandler.call(null, view);
            });
        });

        if('OpenMode' in metadata){
            linkView.setOpenMode(metadata.OpenMode);
        }

        if('Container' in metadata){
            linkView.setContainer(metadata.Container);
        }

        if('DialogWidth' in metadata){
            linkView.setDialogWidth(metadata.DialogWidth);
        }

        return linkView;
    };



    this.buildViewByMetadata = function(params, viewMetadata, parentView, onViewReadyHandler){
        var builder = params.builder;
        var parameters = this.buildParameters(params);

        if (viewMetadata != null) {

            var view = builder.buildType("View", viewMetadata, {
                parentView: parentView,
                parent: parentView,
                params: parameters,
                suspended: params.suspended
            });

            onViewReadyHandler(view);
        } else {
            logger.error('view metadata for ' + metadata + ' not found.');
        }
    };


   this.buildParameters = function(params){
        var parametersMetadata = params.metadata['Parameters'];
        var builder = params.builder;
        var parentView = params.parentView;
        var result = {};
        var parameter;

        if (typeof parametersMetadata !== 'undefined' && parametersMetadata !== null) {
            for (var i = 0; i < parametersMetadata.length; i++) {
                if (parametersMetadata[i].Value !== undefined) {
                    parameter = builder.buildType('Parameter', parametersMetadata[i], {parentView: parentView, basePathOfProperty: params.basePathOfProperty});
                    result[parameter.getName()] = parameter;
                }
            }
        }
        return result;
   };

    this.getParentViewByOpenMode = function(params, mode) {
        if( mode == null || mode == "Default" ) {
            return params.parentView.getApplicationView();
        }

        return params.parentView;
    };
}

