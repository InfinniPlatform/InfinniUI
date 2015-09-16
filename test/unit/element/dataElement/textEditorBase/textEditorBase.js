describe('TextEditorBase (Element)', function () {
    describe('Textbox as exemplar of TextEditorBase', function () {
        var metadata_1 = {
            Text: 'Пациенты',
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
            Items: [{

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
                    },

                    "EditMask": {
                        "NumberEditMask": {
                            "Mask": "n3"
                        }
                    }
                }
            }]
        };

        function applyViewMetadata(metadata, onViewReady){
            var linkView = new LinkView(null, function (resultCallback) {
                var builder = new ApplicationBuilder();
                var view = builder.buildType('View', metadata, {parentView: fakeView()});
                resultCallback(view);
            });
            linkView.setOpenMode('Application');

            var view = linkView.createView(function (view) {
                view.open();
                onViewReady(view, $('#sandbox').children());
            });
        }

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

        
        it('Building TextEditorBase (Textbox) by Metadata', function () {
            // Given
            var metadata = metadata_1;

            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                var textbox = view.getContext().controls['TextBox1'];
                var formatter = textbox.getDisplayFormat();
                var mask = textbox.getEditMask();

                assert.equal(formatter.format(2.22222), '2,22', 'applied format is right (n2)');
                assert.equal(mask.mask, 'n3', 'applied mask is right (n3)');
            }
        });

    });

});