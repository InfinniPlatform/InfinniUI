function MetadataViewBuilder() {

}

_.extend(MetadataViewBuilder.prototype, {

    build: function (context, args){
        var metadata = args.metadata;
        var viewTemplate = this.buildViewTemplate(args);
        var linkView = new LinkView(args.parentView);

        linkView.setViewTemplate(viewTemplate);
        if('OpenMode' in metadata){
            linkView.setOpenMode(metadata.OpenMode);
        }
        linkView.setContainer(metadata.Container);

        return linkView;
    },

    buildViewTemplate: function(params){
        var metadata = params.metadata;
        var that = this;

        return function(onViewReadyHandler){
            var metadataProvider = window.providerRegister.build('MetadataDataSource', metadata);

            metadataProvider.getViewMetadata( function(viewMetadata){
                that.buildViewByMetadata(params, viewMetadata, onViewReadyHandler);
            });
        };
    },

    buildViewByMetadata: function(params, viewMetadata, onViewReadyHandler){
        var builder = params.builder;
        var parentView = params.parentView;
        var logger = InfinniUI.global.logger;
        var parameters = this.buildParameters(params);

        if (viewMetadata !== null) {

            var view = builder.buildType("View", viewMetadata, {parentView: parentView, params: parameters});

            onViewReadyHandler(view);
        } else {
            logger.error('view metadata for ' + metadata + ' not found.');
        }
    },

    buildParameters: function(params){
        var parametersMetadata = params.metadata['Parameters'];
        var builder = params.builder;
        var parentView = params.parentView;
        var result = {};
        var parameter;

        if (typeof parametersMetadata !== 'undefined' && parametersMetadata !== null) {
            for (var i = 0; i < parametersMetadata.length; i++) {
                if (parametersMetadata[i].Value !== undefined) {
                    parameter = builder.buildType('Parameter', parametersMetadata[i], {parentView: parentView})
                    result[parameter.getName()] = parameter;
                }
            }
        }
        return result;
    }
});