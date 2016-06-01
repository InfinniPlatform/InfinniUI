describe('NumericBox', function () {
    describe('render', function () {
        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var numericBox = new NumericBox(),
                $el, $control;

            // When
            $el = numericBox.render();
            $control = $el.find('input');

            // Then
            assert.equal($control.val(), 0);
            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($control.prop('disabled'));
            assert.isFalse($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pl-horizontal-Left'));
            assert.isFalse($el.hasClass('center-block'));
        });

        it('Change the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var numericBox = new NumericBox(),
                $el, $control;
            var numericBox1 = new NumericBox(),
                $el1, $control1;
            var numericBox2 = new NumericBox(),
                $el2, $control2;

            // When
            $el = numericBox.render();
            $control = $el.find('input');
            numericBox1.render();
            numericBox2.render();

            numericBox.setValue(15);
            numericBox.setMinValue(10);
            numericBox.setMaxValue(50);
            numericBox.setIncrement(5);
            numericBox.setName('newName');
            numericBox.setEnabled(false);
            numericBox.setVisible(false);
            numericBox.setHorizontalAlignment('Center');

            numericBox1.setMaxValue(20);
            numericBox1.setValue(50);
            numericBox2.setMinValue(20);
            numericBox2.setValue(5);

            // Then
            assert.equal(numericBox1.getValue(), 50);
            assert.equal(numericBox2.getValue(), 5);

            assert.equal(numericBox.getValue(), 15);
            assert.equal(numericBox.getMinValue(), 10);
            assert.equal(numericBox.getMaxValue(), 50);
            assert.equal(numericBox.getIncrement(), 5);
            assert.equal($el.attr('data-pl-name'), 'newName');
            assert.isTrue($control.prop('disabled'));
            assert.isTrue($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pl-horizontal-Left'));
            assert.isTrue($el.hasClass('pl-horizontal-Center'));
        });

        it('Events onLoad, onValueChanged', function () {
            // Given
            var numericBox = new NumericBox(),
                onLoadFlag = 0,
                onValueChanged = 0;

            numericBox.onLoaded(function () {
                onLoadFlag++;
            });
            numericBox.onValueChanged(function () {
                onValueChanged++;
            });

            assert.equal(onLoadFlag, 0);
            assert.equal(onValueChanged, 0);

            // When
            numericBox.render();
            numericBox.setValue(1);

            // Then
            assert.equal(onLoadFlag, 1);
            assert.equal(onValueChanged, 1);
        });

        it('should be triggered events: OnValueChanged, OnLoaded', function () {
            //Given
            var builder = new ApplicationBuilder();
            var view = new View();
            var metadata = {
                "NumericBox": {
                    OnValueChanged:{
                        Name: 'OnValueChanged'
                    },
                    OnLoaded:{
                        Name: 'OnLoaded'
                    }
                }
            };
            var scripts = view.getScripts();
            var events = {
                OnValueChanged: 0,
                OnLoaded: 0
            };

            scripts.add({
                name: "OnValueChanged",
                func: function () {
                    events.OnValueChanged++;
                }
            });

            scripts.add({
                name: "OnLoaded",
                func: function () {
                    events.OnLoaded++;
                }
            });

            //When
            var element = builder.build(metadata, {parentView: view, parent: view, builder: builder});
            element.setValue(true);
            element.render();

            // Then
            assert.equal(events.OnValueChanged, 1, 'OnValueChanged');
            assert.equal(events.OnLoaded, 1, 'OnLoaded');
        });
    });
});