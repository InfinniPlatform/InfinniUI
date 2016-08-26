describe('Element', function () {
    describe('Element as path of TextBox', function () {

        it('Setting and getting the properties', function () {
            // Given
            var textBox = new InfinniUI.TextBox(),
                textBox2 = new InfinniUI.TextBox();

            // When
            textBox.setValue('test');
            textBox2.setProperty('value', 'test2');

            // Then
            assert.equal(textBox.getProperty('value'), 'test');
            assert.equal(textBox2.getValue(), 'test2');
        });

        it('Handling change properties', function (done) {
            // Given
            var textBox = new InfinniUI.TextBox(),
                step = 1;
            textBox.onPropertyChanged('value', onValueChanged);
            textBox.onPropertyChanged('visible', onVisibleChanged);

            // When
            textBox.setValue('test');
            textBox.setProperty('visible', false);

            // Then
            function onValueChanged() {
                assert.equal(textBox.getProperty('value'), 'test');
                assert.equal(step, 1);
                step++;
            }

            function onVisibleChanged() {
                assert.equal(textBox.getProperty('visible'), false);
                assert.equal(step, 2);
                done();
            }

        });

        it('Handling DOM event', function (done) {
            // Given
            var textBox = new InfinniUI.TextBox();
            textBox.onDoubleClick(onMouseDoubleClickHandler);

            // When
            var $el = textBox.render();
            $el.trigger('dblclick');

            // Then
            function onMouseDoubleClickHandler(eventData) {
                assert.equal(eventData.source, textBox, 'eventData has right source');
                done();
            }

        });

        it('Click event', function (done) {
            // Given
            var textBox = new InfinniUI.TextBox();
            textBox.onClick(onMouseClickHandler);
            
            // When
            var $el = textBox.render();
            $el.trigger('click');
            
            //Then
            function onMouseClickHandler(eventData) {
                assert.equal(eventData.source, textBox, 'eventData has right source');
                done();
            }
        });
    });
});
