describe('DocumentViewer', function () {
    it('should pass test default property', function () {
        // Given
        var documentViewerBuilder = new DocumentViewerBuilder();
        var view = new View();
        var metadata = {
            PrintViewId: "PrintView",
            PrintViewType: "ObjectView",
            DataSource: "MainDataSource"
        };
        var documentViewer = documentViewerBuilder.build(documentViewerBuilder, view, metadata);

        //When
        documentViewer.setName('DocumentViewer');

        //Then
        assert.equal(documentViewer.getName(), 'DocumentViewer');
        assert.equal(documentViewer.getPrintViewId(), 'PrintView');
        assert.equal(documentViewer.getPrintViewType(), 'ObjectView');
        assert.equal(documentViewer.getDataSource(), 'MainDataSource');
        assert.isTrue(documentViewer.getEnabled());
        assert.isTrue(documentViewer.getVisible());
        assert.equal(documentViewer.getHorizontalAlignment(), 'Stretch');
    });
    
    //it('should be true on load', function () {
    //    // Given
    //    var documentViewer = new DocumentViewer(),
    //        onLoadFlag = 0;
    //
    //    documentViewer.onLoaded(function(){
    //        onLoadFlag++;
    //        console.log(onLoadFlag);
    //    });
    //
    //    assert.equal(onLoadFlag, 0);
    //
    //    // When
    //    documentViewer.render();
    //
    //    // Then
    //    assert.equal(onLoadFlag, 1);
    //});
});