describe('ToolBarElement', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('ToolBar', {Items: []});


        describe('Implementing Container Methods', function () {
            testHelper.checkContainerMethods(element);
        });

    });

    describe('render', function () {

        var element = builder.buildType('ToolBar', {
            Items: [
                {
                    Button: {
                        Text: "Button 1"
                    }
                },
                {
                    Button: {
                        Text: "Button 2"
                    }

                }
            ]
        });

        it('render element', function () {
            // Given

            // When
            var $el = element.render();

            // Then
            assert.equal($el.length, 1)
        });

        it('contains items', function () {
            var items = element.getItems();

            assert.equal(items.length, 2);
        })

    });
});