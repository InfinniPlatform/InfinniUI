describe('ComboBox', function () {
    describe('render', function () {

        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var comboBox = new ComboBox(), $el, $control;

            $el = comboBox.render();

            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($el.hasClass('hidden'), 'hidden');
            assert.isFalse($el.hasClass('pull-left'), 'pull-left');

            // When
            comboBox.setName('newName');
            comboBox.setEnabled(false);
            comboBox.setVisible(false);
            
            // Then

            assert.equal($el.attr('data-pl-name'), 'newName');

            assert.isTrue($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pull-left'));
        });

        it('Events onLoad, onValueChanged', function () {
            // Given
            var comboBox = new ComboBox(),
                onLoadFlag = 0,
                onValueChanged = 0;

            comboBox.onLoaded(function(){
                onLoadFlag++;
            });
            comboBox.onValueChanged(function(){
                onValueChanged++;
            });

            assert.equal(onLoadFlag, 0);
            assert.equal(onValueChanged, 0);

            // When
            comboBox.render();
            comboBox.setValue('new');

            // Then
            assert.equal(onLoadFlag, 1);
            assert.equal(onValueChanged, 1);
        });

        //TODO: когда починят comboBox
        it('should be true if scriptsHandlers call', function () {
            //Given
            var comboBox = new ComboBoxBuilder();
            var view = new View();
            var metadata = {
                OnValueChanged:{
                    Name: 'OnValueChanged'
                },
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {comboBox:1, comboBoxLoaded: false};
            view.getScripts.add([{Name:"OnValueChanged", Body:"window.Test.comboBox = 5"}, {Name:"OnLoaded", Body:"window.Test.comboBoxLoaded = true"}]);

            //When
            var build = comboBox.build(comboBox, view, metadata);
            build.setValue(true);
            $(build.render());

            // Then
            assert.equal(window.Test.comboBox, 5);
            assert.isTrue(window.Test.comboBoxLoaded);
        });
    });


});
