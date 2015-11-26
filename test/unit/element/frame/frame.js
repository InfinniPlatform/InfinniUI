describe('Frame', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('Frame', {});

        describe('Implementing EditorBase Methods', function () {
            checkEditorBaseMethods(element);
        });

        describe('Implementing Element Methods', function () {
            checkElementMethods(element);
        });
    });

});
