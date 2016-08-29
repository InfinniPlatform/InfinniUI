function MetadataViewBuilder() {}

window.InfinniUI.MetadataViewBuilder = MetadataViewBuilder;

_.extend(MetadataViewBuilder.prototype, {

    build: function (context, args) {
        var metadata = args.metadata;
        var parentView = this.getParentViewByOpenMode(args, metadata.OpenMode);

        var viewTemplate = this.buildViewTemplate(args, parentView);
        var linkView = new LinkView(parentView);

        linkView.setViewTemplate(viewTemplate);

        if ('OpenMode' in metadata) {
            linkView.setOpenMode(metadata.OpenMode);
        }

        if ('Container' in metadata) {
            linkView.setContainer(metadata.Container);
        }

        if ('DialogWidth' in metadata) {
            linkView.setDialogWidth(metadata.DialogWidth);
        }

        return linkView;
    },

    buildViewTemplate: function (params, parentView) {
        var metadata = params.metadata;
        var that = this;

        return function (onViewReadyHandler) {
            var metadataProvider = window.InfinniUI.providerRegister.build('MetadataDataSource', metadata);

            metadataProvider.getMetadata(function (viewMetadata) {

                if (viewMetadata == null) {
                    InfinniUI.global.logger.error('view metadata not found');
                    InfinniUI.global.messageBus.send(messageTypes.onViewBuildError, {error: 'metadata not found', metadata: metadata});
                    return;
                }

                var onReady = function() {
                    var args = Array.prototype.slice.call(arguments);
                    onViewReadyHandler.apply(null, args);
                };

                that.buildViewByMetadata(params, viewMetadata, parentView, onReady);
            });
        };
    },

    buildViewByMetadata: function (params, viewMetadata, parentView, onViewReadyHandler) {
        var builder = params.builder;
        var parameters = this.buildParameters(params);

        var view = builder.buildType("View", viewMetadata, {
            parentView: parentView,
            parent: parentView,
            params: parameters,
            suspended: params.suspended
        });

        onViewReadyHandler(view);
    },

    buildParameters: function (params) {
        var parametersMetadata = params.metadata['Parameters'];
        var builder = params.builder;
        var parentView = params.parentView;
        var result = {};
        var parameter;

        if (typeof parametersMetadata !== 'undefined' && parametersMetadata !== null) {
            for (var i = 0; i < parametersMetadata.length; i++) {
                if (parametersMetadata[i].Value !== undefined) {
                    parameter = builder.buildType('Parameter', parametersMetadata[i], {
                        parentView: parentView,
                        basePathOfProperty: params.basePathOfProperty
                    });
                    result[parameter.getName()] = parameter;
                }
            }
        }
        return result;
    },

    getParentViewByOpenMode: function(params, mode) {
        if( mode == null || mode == "Default" ) {
            return params.parentView.getApplicationView();
        }

        if( mode == "Container" ) {
            var containerName = params.metadata.Container;
            var container = InfinniUI.global.containers[containerName];

            if(container){
                return container.getView();
            }else{
                return params.parentView;
            }
        }

        return params.parentView;
    }
});
