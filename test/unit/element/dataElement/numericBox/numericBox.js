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
            assert.isFalse($el.hasClass('pull-left'));
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
            assert.equal(numericBox1.getValue(), 20);
            assert.equal(numericBox2.getValue(), 20);

            assert.equal(numericBox.getValue(), 15);
            assert.equal(numericBox.getMinValue(), 10);
            assert.equal(numericBox.getMaxValue(), 50);
            assert.equal(numericBox.getIncrement(), 5);
            assert.equal($el.attr('data-pl-name'), 'newName');
            assert.isTrue($control.prop('disabled'));
            assert.isTrue($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pull-left'));
            assert.isTrue($el.hasClass('center-block'));
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

        it('should be true if scriptsHandlers call', function () {
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
            window.Test = {numericBox:1, numericBoxLoaded: false};
            view.setScripts([{Name:"OnValueChanged", Body:"window.Test.numericBox = 5"}, {Name:"OnLoaded", Body:"window.Test.numericBoxLoaded = true"}]);

            //When
            //var build = numericBox.build(numericBox, view, metadata);
            var build = builder.build(view, metadata);
            build.setValue(true);
            $(build.render());

            // Then
            assert.equal(window.Test.numericBox, 5);
            assert.isTrue(window.Test.numericBoxLoaded);
        });
    });
});