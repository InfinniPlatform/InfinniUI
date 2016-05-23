//describe('Extension Panel', function () {
//    it('should be true if scriptsHandlers call', function () {
//        //Given
//        var extensionPanel = new ApplicationBuilder();
//        var view = new View();
//        var metadata = {
//            ExtensionPanel: {
//                ExtensionName: 'Banner',
//                OnLoaded: {
//                    Name: 'OnLoaded'
//                }
//            }
//        };
//        window.Test = {extensionPanelLoaded:false};
//        view.setScripts([{Name:"OnLoaded", Body:"window.Test.extensionPanelLoaded = true"}]);
//
//        //When
//        var build = extensionPanel.build(view, metadata);
//        var el = build.render();
//
//        // Then
////        assert.isTrue(window.Test.extensionPanelLoaded);
//    });
//});