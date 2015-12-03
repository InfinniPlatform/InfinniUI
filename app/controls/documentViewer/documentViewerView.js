var DocumentViewerView = PdfViewerViewBase.extend({
    renderDocument: function(){
        var that = this,
            renderFrame = function(){
            this.$el.empty();
            var requestData = {
                PrintViewId: this.model.get('viewId'),
                ConfigId: dataSource.getConfigId(),
                DocumentId: dataSource.getDocumentId(),
                PageNumber: dataSource.getPageNumber(),
                PageSize: dataSource.getPageSize(),
                Query: dataSource.getFilter()
            };

            var urlParams = $.param({Form: JSON.stringify(requestData)}).replace(/%22/g, '%27');
            this.sendRequest(InfinniUI.config.serverUrl+'/SystemConfig/UrlEncodedData/Reporting/GetPrintView/?' + urlParams, function(data){
                that.renderPdf(data);
            });
        }.bind(this);

        var parentView = this.model.get('view');
        var dataSource = parentView.getContext().dataSources[this.model.get('dataSource')];

        if (typeof this.onDataSourceItemsUpdated !== 'undefined') {
            this.onDataSourceItemsUpdated.unsubscribe();
        }

        this.onDataSourceItemsUpdated = dataSource.onItemsUpdated(function(){
            renderFrame();
        });

        renderFrame();
    }
});