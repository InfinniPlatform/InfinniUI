describe('Element', function () {
    describe('Element as path of TextBox', function () {

        it('Setting and getting the properties', function () {
            // Given
            var textBox = new TextBox(),
                textBox2 = new TextBox();

            // When
            textBox.setValue('test');
            textBox2.setProperty('value', 'test2');

            // Then
            assert.equal(textBox.getProperty('value'), 'test');
            assert.equal(textBox2.getValue(), 'test2');
        });

        it('Handling change properties', function (done) {
            // Given
            var textBox = new TextBox(),
                step = 1;
            textBox.onPropertyChanged('value', onValueChanged);
            textBox.onPropertyChanged('visible', onVisibleChanged);

            // When
            textBox.setValue('test');
            textBox.setProperty('visible', false);

            // Then
            function onValueChanged(){
                assert.equal(textBox.getProperty('value'), 'test');
                assert.equal(step, 1);
                step++;
            }

            function onVisibleChanged(){
                assert.equal(textBox.getProperty('visible'), false);
                assert.equal(step, 2);
                done();
            }

        });
    });
});