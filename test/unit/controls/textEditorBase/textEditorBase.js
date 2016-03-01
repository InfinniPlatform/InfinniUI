describe('TextEditorBase (Control)', function () {
    describe('Textbox as exemplar of TextEditorBase', function () {
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
            Items: [{

                "TextBox": {
                    "Name": "TextBox1",
                    "Value": {
                        "Source": "ObjectDataSource1",
                        "Property": "$.Display"
                    },
                    "DisplayFormat": "{:n2}",

                    "EditMask": {
                        "NumberEditMask": {
                            "Mask": "n3"
                        }
                    }
                }
            }]
        };

        it('metadata', function () {
            // Given
            var metadata = metadata_1;

            // When
            testHelper.applyViewMetadata(metadata, onViewReady);

            // Then
            function onViewReady(view, $layout){

                var $input = $layout.find('.pl-text-box-input'),
                    $inputMask = $layout.find('input.pl-control-editor');

                assert.equal($input.val(), '2,22', 'binding and formatting is right');

                $input.focus(); // ��� ���������� �������� � �����
                assert.equal($inputMask.val(), '2,222', 'mask is right');

                $layout.detach();
            }
        });

    });

});