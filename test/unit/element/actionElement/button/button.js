describe('Button', function () {
    var builder = new ApplicationBuilder();

    describe('API', function () {
        var element = builder.buildType('Button', {});

        describe('Implementing Element Methods', function () {
            checkElementMethods(element);
        });

        it('should set getContent', function () {

            var element = new Button();
            assert.isNull(element.getContent());

            // when
            element.setContent(content);

            // then
            assert.isTrue(element.getContent() === content);

            function content(context, args) {
                return 'button content';
            }
        });

    });


    describe('render', function () {
        var button;

        beforeEach(function () {
            button = builder.buildType('Button', {});
        });

        it('should create', function () {
            // Given
            //var button = new Button();

            // When
            var $el = button.render();

            // Then
            assert.equal($el.find('button').length, 1);
        });

        it('should set enabled', function () {
            // Given
            //var button = new Button();
            button.setText('button');
            var $el = button.render();

            assert.equal(button.getEnabled(), true);
            // When
            button.setEnabled(false);

            // Then
            assert.equal(button.getEnabled(), false);
        });

        it('should set text', function () {
            // Given
            //var button = new Button();
            button.setText('button');
            var $el = button.render();

            // When
            button.setText('other button');

            // Then
            assert.equal($el.find('.btntext').text(), 'other button');
        });


        it('should execute action on click', function () {
            // Given
            var
                //button = new Button(),
                onLastActionExecute = 0,
                onNewActionExecute = 0;

            button.setAction(new function(){
                this.execute = function () {
                    onLastActionExecute++;
                };
            });

            button.setAction(new function(){
                this.execute = function () {
                    onNewActionExecute++;
                };
            });

            assert.equal(onLastActionExecute, 0);
            assert.equal(onNewActionExecute, 0);

            // When
            button.render();
            button.click();

            // Then
            assert.equal(onLastActionExecute, 0);
            assert.equal(onNewActionExecute, 1);
        });

        it('event onClick', function () {
            // Given
            var
                //button = new Button(),
                onClickFlag = 0;

            button.onClick(function(){
                    onClickFlag++;
            });

            assert.equal(onClickFlag, 0);

            // When
            button.render();
            button.click();

            // Then
            assert.equal(onClickFlag, 1);
        });

        it('should be true if scriptsHandlers call', function () {
            //Given
            var view = new View();
            var scripts = view.getScripts();
            scripts.add({
                name: 'OnClick',
                func: function (context, args) {
                    window.Test.button = 5;
                }
            });

            scripts.add({
                name: 'OnLoaded',
                func: function (context, args) {
                    window.Test.buttonLoaded = true;
                }
            });

            var buttonBuilder = new ButtonBuilder();
            var metadata = {
                OnClick:{
                    Name: 'OnClick'
                },
                OnLoaded:{
                    Name: 'OnLoaded'
                }
            };
            window.Test = {button:1, buttonLoaded: false};

            //When
            var button = buttonBuilder.build(null, {builder: builder, parent: view, parentView: view, metadata: metadata});
            button.render();
            //var $button = $(button.render());
            //$button.find('button').click();
            button.click();

            // Then
            assert.equal(window.Test.button, 5);
            assert.isTrue(window.Test.buttonLoaded);
        });
    });
});
