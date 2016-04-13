describe('ToggleButton', function () {
    describe('render', function () {
        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var toggleButton = new ToggleButton(),
                $el;

            // When
            $el = toggleButton.render();

            // Then
            assert.isTrue($el.hasClass('toggle-off'));
            assert.isUndefined($el.attr('data-pl-name'), 'data-pl-name');
            assert.isFalse($el.hasClass('pl-disabled'));
            assert.isFalse($el.hasClass('hidden'), 'hidden');
            assert.isTrue($el.hasClass('pl-horizontal-Left'), 'pl-horizontal-Left');
            assert.isFalse($el.hasClass('pl-horizontal-Center'), 'pl-horizontal-Center');
        });

        it('Change the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var toggleButton = new ToggleButton(),
                $el;

            // When
            $el = toggleButton.render();
            toggleButton.setValue(false);
            toggleButton.setTextOn('on');
            toggleButton.setTextOff('off');

            toggleButton.setName('newName');
            toggleButton.setEnabled(false);
            toggleButton.setVisible(false);
            toggleButton.setHorizontalAlignment('Center');

            // Then
            assert.isTrue($el.hasClass('toggle-off'));
            assert.equal($el.attr('data-pl-name'), 'newName');
            assert.isTrue($el.hasClass('pl-disabled'));
            assert.isTrue($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pl-horizontal-Left'));
            assert.isTrue($el.hasClass('pl-horizontal-Center'));
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

            var events = {
                OnValueChanged: 0,
                OnLoaded: 0
            };
            var scripts = view.getScripts();
            scripts.add({
                name: 'OnValueChanged',
                func: function () {
                    events.OnValueChanged++;
                }
            });
            scripts.add({
                name: 'OnLoaded',
                func: function () {
                    events.OnLoaded++;
                }
            });


            //When
            var element = toggleButton.build(null, {builder: toggleButton, parentView: view, parent: view, metadata: metadata});
            element.setValue(true);
            element.render();

            // Then
            assert.equal(events.OnLoaded, 1, 'OnLoaded');
            assert.equal(events.OnValueChanged, 1, 'OnValueChanged');
        });
    });
});