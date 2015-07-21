describe('PanelBuilder', function () {
    it('should build', function () {

        //Given
        var metadata = {
            Panel: {
                Text: 'panel',
                Items: [
                    {
                        TextBox: {
                            Name: 'text'
                        }
                    }
                ]
            }
        };

        var applicationBuilder = new ApplicationBuilder();

        //Then
        var panel = applicationBuilder.build(applicationBuilder, metadata);

        //When
        assert.equal(panel.getText(), 'panel');
    });

    it('should be true if scriptsHandlers call', function () {
        //Given
        var builder = new Builder();
        var panel = new PanelBuilder();
        var view = new View();
        var metadata = {
            Text: 'panel',
            Collapsible: true,
            Items: [
                {
                    TextBox: {
                        Name: 'text'
                    }
                }
            ],
            OnLoaded: {
                Name: 'OnLoaded'
            },

            OnExpanded: {
                Name: 'OnExpanded'
            },

            OnCollapsed: {
                Name: 'OnCollapsed'
            }
        };
        window.Test = {panelLoaded: false, panelCollapsed: false, panelExpanded: false };
        view.setScripts([
            {Name: "OnLoaded", Body: "window.Test.panelLoaded = true"},
            {Name: "OnExpanded", Body: "window.Test.panelExpanded = true"},
            {Name: "OnCollapsed", Body: "window.Test.panelCollapsed = true"}
        ]);

        //When
        var build = panel.build(null, {builder: builder, parent: view, metadata: metadata});
        var $el = $(build.render());
        $el.find('.collapse').trigger('click');
        $el.find('.expand').trigger('click');


        // Then
        assert.isTrue(window.Test.panelLoaded);
        assert.isTrue(window.Test.panelCollapsed);
    });
});