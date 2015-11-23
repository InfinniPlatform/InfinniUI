var layoutPanelBuilderMixin = {

    initLayoutPanelBuilderMixin: function (params) {
        var element = params.element,
            metadata = params.metadata;

        element.setViewName(metadata.Name);
    }

};