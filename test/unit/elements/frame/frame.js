describe('Frame', function () {
    var builder = new InfinniUI.ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('Frame', {});

        describe('Implementing EditorBase Methods', function () {
            testHelper.checkEditorBaseMethods(element);
        });

        describe('Implementing Element Methods', function () {
            testHelper.checkElementMethods(element);
        });
    });

});
