describe('Extension Panel (build)', function () {
    it('successful build', function () {
        // Given
        var builder = new InfinniUI.ExtensionPanelBuilder();
        var metadata = {};

        // When
        var extensionPanel = builder.build(null, {builder: new InfinniUI.ApplicationBuilder(), metadata: metadata, parentView: new InfinniUI.View()});

        // Then
        assert.isNotNull(extensionPanel);
    });

    it('should find extensionPanel in global namespace', function (done) {
        // Given
        var builder = new InfinniUI.ExtensionPanelBuilder();
        var metadata = {
            "ExtensionName": "myExtensionPanel",
            "Parameters": [
                {
                    "Name": "param1",
                    "Value": "hello"
                }
            ]
        };
        var extensionPanel = builder.build(null, {builder: new InfinniUI.ApplicationBuilder(), metadata: metadata, parentView: new InfinniUI.View()});

        window.myExtensionPanel = function(context, args){
            // Then
            assert.isDefined(args.$el);
            assert.isDefined(args.parameters);

            this.render = done;
        };

        // When
        extensionPanel.render();
    });
});
