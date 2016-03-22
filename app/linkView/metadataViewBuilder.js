function MetadataViewBuilder() {

}

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
            var metadataProvider = window.providerRegister.build('MetadataDataSource', metadata);

            metadataProvider.getViewMetadata(function (viewMetadata) {
                that.buildViewByMetadata(params, viewMetadata, parentView, onReady);
                function onReady() {
                    var args = Array.prototype.slice.call(arguments);
                    onViewReadyHandler.apply(null, args);
                }
            });
        };
    },

    buildViewByMetadata: function (params, viewMetadata, parentView, onViewReadyHandler) {
        var builder = params.builder;
        var logger = InfinniUI.global.logger;
        var parameters = this.buildParameters(params);

        if (viewMetadata !== null) {

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
            return this.getRootView(params.parentView);
        }

        return params.parentView;
    },

    getRootView: function(view) {
        var parentView = view.getView();

        if( parentView == null ) {
            return view;
        }

        return this.getRootView(parentView);
    }
});