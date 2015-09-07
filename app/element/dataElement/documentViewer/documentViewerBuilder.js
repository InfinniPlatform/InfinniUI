function DocumentViewerBuilder() {
}

_.inherit(DocumentViewerBuilder, ElementBuilder);

_.extend(DocumentViewerBuilder.prototype, {

    applyMetadata: function (params) {
        ElementBuilder.prototype.applyMetadata.call(this, params);

        this.initScriptsHandlers(params);

        params.element.setView(params.parent);


        if(params.metadata.Value){
            var binding  = this.initValueProperty(params);
            binding.onPropertyValueChanged(function (dataSourceName, value) {
                params.element.setUrl(binding.getFileUrl());
            });

            params.element.setValueExist(true);

            params.element.setUrl(binding.getFileUrl());
        }else{
            params.element.setDataSource(params.metadata.DataSource);
            params.element.setPrintViewType(params.metadata.PrintViewType);
            params.element.setPrintViewId(params.metadata.PrintViewId);
        }
        //this.initDataSource(params);
    },

    createElement: function (params) {
        return new DocumentViewer(params.parent);
    },

    initScriptsHandlers: function(params){

    }
}, builderValuePropertyMixin);
