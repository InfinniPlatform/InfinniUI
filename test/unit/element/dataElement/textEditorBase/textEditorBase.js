describe('TextEditorBase', function () {
    describe('Textbox as exemplar of TextEditorBase', function () {

        it('Base functional', function () {
            // Given
            var textBox = new TextBox();
            var format = new ObjectFormat();
            var mask = new DateTimeEditMask();

            assert.isNull(textBox.getLabelText(), 'default label text is null');
            assert.isFalse(textBox.getLabelFloating(), 'default label floating is false');
            assert.isNull(textBox.getDisplayFormat(), 'default display format is null');
            assert.isNull(textBox.getEditMask(), 'default edit mask is null');


            // When
            textBox.setLabelText('label');
            textBox.setLabelFloating(true);
            textBox.setDisplayFormat(format);
            textBox.setEditMask(mask);


            // Then
            assert.equal(textBox.getLabelText(), 'label', 'new label text is right');
            assert.isTrue(textBox.getLabelFloating(), 'new label floating is true');
            assert.equal(textBox.getDisplayFormat(), format, 'new display format is right');
            assert.equal(textBox.getEditMask(), mask, 'new edit mask is right');
        });

        var metadata_1 = {
            Text: '��������',
            DataSources : [
                {
                    ObjectDataSource: {
                        "Name": "ObjectDataSource1",
                        "Items": [
                            { "Id": 1, "Display": "2.2222" },
                            { "Id": 2, "Display": "3.2222" },
                            { "Id": 3, "Display": "4.2222" }
                        ]
                    }
                }
            ],
            LayoutPanel: {

                "TextBox": {
                    "Name": "TextBox1",
                    "Value": {
                        "PropertyBinding":{
                            "Source": "ObjectDataSource1",
                            "Property": "$.Display"
                        }
                    },
                    "DisplayFormat": {
                        "NumberFormat": {
                            "Format": "n2"
                        }
                    }
                }
            }
        };

        it('metadata and rendering', function () {
            // Given When
            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata_1, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();

                var $layout = $('#sandbox').children();
                //$layout.detach();

                onLayoutReady($layout);
            });

            // Then
            function onLayoutReady($layout){
                var $input = $layout.find('.pl-text-box-input');
                assert.equal($input.val(), 'Type is LTE', 'binding and formatting is right');
            }
        });

    });

});