describe('DocumentViewer', function () {
    it('should pass test default property', function () {
        // Given
        var documentViewerBuilder = new DocumentViewerBuilder();
        var view = new View();
        var metadata = {
            PrintViewId: "PrintView",
            Source: {
                Source: "MainDataSource"
            }
        };
        var documentViewer = documentViewerBuilder.build(null, {builder: documentViewerBuilder, view: view, metadata: metadata});

        //When
        documentViewer.setName('DocumentViewer');

        //Then
        assert.equal(documentViewer.getName(), 'DocumentViewer');
        assert.equal(documentViewer.getPrintViewId(), 'PrintView');
        assert.equal(documentViewer.getSource(), 'MainDataSource');
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