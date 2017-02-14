function MetadataViewBuilder() {
    _.superClass(MetadataViewBuilder, this);
}

_.inherit(MetadataViewBuilder, LinkViewBuilderBase);

window.InfinniUI.MetadataViewBuilder = MetadataViewBuilder;

_.extend(MetadataViewBuilder.prototype, {

    getViewTemplate: function (params, parentView) {
        var metadata = params.metadata,
            applicationView = parentView && parentView.getApplicationView(),
            that = this;

        return function (onViewReadyHandler) {
            var metadataProvider = window.InfinniUI.providerRegister.build('MetadataDataSource', metadata, applicationView);

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
    }

});
