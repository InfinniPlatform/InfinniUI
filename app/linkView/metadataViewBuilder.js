function MetadataViewBuilder() {

}

_.extend(MetadataViewBuilder.prototype, {

    build: function (context, args){
        var metadata = args.metadata;
        var viewTemplate = this.buildViewTemplate(args, onViewReady);
        var linkView = new LinkView(args.parent);

        linkView.setViewTemplate(viewTemplate);

        if('OpenMode' in metadata){
            linkView.setOpenMode(metadata.OpenMode);
        }

        if('Container' in metadata){
            linkView.setContainer(metadata.Container);
        }

        if('DialogWidth' in metadata){
            linkView.setDialogWidth(metadata.DialogWidth);
        }

        if ('CloseButton' in metadata) {
            linkView.setCloseButton(!!metadata.CloseButton);
        }

        var that = this;
        function onViewReady(view) {
            linkView.setHeaderTemplate(that.buildHeaderTemplate(view, args));
        }

        return linkView;
    },

    buildViewTemplate: function(params, cb){
        var metadata = params.metadata;
        var that = this;

        return function(onViewReadyHandler){
            var metadataProvider = window.providerRegister.build('MetadataDataSource', metadata);

            metadataProvider.getViewMetadata( function(viewMetadata){
                that.buildViewByMetadata(params, viewMetadata, onReady);
                function onReady() {
                    var args = Array.prototype.slice.call(arguments);
                    cb.apply(null, args);
                    onViewReadyHandler.apply(null, args);
                }
            });
        };
    },

    buildViewByMetadata: function(params, viewMetadata, onViewReadyHandler){
        var builder = params.builder;
        var parentView = params.parentView;
        var logger = InfinniUI.global.logger;
        var parameters = this.buildParameters(params);

        if (viewMetadata !== null) {

            var view = builder.buildType("View", viewMetadata, {parentView: parentView, parent: params.parent, params: parameters});

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
}, viewBuilderMixin);