describe('ToolBarBuilder', function () {
    var builder = new InfinniUI.ApplicationBuilder();


    it('Build ToolBar instance', function () {
        var element = builder.buildType('ToolBar', {Items: []});

        assert.isTrue(typeof element !== 'undefined' && element !== null);
        assert.isTrue(element instanceof InfinniUI.ToolBar);
    });

});
