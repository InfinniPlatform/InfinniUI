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
//        it('should be true if scriptsHandlers call', function () {
//            //Given
//            var comboBox = new ComboBoxBuilder();
//            var view = new View();
//            var metadata = {
//                OnValueChanged:{
//                    Name: 'OnValueChanged'
//                },
//                OnLoaded:{
//                    Name: 'OnLoaded'
//                }
//            };
//            window.Test = {comboBox:1, comboBoxLoaded: false};
//            view.setScripts([{Name:"OnValueChanged", Body:"window.Test.comboBox = 5"}, {Name:"OnLoaded", Body:"window.Test.comboBoxLoaded = true"}]);
//
//            //When
//            var build = comboBox.build(comboBox, view, metadata);
//            build.setValue(true);
//            $(build.render());
//
//            // Then
//            assert.equal(window.Test.comboBox, 5);
//            assert.isTrue(window.Test.comboBoxLoaded);
//        });
    });

    describe('ComboBoxSingleSelectStrategy', function () {

        it('Successful build selected from value', function () {
            // Given
            var strategy = new ComboBoxSingleSelectStrategy();

            // When
            var value = {Id: 1, DisplayName: 'One'};
            var id = strategy.buildSelectedFromValue(value);

            // Then
            assert.equal(id, value.Id);
        });

        it('Successful build value from selected', function () {
            // Given
            var strategy = new ComboBoxSingleSelectStrategy();

            // When
            var selected = "1";
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var value = strategy.buildValueFromSelected(selected, list);
            // Then
            assert.deepEqual(value, {Id: 1, DisplayName: 'One'});
        });

        it('Successful build value from empty selected', function () {
            // Given
            var strategy = new ComboBoxSingleSelectStrategy();

            // When
            var selected = "";
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var value = strategy.buildValueFromSelected(selected, list);
            // Then
            assert.isNull(value);
        });


        it('Successful build selection', function () {
            // Given
            var strategy = new ComboBoxSingleSelectStrategy();

            // When
            var selected = "1";
            var value = {Id: 1, DisplayName: 'One'};
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.deepEqual(selection, {id: 1, text: 'One'});
        });

        it('Successful build selection for empty selected', function () {
            // Given
            var strategy = new ComboBoxSingleSelectStrategy();

            // When
            var selected = "";
            var value = {Id: 1, DisplayName: 'One'};
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.deepEqual(selection, null);
        });

        it('Successful build selection when value not in list', function () {
            // Given
            var strategy = new ComboBoxSingleSelectStrategy();

            // When
            var selected = "99";
            var value = {Id: 99, DisplayName: 'Value not in list'};
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.deepEqual(selection, {id: 99, text: 'Value not in list'});
        });

    });

    describe('ComboBoxMultiSelectStrategy', function () {

        it('Successful build selected from value', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var value = [{Id: 1, DisplayName: 'One'}, {Id: 2, DisplayName: 'Two'}];
            var id = strategy.buildSelectedFromValue(value);

            // Then
            assert.deepEqual(id, [1,2]);
        });

        it('Successful build value from selected', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var selected = [1];
            var list = [{id: '1', text: 'One'}, {id: '2', text: 'Two'}];

            var value = strategy.buildValueFromSelected(selected, list);
            // Then
            assert.isArray(value);
            assert.lengthOf(value, 1);
            assert.equal(value[0].Id, '1');
            assert.equal(value[0].DisplayName, 'One');
        });

        it('Successful build value from empty selected', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var selected = "";
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var value = strategy.buildValueFromSelected(selected, list);
            // Then
            assert.isArray(value);
            assert.lengthOf(value, 0);
        });


        it('Successful build selection', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var selected = ['1'];
            var value = {Id: 1, DisplayName: 'One'};
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.isArray(selection);
            assert.lengthOf(selection, 1);
            assert.equal(selection[0].id, '1');
            assert.equal(selection[0].text, 'One');
        });

        it('Successful build selection for empty selected', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var selected = null;
            var value = [{Id: 1, DisplayName: 'One'}];
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.isArray(selection);
            assert.lengthOf(selection, 0)
        });

        it('Successful build selection when value not in list', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var selected = ["99"];
            var value = [{Id: 99, DisplayName: 'Value not in list'}];
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.deepEqual(selection, [{id: 99, text: 'Value not in list'}]);
        });

        it('Successful build complex selection ', function () {
            // Given
            var strategy = new ComboBoxMultiSelectStrategy();

            // When
            var selected = ["99", "2"];
            var value = [{Id: 99, DisplayName: 'Value not in list'}];
            var list = [{id: 1, text: 'One'}, {id: 2, text: 'Two'}];

            var selection = strategy.buildSelection(selected, value, list);
            // Then
            assert.deepEqual(selection, [{id: 99, text: 'Value not in list'}, {id: 2, text: 'Two'}]);
        });

    });
});
