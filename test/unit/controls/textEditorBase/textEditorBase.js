describe('TextEditorBase', function () {
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

        it('metadata', function () {
            // Given
            var metadata = metadata_1;

            // When
            applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){
                $layout.detach();

                var $input = $layout.find('.pl-text-box-input');

                assert.equal($input.val(), '2,22', 'binding and formatting is right');
            }
        });

    });

});