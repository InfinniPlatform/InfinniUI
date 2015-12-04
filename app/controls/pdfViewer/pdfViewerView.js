var PdfViewerView = PdfViewerViewBase.extend({
    renderDocument: function () {
        var that = this,
            renderFrame = function(){
                if(this.model.get('url')){
                    var url = encodeURI(this.model.get('url'));
                    this.sendRequest(url, function(data){
                        that.renderPdf(data);
                    });
                }
            }.bind(this);

        renderFrame();

        this.listenTo(this.model, 'change:url', renderFrame);
    }
});