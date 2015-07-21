describe('ToggleButton', function () {
    describe('render', function () {
        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var toggleButton = new ToggleButton(),
                $el, $control;

            // When
            $el = toggleButton.render();
            $control = $el.find('input');

            // Then
            assert.isTrue($control.prop('checked'));
            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($control.prop('disabled'));
            assert.isFalse($el.hasClass('hidden'));
            assert.isTrue($el.hasClass('pull-left'));
            assert.isFalse($el.hasClass('center-block'));
        });

        it('Change the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var toggleButton = new ToggleButton(),
                $el, $control;

            // When
            $el = toggleButton.render();
            $('body').prepend($el);
            $control = $el.find('input');
            toggleButton.setValue(false);
            toggleButton.setTextOn('ДА');
            toggleButton.setTextOff('НЕТ');

            toggleButton.setName('newName');
            toggleButton.setEnabled(false);
            toggleButton.setVisible(false);
            toggleButton.setHorizontalAlignment('Center');

            // Then
            assert.isTrue($el.prop('textContent').length == 6);
            assert.isFalse($control.prop('checked'));
            assert.equal($el.attr('data-pl-name'), 'newName');
            assert.isTrue($control.prop('disabled'));
            assert.isTrue($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pull-left'));
            assert.isTrue($el.hasClass('center-block'));
        });

        it('Events onLoad, onValueChanged', function () {
            // Given
            var toggleButton = new ToggleButton(),
                onLoadFlag = 0,
                onValueChanged = 0;

            toggleButton.onLoaded(function(){
                onLoadFlag++;
            });
            toggleButton.onValueChanged(function(){
                onValueChanged++;
            });

            assert.equal(onLoadFlag, 0);
            assert.equal(onValueChanged, 0);

            // When
            toggleButton.render();
            toggleButton.setValue('true');

            // Then
            assert.equal(onLoadFlag, 1);
            assert.equal(onValueChanged, 1);
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var toggleButton = new ToggleButtonBuilder();
            var view = new View();
            var metadata = {
                OnValueChanged:{
                    Name: 'OnValueChanged'
                },
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {toggleButton:1, toggleButtonLoaded:false};
            view.setScripts([{Name:"OnValueChanged", Body:"window.Test.toggleButton = 5"}, {Name:"OnLoaded", Body:"window.Test.toggleButtonLoaded = true"}]);

            //When
            var build = toggleButton.build(null, {builder: toggleButton, parent: view, metadata: metadata});
            build.setValue(false);
            $(build.render());

            // Then
            assert.equal(window.Test.toggleButton, 5);
            assert.isTrue(window.Test.toggleButtonLoaded);
        });
    });
});