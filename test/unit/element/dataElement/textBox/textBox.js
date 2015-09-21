describe('TextBox', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('TextBox', {});

        describe('Implementing TextBox Methods', function () {
            ['getMultiline', 'setMultiline', 'getLineCount', 'setLineCount']
                .forEach(function (methodName) {
                    it(methodName, function() {
                        checkMethod(element, methodName);
                    });

                });
        });

        describe('Implementing TextEditorBase Methods', function () {
            checkTextEditorBaseMethods(element);
        });

        describe('Implementing EditorBase Methods', function () {
            checkEditorBaseMethods(element);
        });

        describe('Implementing Element Methods', function () {
            checkElementMethods(element);
        });

        it('Events onLoad, onValueChanged', function () {
            // Given
            var textBox = new TextBox(),
                onLoadFlag = 0,
                onValueChanged = 0;

            textBox.onLoaded(function(){
                onLoadFlag++;
            });
            textBox.onValueChanged(function(){
                onValueChanged++;
            });

            assert.equal(onLoadFlag, 0);
            assert.equal(onValueChanged, 0);

            // When
            textBox.render();
            textBox.setValue('new');

            // Then
            assert.equal(onLoadFlag, 1);
            assert.equal(onValueChanged, 1);
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var builder = new ApplicationBuilder();
            var view = new View();
            var metadata = {
                "TextBox": {
                    OnValueChanged:{
                        Name: 'OnValueChanged'
                    },
                    OnLoaded:{
                        Name: 'OnLoaded'
                    }
                }
            };
            window.Test = {textBox:1, textBoxLoaded:false};
            view.setScripts([{Name:"OnValueChanged", Body:"window.Test.textBox = 5"}, {Name:"OnLoaded", Body:"window.Test.textBoxLoaded = true"}]);

            //When
            var build = builder.build(view, metadata);
            build.setValue(true);
            $(build.render());

            // Then
            assert.equal(window.Test.textBox, 5);
            assert.isTrue(window.Test.textBoxLoaded);
        });
        //@TODO Add Checking Events
    });

    describe('render', function () {

        var element = builder.buildType('TextBox', {});

        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given

            // When
            var $el = element.render();

            // Then
            assert.equal($el.length, 1)
        });

    });
});