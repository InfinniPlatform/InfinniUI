describe('EditorBase', function () {
    describe('Textbox as exemplar of EditorBase', function () {

        it('Setting the properties: value, name, enabled, visible, horizontalAlignment', function () {
            // Given
            var textBox = new TextBox(),
                $el, $control;
            textBox.setValue('test');
            $el = textBox.render();
            $control = $el.find('input');

            assert.equal($control.val(), 'test');
            assert.isUndefined($el.attr('data-pl-name'));
            assert.isFalse($control.prop('disabled'));
            assert.isFalse($el.hasClass('hidden'));
            assert.isFalse($el.hasClass('pull-left'));

            // When
            textBox.setValue('new');
            textBox.setName('newName');
            textBox.setEnabled(false);
            textBox.setVisible(false);
            textBox.setHorizontalAlignment('Left');

            // Then
            assert.equal($control.val(), 'new');
            assert.equal($el.attr('data-pl-name'), 'newName');
            assert.isTrue($control.prop('disabled'));
            assert.isTrue($el.hasClass('hidden'));
            assert.isTrue($el.hasClass('pull-left'));
        });

        function testAlignment(element, alignment, cssClass){
            debugger
            if(!element.setHorizontalAlignment) return false;
            //debugger
            element.setHorizontalAlignment(alignment);

            if(alignment!== element.getHorizontalAlignment()) return false;
            if(!element.render().hasClass(cssClass)) return false;

            return true;
        }

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
    });

});