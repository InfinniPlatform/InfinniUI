describe('CheckBox', function () {
    describe('render', function () {

        it('should be checked after setValue', function () {
            // Given
            var checkBox = new CheckBox();

            var $el = checkBox.render();
            assert.isFalse($el.find('input').prop('checked'), 'Property checked for input');
            assert.equal($el.attr('data-pl-name'), undefined);

            // When
            checkBox.setValue(true);
            checkBox.setName('newName');

            // Then
            assert.isTrue($el.find('input').prop('checked'), 'Property checked for input');
            assert.equal($el.attr('data-pl-name'), 'newName');
        });

        it('should return boolean value', function () {
            //Given
            var checkBox = new CheckBox();
            assert.isFalse(checkBox.getValue(), 'Value');

            // When
            checkBox.setValue(true);
            checkBox.setName('newName');

            // Then
            assert.isTrue(checkBox.getValue(), 'Value');
        });

        it('should to forbid setting value if Enabled false', function () {
            //Given
            var checkBox = new CheckBox();
            var $view = checkBox.render();

            $('body').append($view);
            $view.find('input[type = checkbox]').click();
            assert.isTrue(checkBox.getValue());

            // When
            checkBox.setEnabled(false);
            $view.find('input[type = checkbox]').click();

            // Then
            assert.isTrue(!checkBox.getEnabled(), 'Enabled');
            assert.isTrue(checkBox.getValue(), 'Value');
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var builder = new ApplicationBuilder();
            var view = new View();
            var metadata = {
                OnValueChanged:{
                    Name: 'OnValueChanged'
                },
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {checkBox:1, checkBoxLoaded: false};
            var scripts = view.getScripts();
            var events = {
                OnValueChanged: false,
                OnLoaded: false
            };

            scripts.add({
                name: "OnValueChanged",
                func: function () {
                    events.OnValueChanged = true;
                }
            });
            scripts.add({
                name: "OnLoaded",
                func: function () {
                    events.OnLoaded = true;
                }
            });

            //When
            var checkboxBuilder= new CheckBoxBuilder();

            var checkbox = checkboxBuilder.build(null, {builder: builder, parentView: view, parent: view, metadata: metadata});
            checkbox.render();
            checkbox.setValue(true);

            // Then
            assert.equal(events.OnValueChanged, true);
            assert.equal(events.OnLoaded, true);
        });
    });
});